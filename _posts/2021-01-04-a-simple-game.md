---
layout: post
title: A simple game
date: 2021-01-04
---

Here's a very simple game which plays a little bit like Snake ... without the snake. You play as the white dot, chasing a static enemy around the play area, and every time you catch the enemy it respawns in a random location. This is still trivial at the moment, since there's no additional gameplay element to add increasing interest or difficulty. For now the limiting factor is simply your own endurance or boredom! 
<iframe src="https://www.justinbailey.net/projects/simplegame.html" height="1200"></iframe>
I've spent a bit of time learning how to draw elements using the Javascript canvas, but I decided to try a different approach here: the game is drawn using the DOM, and the play area, player and enemy are all simple <div> elements. I like the fact that there's no need to write an explicit rendering function in the Javascript with this approach, although there are limitations to drawing shapes in CSS.  

Player, enemy, and play area

I started off by creating an HTML file and adding <div> elements for the player, play area and score counter. I then added some simple CSS styling and began writing the program. 

The initial <div> elements are linked into the Javascript from the HTML, but the enemy element is actually defined within the program body:

    const enemyElement = document.createElement("div");
    enemyElement.id = "enemy";
    document.getElementById("playArea").appendChild(enemyElement);

While working on this I realised that allowing the program to generate new elements is much more dynamic than hardcoding them directly into the HTML, although for a game this simple either method works. 

Movement

The player is moved using `playerElement.style.top` and `playerElement.style.left` to access the player’s `top` and `left` properties in the CSS. By manipulating these values you can "push" the player around inside the play area. 

A couple of variables define the starting position of the playerElement in terms of x and y coordinates with respect to the play area. The `MoveUp()`, `MoveDown()`, `MoveLeft()` and `MoveRight()` functions access these coordinates and increment by 5px in the required direction when called. A condition is added using `Math.min` or `Math.max` to ensure `playerElement` can never leave the play area. 

Using an expression like `yPlayer <= {width of play area}` to add this condition is okay too, but it's a bit messy since it needs to be carefully defined to stop the playerElement from partially leaving the play area in limit cases. 

`Math.min` is a great option here as a simple method to enforce limits. 

    let yPlayer = 550;
    let xPlayer = 190;

    function moveUp() {
        yPlayer = Math.max(0, yPlayer - 5);
        playerElement.style.top = `${yPlayer}px`;
        }

    function moveDown() {
        yPlayer = Math.min(580, yPlayer + 5);
        playerElement.style.top = `${yPlayer}px`;
        }
        
    function moveLeft() {
        xPlayer = Math.max(0, xPlayer - 5);
        playerElement.style.left = `${xPlayer}px`;
        }

    function moveRight() {
        xPlayer = Math.min(380, xPlayer + 5);
        playerElement.style.left = `${xPlayer}px`;
        }

Collisions and respawning and scoring

The static enemy has its own position variables, which are generated using the Math.random method. The respawnEmemy() function allows us to update these variables with new random variables on call. 

    let yEnemy = Math.random() * 580;
    let xEnemy = Math.random() * 380;
    
    function respawnEnemy(){
    yEnemy = Math.random() * 580;
    xEnemy = Math.random() * 380;
    enemyElement.style.top = `${yEnemy}px`;
    enemyElement.style.left = `${xEnemy}px`;  
    }

The `updateScore()` function accesses a scoreTracker variable (initially set to 0), increment it, and returns the new value into an HTML element called "score". 

The `detectCollision()` accesses the values for `xPlayer`, `yPlayer`, `xEnemy` and `yEnemy` and uses a couple of comparative expressions to check whether these values overlap. A successful collision triggers the `respawnEnemy()` and `updateScore()` functions. 

Making it work

Finally, an `animate()` function wraps round these other functions and ends with a `requestAnimationFrame()` call to create a loop and ensure the play area is repeatedly refreshed. As mentioned, there's no need for an explicit render function because the DOM will handle this. 



Solving the movement problem

I added a couple of event listeners to detect keydown events and trigger the move functions. Project completed? Absolutely not. The game works okay in this form, but like many other beginner coders I've now learned that the program’s default response to keyboard inputs is seriously unsuited to fluid gameplay! 

The action we want is for the program to accept multiple inputs and interpolate these smoothly to give the impression of free and continuous movement in all directions. Inputting “up” and “left” at the same time should allow us to move diagonally, and switching from input from “left” to “right” should let us change direction instantly. Instead, the program’s default behaviour when it receives multiple inputs is to “forget” the initial input and stop until a new input is received, resulting in jerky movement. 

To override this behaviour we need to detach our move functions from direct control by the keyboard inputs and find some system for logging inputs so they aren’t “forgotten” when a new input is detected. 

The controller object below records boolean values against our arrow inputs. By default it records false, but it can be altered by two functions: updateKeydown() flips the value to true as soon as a keydown event is detected on the relevant key. The value stays true until the equivalent keyup event is detected on the same key by the updateKeyup() function, which flips it to false again. Any or all of the states in this array can read true or false separately or simultaneously. 

    const controller = {
        ArrowLeft: { pressed: false},
        ArrowUp: { pressed: false},
        ArrowRight: { pressed: false},
        ArrowDown: { pressed: false}
      };
  
      function updateKeydown(event) {
          if (controller[event.key]) {
          controller[event.key].pressed = true;
          event.preventDefault();
        }
      }

      function updateKeyup(event) {
        if (controller[event.key]) {
         controller[event.key].pressed = false;
         event.preventDefault();
        }
      }
  
 This is great: instead of using key inputs to directly move the playerElement we are using them to update the controller object. The controller records all of our input states continuously,  and passes these values into our move functions, which now interpolate smoothly when triggered. 

