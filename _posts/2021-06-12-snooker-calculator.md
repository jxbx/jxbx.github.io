---
layout: post
title: Building a score calculator for Snooker
date: 2021-06-15
category: blog
---

BreakBuilder is a simple web application which works as a score tracker in the game of snooker. The BBC sometimes show an [interesting score graphic](https://www.reddit.com/r/snooker/comments/65oel7/can_anyone_explain_the_point_of_this_infographic/) alongside their snooker coverage on TV; the purpose of this is to show how many points a player has scored, the maximum number of points they could score, and the minimum number of points they need to win. This is all useful information, but I've always found the score bar hard to interpret because it only ever appears as a static graphic at random points during a game. In snooker, a player can choose from multiple scoring options while they are playing the game, and every choice they make has an effect on the overall game state, so to reflect this I've tried to make a dynamic score bar where it's possible to see the graphic update in real time as a player accumulates points.

Due to the fiddly nature of snooker's scoring system, it's necessary to keep track of several variables in order to correctly record the game state compute the score as the game progresses, which means that as well as having some real world relevance this this has been an interesting coding challenge with lots of opportunities to think about and learn about state management. You can have a look at my minimum viable product below, built using vanilla Javascript. In the rest of the blog post you can read about the development. I start with a bit of contextual background before jumping into the code.

<iframe src="../projects/breakbuilder.html" width="100%" height="700" style="border: none;">
</iframe>


_Background_

Snooker is a cue sport, like pool, which you play by shooting balls into pockets in the corners and sides of a special table. Snooker is played on a much larger table than pool and is an unbelievably difficult game in real life. It's also insanely popular; in the UK, prime time TV schedules are wiped to broadcast it, and millions of people watch.

Snooker is a two player game played in segments called "frames" (basically the same as "racks" in pool). the winner at the end of each frame is the person who scores the most points, and the overall winner is the first person to accumulate some agreed number of frames. In casual play this might be first to five, but in elite play an outright victory can require you to win up to 18 frames.  

Snooker has a unique scoring system, which I've often had to explain to non-enthusiasts; usually this starts with me saying "it really isn't that complicated..." and ends with them leaving the room. Well, here goes:

1. There are seven different colours of ball, each worth a different number of points.

    Red (1); Yellow (2); Green (3); Brown (4); Blue (5); Pink (6); Black (7)

2. There are fifteen red balls but only one each of the other colours. These other colours are usually referred to collectively as the "colour balls" (as opposed to the "red balls").

3. To score a run of points (a "break") you must start by potting (scoring) a red ball. You must then pot a colour ball, and continue by alternating red-colour-red-colour for as long as you can.

4. When you pot a red ball it is removed from the table for good. When you pot a colour ball it is brought back onto the table so it can be potted again.

5. Eventually, all fifteen red balls will be potted and only the colour balls will remain on the table. At this point, you must pot the colour balls in order of points value, working your way up from yellow to black.

If you succeed in doing all this, you will have made what is known as a "clearance". This happens pretty often on TV, but it's actually really difficult, and most amateur players can't do it. If you miss at any point, the other player comes to the table and starts the sequence again, beginning with a red (or whichever colour has the lowest value if all the reds are gone), hoping to accumulate enough points to overtake you. There are ways to score points from fouls, and technically the frame isn't over until all the balls are potted, but players will usually concede rather than coming to the table if their opponent misses but it's mathematically impossible for them to catch up by potting all the remaining balls.   

With this in mind it's pretty easy to calculate the maximum number of points a single player could score in a frame.

    (red.value + black.value)*red.quantity + (total value of the six colour balls)

Fill in the figures and we get the magic total for the perfect game:

    (1+7)*15 + 7! = 147

So how do we keep track of the score here? And how do we go about creating something that looks a bit like the BBC's score bar?

_Problem analysis_

I imagine my score bar looking something like this:

<img class="blog-img" src="/blog/assets/02.jpg">

The full width of the score bar represents the theoretical maximum points available in the game, which we now know is 147. This value never changes.

Within this, we have the score (how many points you've made so far) and the remaining points (the maximum points still available). Both of these values will change as the game goes on. Add them together and you get the total points in the game *at that stage of the game*. If you only ever potted red and black balls this total would remain equal to 147. However, every time you have the chance to pot a black ball and choose a lower value colour ball this value goes down, since you are essentially losing points from the game. Our final element is the marker which shows us how many more points we need to secure victory; although this might seem like it's just a fixed value, it's actually a variable as well, as I'll explain later.  

We also need some inputs, and an output which can be used to show alert messages:

<img class="blog-img" src="/blog/assets/01.jpg">

In order to make this work, there are a few different variables we need to think about:

1. *What colour next?* Are we shooting at a red, or a colour? If it's a colour, which one?

2. *What phase of the game are we in?* There are two distinct phases of the game. Phase 1, the "red/colour" phase, is where we alternate potting between red and colour balls and colour balls are continually replaced. Phase 2, the "clear the colours" phase, is where all the reds have been potted and we just need to pot the colours in order. The scoring sequence and the behaviour of the balls changes depending on the phase, so we need to know when to make this switch.

3. *What's the score?* How many points have we accumulated so far?

4. *What's the total number of points in the game?* To get the maximum possible score you must pot a black ball with every red ball. Potting a different colour increases your score but reduces the total number of points in the game. Potting a red and then missing also reduces the number of points in the game, because your opponent must score a red as their first ball, meaning the colour ball is missed out.

5. *Where's the winning line?* At what point are we mathematically certain of winning (barring points from fouls), and how many points do we need to get there? My simple interpretation is that in order to get an insurmountable lead we need just over half all the available points. If there were 99 points available, I'd need 50, leaving only 49 for my opponent. If there were 100 points available I'd need 51. A really important thing to note is that although the winning line is calculated from the total number of points in the game, it's actually a variable. At the start of the game I will need 74 points to win, assuming I just pot reds and blacks. As the game progresses, every time I remove points from the game by choosing to pot any colour other than black, I'm slightly lowering the winning threshold. If I just potted reds and yellows I could eventually win with only 42 points! However, I'm also reducing the speed at which I accumulate points. I'd only have to pot 20 balls to win with reds and blacks, but I'd need to pot 28 balls to win using reds and yellows!

_Method_

TO start, I declared the array `balls`, with an object entry for each colour. The two important values to keep track of here are `quantity` and `points` (i.e. the points value of each colour).

  let balls = [
   {colour: "red", quantity: 15, points: 1},
   {colour: "yellow", quantity: 1, points: 2},
   {colour: "green", quantity: 1, points: 3},
   {colour: "brown", quantity: 1, points: 4},
   {colour: "blue", quantity: 1, points: 5},
   {colour: "pink", quantity: 1, points: 6},
   {colour: "black", quantity: 1, points: 7}
  ];

For convenience, I then created a lookup table which allows me to access the relevant object in `balls` using a string ("red", "yellow" etc) rather than its index. To calculate the score I'm planning to write functions which can be called against any colour, and to make the code more readable I want to be able to do this by passing plain English arguments into the function so I can call `myFunction("red")` or `myFunction("yellow")` rather than `myFunction(0)` or `myFunction(1)`.

  const lookup = {
    "red": 0,
    "yellow": 1,
    "green": 2,
    "brown": 3,
    "blue": 4,
    "pink": 5,
    "black": 6
  };

I can now manage the state of the balls, but I still need declare some global variables to manage the state of the scoring:

    let score = 0; // total points from balls potted

    let remaining = 0; // max points available from remaining balls

    let redOn = true; // red available for next shot?

    let tableCleared = false; // ready to clear the colours?

    const maxPoints = updateRemaining(); // max possible points available - declared at initialisation

The `score` and `remaining` variables keep track of how many points we've achieved, and how many points are left. These will be used to generate the values in the score bar.

`score` is of course set to `0` on initialisation. We know already that in standard snooker `remaining` should be set to `147` at the beginning of the frame, but instead of hardcoding this value I've also set it to `0` to start with. When the page loads I'll call a function `updateRemaining()` which will calculate `remaining` based on the values in `balls`. This seems more rigorous, and it means that if we decided to change the values in `balls` for any reason the calculator would still work. Whenever we update the score we'll change the values in `balls` and call `updateRemaining()` again to update the `remaining` variable.

The booleans `redOn` and `tableCleared` are important for checking the game state. `redOn` toggles based on whether the last ball we potted was a red, so we always know what colour we are shooting at next. `tableCleared` monitors what phase the game is in. Remember, once all the red/colour pairs have been potted the scoring sequence and the behaviour of the remaining balls changes.

It's really important to note here that the second phase of the game only starts after the last red *and* its subsequent colour are potted, and not just when there are no reds left. When we pot the final red, we then pot a colour, which is returned to the table. Only then do we move to phase 2. It would be easy for an error situation to occur here simply by toggling `tableCleared` at the wrong time. The correct sequence should be:

    ... red > colour > `tableCleared === true` > colour > colour ...

The `maxPoints` const represents the "perfect" score; the theoretical maximum points available if you always pot the highest scoring balls. This will eventually determine the overall width of the score bar. We'll define the widths of `score` and `remaining` relative to `maxPoints`. We know that `remaining === maxPoints === 147` at the start of the frame, so we can use `updateRemaining()`  to set the value of `maxPoints` on initialisation, making sure to declare it as a const so the value is locked in and won't be recalculated when the game state changes.

These elements should be everything we need to manage the state of our game. I now need to write some functions which I can use to change the game state. I'll start by looking at the potting actions:

Case 1: trying to pot a red ball
Case 2: trying to pot a colour ball during the "red/colour" phase
Case 3: trying to pot a colour ball during the "clear the colours" phase

Case 1:

When we try to pot a red ball, we need to check whether `redOn === true`. This will confirm whether we can shoot at a red on our next go. We then need to check that `balls[0].quantity > 0` to confirm there are still reds available. If we fail either of these tests an alert message will be returned. If we pass both tests we can now proceed to update the state of the game:

    function potRed() {

    //if a red has just been potted:

        if (!redOn){
          alertText.innerText = "choose a colour ball";
          return;
        }

    // if there are no reds left:

        if (balls[0].quantity <= 0){
          alertText.innerText = "already potted reds";
          return;
        }

    //otherwise:

          score ++;
          balls[0].quantity -= 1;
          redOn = false;
          alertText.innerText = "you potted red";
      }

Case 2:

When we try to pot a colour ball we need to check whether `tableCleared === true`. This will confirm what phase of the game we are in. If `tableCleared === true` we will move on to case 3, which handles the "clear the colours" phase. Otherwise we are still in the "red/colour" phase, so we now need to check the value of `redOn` to find out if we can shoot at a colour ball on our next go. If we pass this test, we can now update the state of the game:

    function potColour(colour) {

    //if all reds and final colour ball potted:

      if (tableCleared) {
        clearColours(colour);
        return;
      }

    //if a colour ball has just been potted:

      if (redOn) {
        alertText.innerText = "choose a red ball";
        return;
      }

    //otherwise:

      score += balls[lookup[colour]].points;
      redOn = true;
      alertText.innerText = "you potted " + colour;

    //toggle tableCleared if final colour ball has just been potted:

      if (balls[0].quantity < 1){
        tableCleared = true;
      }
    }

Note that as well as updating `balls`, `score` and toggling `redOn` we now need to run a conditional against `tableCleared` every time we pot a colour during the "red/colour" phase. Remember, the reason why we check the game phase here and not during `potRed()` is because we only enter the "clear the colours" phase after the final red *and* the subsequent colour are potted. If `balls[0].quantity < 1` and we've just potted a colour, we have satisfied these conditions and `tableCleared` can be toggled to `true`.

Note also that `potColour()` takes `colour` as an argument; we can pass a string like "yellow" or "green" into the function and use our lookup table to index this against the `balls` array.

Case 3:

This is our alternate case when a colour ball is selected during the second phase of the game. During this "clear the colours" phase we have new rules: we must pot all the colour balls in the correct points order, starting with yellow and finishing with black. Because the rules are now different, it felt simpler to create a new function to handle this, but case 3 could also be included as a branch within the potColour() function from case 2.

When we try to pot a colour ball we must first check that `balls[lookup[colour]].quantity > 0` to confirm the ball has not already been potted. Next, we need to confirm that we are potting the ball at its correct order in the sequence. To do this, we iterate through the `balls` array up to the colour we are trying to pot, checking whether any of the colours have `quantity > 0`. If we find a ball with `quantity > 0` we stop immediately and return an alert stating that this ball must be potted first. If we pass that test, and we know that the ball we are trying to pot has `quantity > 0`, we know that the ball is being potted in the correct order, so we can go ahead and update the game state.

    function clearColours (colour) {

      //if colour ball has already been potted:

      if (balls[lookup[colour]].quantity < 1){
        alertText.innerText = "already potted " + colour;
        return;
      }

      //else iterate through colour balls; if an earlier colour ball still needs to be potted:

      for (let i=1; i<lookup[colour]; i++){
        if (balls[i].quantity > 0){
          alertText.innerText = "you must pot " + balls[i].colour + " first";
          return;
        }
      }

      //otherwise:

      score += balls[lookup[colour]].points;
      balls[lookup[colour]].quantity --;
      alertText.innerText = "you potted " + balls[lookup[colour]].colour;

    }

Great! We've now written code to handle the game state. The only thing left to do is to write some functions to tidy things up and update the DOM so our score bar displays correctly.

`clearAlert()` allows us to clear our alert text; we'll call this every time we call one of our potting functions.

    function clearAlert () {
      alertText.innerText = "";
    }

We've already mentioned the need for an `updateRemaining()` function to keep track of the number of points in the game. This will be called on initialisation before the game starts to set `maxPoints` and `remaining`. It will then be called every time we call a potting function and pass all the conditionals to legally pot the ball. To start with, we iterate through `balls`, using `total` to make a running count of `ball.points * ball.quantity`. This accounts for potting all the red balls, and potting all the colours during the "clear the colours" phase. However, we still need to add the colour balls available during the "red/colour" phase. For every red ball we can pot one colour ball, and since we are trying to calculate the maximum points remaining, we'll assume this is always the black ball, which is worth the most points. To get the correct value we need to use `redOn` to check whether the ball we've just potted is a red. if `redOn === true` we can pot a black ball for every red ball, so  `total += balls[6].points * balls[0].quantity`. If `!redOn` we can pot a black ball for every red ball, but we also still need to pot the colour for the red we've just potted, so `total += balls[6].points * (balls[0].quantity + 1`.

    function updateRemaining () {

      let total = 0;

      for (const ball of balls){
        total += ball.points*ball.quantity
      }

      if (redOn){
        total += balls[lookup[black]].points * balls[lookup[red]].quantity;
      }
      else {
        total += balls[lookup[black]].points * (balls[lookup[red]].quantity + 1);
      }

      return total;

    }

Finally, we need to write the function to update our DOM. The mark-up for our score bar elements looks like this:

    <h2 id="score">score: 0</h2>
    <div id="barContainer">
      <div class = "bar" id = "maxBar">
        <div class = "bar" id="pointsBar"></div>
        <div class = "bar" id="remainingBar"></div>
      </div>
      <div id="pointer">
        <div id = "untilWin">▲ win in 74 points</div>
      </div>
    </div>

The `maxBar` element is the "outline" of the score bar. Following good responsive design practice, in the CSS, its `width` is set to 100% of its container, which means it will scale to the size of the viewing window. The `pointsBar` and `remainingBar` elements are the "points scored" and "points remaining" parts of the score bar. The full width of `maxBar` is equivalent to a perfect score of 147 points, so the widths of `scoreBar` and `remainingBar` should always be defined relative to this. With perfect play, `scoreBar` and `remainingBar` will fill the whole width of `maxBar`, but every time a non-optimal scoring choice is made the number of points in the game will go down, and we'll see empty space appear in `maxBar`, showing the difference between the perfect score and the maximum possible score now achievable in our game.

 We'll control the size of these bars using the `width` property in the CSS as well; by creating these as child elements to `maxBar` and using percentage values for width (rather than px, rem, etc.) we can easily express the size of these bars in relation to the width of `maxBar`. If we adjust the width of `maxBar` by scaling the browser window, the scaling will be inherited by `pointsBar` and `remainingBar`, keeping everything locked in proportion.  

The `pointer` element and its nested `untilWin` element show the winning line on the score bar. The position of `pointer` will be changed using the `left` CSS attribute.

We'll use `document.getElementById()` to access the `pointsBar`, `remainingBar`, `pointer` and `untilWin` elements in the Javascript. Once we have access to these we can write the `updateBar()` function:

    function updateBar() {

      // total points left in game
      let pointsAvailable = score + updateRemaining();

      let winningScore = (pointsAvailable%2 === 0) ?
      (pointsAvailable/2)+1 :
      Math.ceil(pointsAvailable/2);

      //update CSS with new values:

      pointsBar.style.width = `${score/maxPoints*100}%`;
      remainingBar.style.width = `${updateRemaining()/maxPoints*100}%`;
      pointerElement.style.marginLeft = `${winningScore/maxPoints*100}%`;

      untilWin.innerText = (winningScore - score >= 0) ?
      `▲ win in ${winningScore - score} points` :
      "▲ win achieved";
    }

Two new variables, `pointsAvailable` and `winningScore` allow us to update the position and text of our pointer element. Meanwhile, the `scoreBar` and `remainingBar` elements are upated using the globally available values for `score` and `updateRemaining()`. We also have access to anothe global variable, `maxPoints`, which represents our "perfect" 147 score. Since we need our `scoreBar` and `remainingBar` to be defined in relation to this perfect score we simply divide them by `maxPoints` and multiply by 100 to get a percentage value, which can now be passed back into the CSS. From here, the browser can calculate the correct pixel widths.

So that's it! A functioning score calculator for snooker which provides an interesting, visualisation of the game state as the score changes. Having tested this I consider it viable, but there are plenty of updates worth making for the next version of the application.

When I work on this again I'll focus on improving the user interface to make it simpler and more intuitive, and improving the score bar visualisation to be simpler to understand without a lot of explanation.
