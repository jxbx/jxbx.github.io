---
layout: post
title: Building a score calculator for Snooker
date: 2021-02-08
---

BreakBuilder v0.1 is a simple web application which works as a score tracker in the game of snooker. The BBC sometimes show an [interesting score graphic](https://www.reddit.com/r/snooker/comments/65oel7/can_anyone_explain_the_point_of_this_infographic/) alongside their snooker coverage, and this is essentially what I've been trying to recreate. Due to the fiddly nature of snooker's scoring system, it's necessary to keep track of several variables in order to correctly compute the score as the game progresses, which meant it was a good opportunity to learn about state management. I've been studying React recently, so, having developed this in vanilla Javascript I'm going to see if I can later redevelop it as a React application using React's very different paradigm for state management.

Background:

Snooker is a cue sport, like pool (yes, they really are sports!), which you play by shooting balls into pockets in the corners and sides of a special table. Snooker is played on a much larger table than pool and is an unbelievably difficult game in real life. It's also insanely popular; in the UK, prime time TV schedules are wiped to broadcast it, and millions of people watch.

Snooker is a two player game played in segments called "frames" (basically the same as "racks" in pool). the winner at the end of each frame is the person who scores the most points, and the overall winner is the first person to accumulate some agreed number of frames. In casual play this might be first to five, but in elite play an outright win can require you to win up to 18 frames.  

Snooker has a unique scoring system, which I've often had to explain to non-enthusiasts; usually this starts with me saying "it really isn't that complicated..." and ends with them leaving the room. In my defence, it really is quite simple:

1. There are seven different colours of ball, each worth a different number of points.

Red (1)
Yellow (2)
Green (3)
Brown (4)
Blue (5)
Pink (6)
Black (7)

2. There are fifteen red balls but only one each of the other colours. These other colours are usually referred to collectively as the "colour balls" (as opposed to the "red balls").

3. To score a run of points (a "break") you must start by potting (scoring) a red ball. You must then pot a colour ball, and continue by alternating red-colour-red-colour for as long as you can.

4. When you pot a red ball it is removed from the table for good. When you pot a colour ball it is brought back onto the table so it can be potted again.

5. Eventually, all fifteen red balls will be potted and only the colour balls will remain on the table. At this point, you must pot the colour balls in order of points value, working your way up from yellow to black.

If you succeed in doing all this, you will have made what is known as a "clearance". This happens pretty often on TV, but it's actually insanely difficult, and most amateur players can't do it. If you miss at any point, the other player comes to the table and starts the sequence again, beginning with a red (or whichever colour has the lowest value if all the reds are gone), hoping to accumulate enough points to overtake you. There are ways to score points from fouls, and technically the frame isn't over until all the balls are potted, but players will usually concede rather than coming to the table if their opponent misses but it's mathematically impossible for them to catch up by potting all the remaining balls.   

With this in mind it's pretty easy to calculate the maximum number of points a single player could score in a frame.

    (red.value + black.value)*red.quantity + (total value of the six colour balls)

Fill in the figures and we get the magic figure:

    (1+7)*15 + 7! = 147

So how do we keep track of the score here? And how do we go about creating something that looks a bit like the BBC's score bar?

There are a few different variables we need to think about:

1. *What colour next?* Are we shooting at a red, or a colour? If it's a colour, which one?

2. *What stage of the game are we in?* The scoring sequence and the behaviour of the balls changes once all the reds are potted, so we need to know when to make this switch.

3. *What's the score?* How many points have we accumulated so far?

4. *Where's the winning line?* At what point are we mathematically certain of winning (barring points from fouls), and how many points do we need to get there?

5. *What's the total number of points in the game?* You might not expect this to be variable, but it is. To get the maximum possible score you must pot a black ball with every red ball. Potting a different colour increases your score but reduces the total number of points in the game. Potting a red and then missing also reduces the number of points in the game, because your opponent must score a red as their first ball, meaning the colour ball is missed out.
