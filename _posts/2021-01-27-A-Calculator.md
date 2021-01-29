---
layout: post
title: A calculator
date: 2021-01-27
---
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">




I was looking for a Javascript project which I could complete in a few hours, so I decided to have a go at the classic challenge of building a calculator from scratch. To avoid making this project over-complex I decided from the outset that it would be a good idea to set limits, which meant only building in basic arithmetic, and no fancy features like memory/recall. Setting a realistic scope from the outset was probably the biggest timesaver of all while making this, since adding extended functionality would have rapidly expanded the complexity of the program. 

<iframe src="https://jxbx.github.io/projects/minicalc.html" width="100%" height="600" style="border:none;">
</iframe>



The way this calculator works is very simple: 

step 1: enter a sum form of a string
step 2: submit the string 
step 3: evaluate the string
step 4: return the result

The inputs and outputs required are: number and symbol buttons and an equals button; a display area to show the sum being evaluated and return the result. 


Layout

The calculator is styled using a CSS grid layout. Within this there are separate `<div>` elements with class attributes `numbers`, `symbols`, `equals` and `header`. The `header` element contains the calculator's display and the `number` and `symbol` elements each contain nested grids to facilitate laying out the calculator buttons. In this situation it's essential for all the elements to have their positions locked in relation to one another, and the rigidity of the grid layout is ideal for this. 

The display function

the `displayInput(input)` function takes a specific character input and assigns it to a variable called `inputString` which is displayed inside a `<p>` element in the DOM. 

Each number and symbol button has an `onclick` which submits the relevant value into this function, printing out a string ready to be evaluated. Seems simple! And it is, as long as the user enters a string in the correct format. We want nice, arithmetically meaningful inputs like `2+7`, `1+1` or even `11.8/6.245*15-2.555`but since the `inputString` is built up one character at a time through repeated function calls, a user can easily submit a nonsensical string like `-*2.2-+33--`. There's an enormous number of ways to write a nonsense string, and the challenge here is to write conditions to deal with every one of them. I came up with the code below:

    function displayInput(input) {
      const lastChar = inputString[inputString.length - 1];
      //special conditions when input is "+", "-", "/" or "*"
      if (symbols.includes(input)) {
        if (inputString.length === 0) {
          console.log("enter a number");
        } else if (symbols.includes(lastChar) || lastChar === ".") {
          inputString = inputString.substring(0, inputString.length - 1) + input;
        } else inputString += input;
      }
      //special conditions when input is "."
      else if (input === ".") {
        if (inputString.length === 0 || symbols.includes(lastChar)) {
          inputString = inputString + "0.";
        } else if (lastChar === ".") {
          inputString = inputString.substring(0, inputString.length - 1) + input;
        } else inputString += input;
      }
      //conditions for all other inputs
      else {
        inputString += input;
      }
      document.getElementById("display").innerHTML = inputString;
    }

Now the function is able to look back at `lastChar` to see the previous character in the string, and respond in one of several ways to ensure that symbols and decimal points cannot be added at the beginning of a string, and that symbols and decimals cannot follow one another.

One condition which I did not fully manage to account for was the entry of multiple decimal points. Multiple decimals in a single string are fine in some circumstances, like `2.2+3.1` but unacceptable in others, like `5..5.2+1`. Preventing successive decimals is easy, but it isn't possible to prevent things like `2.2.1` from being entered when you are only reviewing inputs against the previous character in the string. I couldn't see a clean way to fix this without completely reviewing my approach, so in the interests of keeping things going at a good pace, I (painfully) left this bug unfixed!

The calculate function

Decimal errors notwithstanding, `displayInput(input)` does a decent job of ensuring that only arithmetically meaningful strings can be written to the calculator display. Our new problem is that even when we write a completely valid expression like `2+2` the program will not be able to evaluate it while it's presented as a string. In other words, `"2+2" != 2+2` . A lazy/cheat solution would be to call `eval()` on the string, but since this is expensive and [problematic in a few ways](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!), I did things differently. 

the `calculate()` function takes the `inputString` and splits it into two arrays (using regular expressions to help split the string): `numArr` for numbers, and `symArr` for symbols. As an example of this, `calculate()` will take the string `"2+5-7+8"` and generate `numArr = ["2", "5", "7", "8"]` and `symArr = ["+", "-", "+"]` . 

The function then iterates through these arrays, initially making and evaluating an expression from `numArr[0]`, `symArr[1]` and `numArr[1]` and then continuing step by step, constantly updating the value of the sum to a `result` variable. 

    function calculate() {
      //generate separate arrays of numbers and symbols using regular expressions
      let numArr = inputString.split(/\+|\-|\*|\//g);
      let symbolArr = inputString.replace(/[0-9]|\./g, "").split("");
      let result = parseFloat(numArr[0]);
      console.log(numArr);
      console.log(symbolArr);
      if (symbols.includes(inputString[inputString.length - 1])) {
        return;
      } else {
        for (let n = 1; n < numArr.length; n++) {
          if (symbolArr[n - 1] === "*") {
            result *= parseFloat(numArr[n]);
          } else if (symbolArr[n - 1] === "/") {
            result /= parseFloat(numArr[n]);
          } else if (symbolArr[n - 1] === "+") {
            result += parseFloat(numArr[n]);
          } else {
            result -= parseFloat(numArr[n]);
          }
        }
      }
      result = result;
      document.getElementById("display").innerHTML = result;
      inputString = [];
    }

For `"2+5-7+8"` we would evaluate the sum in stages something like this:

    numArr = ["2", "5", "7", "8"]
    symArr = ["+", "-", "+"] 

    result = 2
    result + 5 = 7
    result - 7 = 0
    result + 8 = 8

The `result` then gets written to the DOM. 

Note from the full function that in order for this to work parseFloat() is called. This ensures that whatever value is pulled through into to function is treated as a number. It also has the useful property of overriding any nonsensical decimal inputs. For example, `2.2.2` will simply be treated as `2.2` . Although this doesn't fix the bug I raised earlier, it does at least mean weirdly entered strings will be evaluated in a consistent way. 

This `calculate()` function is clunky, but it does the job. As a final challenge I decided to build numpad input, to allow the calculator to be operated from the keyboard as well as the mouse. This was pretty straightforward: I added an event listener for keydown events and wrote a new `keyInput()` function. When a number or symbol key is pressed on the numpad the associated character is written to the `inputString`, just as with the mouse inputs. I also assigned the `clearInput()` function (which resets the calculator) to backspace, and the `calculate()` function to the enter key. 

This all seemed so straightforward, so I was really dismayed when I tested out the numpad input and found a bug. The number and symbol inputs worked fine, by when I pressed enter something seemed to be going wrong with the calculate function: when I submitted an expression like `2+7+8`, instead of returning the correct value, 17, I would get 8. It seemed like the first part of the expression was being discarded, and only the last character was being written to the DOM. Again, this only happened with keyboard inputs! Clicking the "=" button on-screen worked fine. The bug seemed really hard to reproduce, but after testing I figured out that when the program was loaded it would function fine if only keyboard inputs were used. It only started playing up when some mixture of mouse and keyboard inputs was used, and as soon as the bug occurred the program would be broken until the page was refreshed. 

I reviewed this with my friend James to try and spot the bug and we both struggled to identify the problem. Stepping through the keyInput function with a debugger  didn't reveal any problems, but by inserting several console.logs into the code we were able to figure out that `displayInput()` was somehow being called after `clearInput()`, which is not specified anywhere in the code! We eventually figured out the reason why: by clicking a button on the calculator I was giving it focus. If I then hit the Enter key it would perform its default behaviour, which is to trigger a button with focus. 
If I used the mouse to input the expression `2+4`, and then hit the Enter key, the `calculateInput` function would run correctly (returning `6`), but the default behaviour would then trigger the last button I'd clicked (the "4" button) and run `displayInput(4)`, overwriting the correct result. The solution was to call `event.preventDefault()` on Enter key as part of the `keyInput()` function, overriding its default behaviour.

This was an easy fix, but the problem was incredibly hard to diagnose! One reason why is because I'd used the following CSS to style the calculator:

    input[type=button]:focus {
      outline: none;
      box-shadow: none;
    }


This meant that the usual border you'd see around a button to indicate focus was turned off. If it had been on the problem would have been obvious! A small amount of styling is useful just to help visualise a project while building it, but I'd clearly got ahead of myself before properly completing the script, leading to conflicts in functionality. I ended up spending as much time fixing bugs as I did on the initial build. I guess there are two takeaways from this: firstly, while prototyping can be very fast, but debugging can be extremely fiddly and slow; secondly, doing things in order makes sense; I should have focused on completing the script properly before thinking too much about the form and appearance of the finished project. 

