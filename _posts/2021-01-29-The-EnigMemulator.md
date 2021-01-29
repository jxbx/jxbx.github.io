---
layout: post
title: The EnigMemulator
date: 2021-01-29
---

I built the [EnigMemulator](https://www.justinbailey.net/projects/enigmemulator.html) a loose clone of the Enigma code machine which was used by the German military to send encrypted messages during World War II. I’ve been looking for a project to bed in some of the Javascript fundamentals I've learnt, and this has been super fun to work on. The [Wikipedia page](https://en.wikipedia.org/wiki/Enigma_machine) on the Engima machine is brilliant, so I recommend reading more there if you’re interested, but I’ve tried to give a little flavour below of how the original machine worked before jumping into some details of the coding.
<iframe src="https://www.justinbailey.net/projects/enigmemulator.html" width="100%" height="800"></iframe>

The machine

The original electro-mechanical Enigma machine looks a little bit like a typewriter. Plaintext messages are entered one character at a time using the keyboard, and a series of modules with complicated internal wiring to link each plaintext character (A,B,C ...) to a new ciphertext character. Every time a plaintext character is entered, the equivalent ciphertext character is output on a light-up display for the user to write down as part of their coded message. 

Simple alphabetic ciphers which map a message using a scrambled alphabet as the key are very easy to break using simple techniques, like frequency analysis. I know that E,T,A,O,I,N are the most commonly used letters in English, so if I view some coded messages and count which letters occur most often I'll be well on the way to breaking the cipher with no special tools at all! To make things worse, repeating the encryption using a whole series of alphabetic substitutions doesn't make codecracking any harder. As long as we know that every plaintext character maps onto some unique ciphertext character we can skip out all the intermediate stages and look purely at the input and output when we do our frequency analysis.  

In order to make full use of these multiple substitutions, we need to add an additional process which mutates the input in a different way. The enigma machine uses a clever  "stepping" function, which updates the cipher every time a new character is entered. Let's say our plaintext alphabet (a,b,c,d,e...) maps onto some ciphertext alphabet (p,z,l,k,m...). In a static cipher, a will always = p and z will always = b (and so on). With a "stepped" cipher, each time I enter a character the cipher "steps" forward by one. After one keystroke, a will now map to z. After another keystroke a will map to b. With a static cipher, the text "aaa" will always map to "ppp". With this stepped cipher, "aaa" will instead map to "pzl", which is much harder to figure out. The relationships between the input and output characters are now constantly changing, and any character can now be substituted by any other character, depending on when it is entered. Clearly, frequency analysis will not work here! Although our encryption is governed by only a few simple rules, from the outside it’s now extremely difficult to discern what these are: perfect!

The original Enigma machine was set up a bit like a clock, with subsequent modules acting like second, minute and hour hands. The first module would step forward once every keystroke, completing a full rotation after 26 strokes (since the alphabet has 26 characters). The module two (the "minute hand") would step forward once for every full rotation on module one, and module three ("the hour hand") would step forward once for every full rotation of module two.

Step rate:

module 1: 1 
module 2: 26
module 3: 26*26 = 676 

That’s a very basic analysis of the original Enigma. I now needed to replicate this as a Javascript program. A machine with clear inputs and outputs, string manipulation techniques, and iterative processes is already really suited to this kind of adaptation, but I wanted to avoid being constrained by the need to make an exact replica, so my aim was to create something similar, while making changes and alterations if it seemed interesting and/or convenient to do so, without ruining the “spirit” of the project. 

Building the program

The EnigMemulator uses three levels of alphabetic substitution, and at each level the substitution string can be varied by selecting an initial starting position (startPos) and a stepping rate (stepRate). While the original Enigma machine had a fixed step rate as described above, I decided that my machine should allow this to be set freely. The stepRate can be entered independently for each substitution string. 

At each level of the encryption, the substitution string can be set to one of three values:

A: “QWERTYUIOPASDFGHJKLZXCVBNM”\\
B: “MLPNKOBJIVHUCGYXFTXDRSEAWQ”\\
C: “BNCMXZLAKSJDHFGYTURIEOWPQV”

Adjusting the startPos simply changes the indexing on the string, like so:

subString=“QWERTYUIOPASDFGHJKLZXCVBNM”

startPos = 0:  “QWER…VBNM”\\
startPos = 1:  “WERT…BNMQ”\\
startPos = 2:  “ERTY…NMQW”\\
startPos = 3:  “RTYU….MQWE”
…\\
startPos = 25: “MQWE...CVBN”

Because there are 26 characters in the alphabet, a  startPos of 26 simply wraps the string back round to 0. Any number higher than this will simply map to a lower value, so there are only 26 distinct settings available. 

Adjusting the stepRate allows us to shift the string every time a character is entered. This is equivalent to counting forward n positions along the string for every new character that is typed. 

Input = “AAA”\\
subString = “QWERTYUIOPASDFGHJKLZXCVBNM”\\
startPos = 0

stepRate = 0 … Output = “QQQ”\\
stepRate = 1 … Output = “QWE”\\
stepRate = 2 … Output = “QET”

This functionality means that any character can be replaced by any other character, depending on the settings chosen and the length of the string. In the example above, repeatedly entering the same character results in a different output each time. Conversely, setting the stepRate to 25 and entering a string of successive characters like “ABC” will result in a bizarre looking (but correct!) output of “QQQ”, where the same character is returned each time. 

Like before, any value of 26 or above simply wraps the string round to one of the initial 26 positions, setting a limit on how many distinct settings we can choose. 

Writing the encryption function

The route our plaintext input takes through the code machine looks something like this:


                startPos1 	  startPos2      startPos3
                   |               |		|
      Input  >  subString1  >  subString2  >  subString3  >  output
                   |               |              |
                stepRate1 	  stepRate2      stepRate3

The encryption has three stages, and at each stage we need to set `startPos`, `subString` and `stepRate`, making nine variables in total. These variables are all stored in a nested array for easy access. 

The `startPos` and `stepRate` variables are a bit of a distraction at this stage, so let’s focus initially on just taking our plaintext input and running it through the `subString` variables. 

We type our plaintext message into a text input box, and this gets passed into the `showCiphertext()` function, forced to lowercase and assigned as the variable `string` . Starting with the first character of our input string we generate a `charIndex` using `charCodeAt()`. This assigns a numerical value based on the character’s ASCII code. The ASCII codes for the lowercase letters a-z range from 97-122, so to make life easier we subtract 97, meaning `charIndex` values  for a, b, c … z will be 0, 1, 2 ... 25 respectively. Uppercase letters have their own codes, which is why we needed to force lowercase in advance; a couple of additional lines of code are also needed to stop any non-alphabetic characters from being handled and to preserve the space character. 

Next up, we use the `charIndex` to assign `charNew` as follows:

    let charIndex = string.charCodeAt(n) - 97;
    ...
    charNew = subString.charAt(charIndex);

To show how this might work across multiple substitution strings, have a look at the illustration below, which uses the input string “armadillo”:


    “armadillo” 
    |
    a (string[0] = “a”, charIndex = 0)
    |
    qwertyuiopasdfghjklzxcvbnm (charNew = subString.charAt(0) = “q”)
    |_______________
                    |
    abcdefghijklmnopqrstuvwxyz (string = “q”, charIndex = 16)
                    |
    qwertyuiopasdfghjklzxcvbnm (charNew = subString.charAt(16) = “j”)
              ______|
             |
    abcdefghijklmnopqrstuvwxyz (string = “j”, charIndex = 9)
             |
    qwertyuiopasdfghjklzxcvbnm (charNew = subString.charAt(9) = “p”)
             |
             Output = “p”

Wow! Now how about adding `stepRate` and `startPos` into the mix? As mentioned before, these two values will take a `subString` and nudge the starting point to a different position along the string. `startPos` will do this once, at the start of the string, and  `stepRate` will do this for each time we encounter a new character in the string. If we use indexing we can convert everything into numbers and make this really simple. 

We started along this path by assigning `charIndex` .  A new `encodeChar()` function takes this value and manipulates it based on the `startPos` and `stepRate` values we’ve selected. 

          function encodeChar(input, startPos, stepRate, num) {
            return (input + startPos + stepRate * num)%26;
          }

Let’s try this on our test phrase, “armadillo”:

    “armadillo” 
    |
    a (string[0] = “a”, charIndex = 0)

    encodeChar (0, 15, 9, 0);

    //expected result: 15


    “armadillo” 
    |
    r (string[1] = “r”, charIndex = 17)

    encodeChar (17, 15, 9, 1);

    //expected result: 13

    …

Notice that while the `startPos` value stays the same,  the `stepRate` value gets multiplied out as we progress along the string. `startPos` only defines our starting position. `stepRate` moves us forward by a set amount every time we enter a new character. 

Whatever numerical result we get, we need to ensure it maps to a value in the range 0-26, so it can be assigned to one of the 26 characters in the alphabet, so we need to use modulus to get a remainder on any values that are too large. 

The `encodeChar` function sits inside `showCiphertext` and handles the numbers, while `showCiphertext` deals with converting strings into numerical form and back, assigning the ciphertext output to the  variable `newString`. Next, we assign `newString` to `string` and start the whole process from the top. Remember the nested array where we are storing all our parameters for the encryption? It looks like this:

    const subsArray = 
          [[substring1Element, startPos1Element, stepRate1Element],                
           [substring2Element, startPos2Element, stepRate2Element],           
           [substring3Element, startPos3Element, stepRate3Element]];

Once we have our encryption function, we can iterate through each set of variables using a for loop:

      for (let i = 0; i<subsArray.length; i++){

        let subString = subsArray[i][0].value;
        let startPos = parseInt(subsArray[i][1].value);
        let stepRate = parseInt(subsArray[i][2].value);

Here’s an example of how the input string flows through the function using `subsArray = [[A,0,0],[A,0,0],[A,0,0]]` :


    string = “hello”          ... subsArray[0]           
        |		 
    newString = “itssg”	... subsArray[1]  
        |		
    newString = “ozllu”	... subsArray[2] 
        |		
    newString = “gmssx”


What about decoding?

Adding a decode function made sense, both as a useful feature, and as a way of verifying that the program was actually generating real ciphertext instead of a nonsensical string! This was pretty simple: `showPlaintext` is a mirror image of `showCiphertext`, performing the same processes in reverse, and iterating backwards through the `subsArray`. Likewise, `decodeChar` is a mirror version of `encodeChar`:

    function decodeChar(input, startPos, stepRate, num){
      return (input + (26 - startPos) + (26 - stepRate) * num)%26
    }

Rather than having two separate user interfaces for encoding or decoding a message, it made sense to simply include a toggle to select one or other process. By default the program is set to “encode”: the user types their plaintext into the text input box, sets the parameters, and watches their ciphertext appear in the output box at the bottom of the interface. Selecting “decode” puts the machine in reverse mode, and the user can now type in ciphertext, using the parameter controls to look in the correct pattern to decrypt the message. To accomplish this, the `showCiphertext` and `showPlaintext	` functions are wrapped in a `runEnigmemulator()` function which uses a conditional to check the user input before running one or other of the functions. 

The key

As a final feature, the function `generateKey()` allows the user to generate a keystring which they can use to record the encryption parameters on their message. `generateKey()` checks the values in the `subsArray` and returns a key in the form “X-XX-XX-X-XX-XX-X-XX-XX”, listing the nine parameter settings and separating them with dashes.

Finally

This was a really challenging and fun project, and although the EnigMemulator is slightly different from the original Enigma, I still think it’s a pretty nice interpretation. The original machine became more complex over time and had some additional features added to increase the complexity of its encryption - it was a shame not to include these, but don’t worry, because EnigMemulator 2.0 will come around soon!
