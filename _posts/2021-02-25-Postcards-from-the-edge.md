---
layout: post
title: Postcards from the edge
date: 2021-02-25
---

I've been spending some time working through problem solving challenges on HackerRank; here's one I really enjoyed. It seemed easy to solve at first glance, but it threw up some interesting edge cases, and after a good start it took me a while longer to write a comprehensive function which would handle all the test inputs.

The full problem description is available on the challenge page, but here's my summary:

-You start with two strings, `s` and `t`. 

-You can perform two operations on string `s`:
	-Delete the last character in the string
	-Add a new character to the end of the string

Given the value `k`, is it possible to mutate string `s` into string `t` in exactly  `k` moves, only using these two operations? Return `Yes` or `No`.

Here's an example of how this might work:

    s = "superman"
    t = "supernoodle"
    k = 9

    //delete the letters "n", "a" and "m" from the end of string s (3 moves)
    //add the letters "n", "o", "o", "d", "l" and "e" to the end of string s (6 moves)

    6 + 3 = 9 = k

    return "Yes"

Great! Notice that because the first five letters of string `s` perfectly match the first five letters of string `t` we don't need to mutate them, which saves us several moves. If we had to delete the whole of string `s`, our total number of moves would be `s.length + t.length`, or `8 + 11 = 19` but instead it is now going to be `s.length - {length of matching part} + t.length - {length of matching part}`, or `8 - 3 + 11 - 3 = 9`. 

A good way to track whether we have any matching leading characters would be to iterate through string `s` and record any characters that match. I would do this with:

	let match = "";
      
        for(let i=0; i<s.length; i++){
            if (s[i]===t[i]){
                match += s[i];
            }
            else {
                break;
            }

We can now step through string `s`, updating the variable `match` for as long `s[i]===t[i]`. As soon as `s[i]!==t[i]` we will break out of the loop, but we will still have our `match` variable to hand. 


Following our earlier logic, we can now easily calculate the minimum number of moves to mutate `s` into `t`:

	let ans = t.length - match.length + s.length - match.length

Or to simplify:

	let ans = t.length + s.length - 2*match.length

This is excellent, because it works for all cases of `s` and `t`. Check out the following examples:

	s ="bulbous"
	t= "bulbasaur"
	
	s= "charizard"
	t= "charred"
  
In case 1, where `s.length < t.length`, our loop will stop after `s[3]` because we've declared `i<s.length`. This would also work for `s.length === t.length`.

In case 2, where `s.length > t.length` our loop will stop after `s[3]` because `t[4]` is `undefined` and doesn't satisfy `s[i]===t[i]`.

The method for breaking out of the loop changes, but the end result is the same. In each case, we know that `match = 4`, so we can go ahead and calculate that `ans = 8` for each example. For these examples I've intentionally chosen words which share leading characters, but this is also fine for words that don't, or words that have zero length. In both cases `match.length` would be zero, and `ans` would simply be `t.length + s.length`. The question doesn't ask us to solve for words with zero length, but it's nice to know we've got this covered!

It feels like we've nearly solved this! Now we just need to compare `ans` against `k`, returning `Yes` if they are the same, and `No` if they are different. 

Right? Wrong. The `ans` we've obtained isn't the *only* answer to this problem, it's just the minimum one. In my summary I cheekily glossed over one important piece of information from the question rubric: "performing \[the delete function] on an empty string results in an empty string". I'm sure a lot of people answering this question will have noticed this and understood how it affects the solution straight away, but I'd already done all the previous work before picking up on this, which is why I'm only mentioning it now. 

If we can use up moves by deleting on an empty string, we can take as many moves as we like to mutate string `s` into string `t`. Here's an example:

    s="abdomen"
    t="abracadabra"

The minimum score for mutating `s` into `t` is `s.length+t.length-2*match.length`, or `7+11-4 = 14`. However, with our new knowledge, we could instead delete all of `s`, then use up some arbitrary number of moves deleting on an empty string, then finish by adding all of the letters to make up `t`. Our score would now be `s.length+t.length + {some arbitrary number of moves}`. This is important, because we can now see that as long as `k >= s.length+t.length` we can always come up with a score that will match `k`.

We can now update our script. Straight off the bat, before we even bother to look at the content of strings `s` and `t` we can say:

     if (k>=s.length+t.length){
            return "Yes";
        }

So that's one major loophole dealt with; surely we've now figured this problem out? Well not quite. There's a slightly different way for us to manipulate our score without deleting on an empty string, and this one is not explicitly pointed out in the rubric. Here's a further example:

    s="moo"
    t="moomin"

Clearly our minimum score here is `3`. However, we can extend our score by writing and deleting some or all of the string over and over again. The score for something like `moo>moom>moomi>moomin>moomi>moomin` would be 5. The score for `moo>mo>m>mo>moo>moom>moomi>moomin` would be 7. Like before, we can keep extending this forever to pump our score, but this time there is a restriction. While deleting on an empty string allows us to increase our score in increments of 1, with this new technique whenever we delete a character we must replace it, so we can only increase our score in increments of 2. 

In other words, we can generate any score in the form `minAns + n*2`, where `minAns` is the lowest possible score, and n is the number of paired delete/add moves we want to make to extend our score.  When dealing with odd and even numbers we know that `odd+even === odd` and `even+even === even`, so if our `minAns` is odd any new answer we get from this technique must be odd as well. Likewise, if `minAns` is even, any new answer must be `even` too. We can now check our score against `k` using this test:

	if (k%2 === 0 && minAns%2 === 0 || k%2 !==0 && minAns%2 !== 0){
            return "Yes";
        }
        else {
            return "No";
        } 

This edge case is quite tricky to spot because it only applies in a very limited set of circumstances. Using the empty string deletion trick we figured out that:

	if (k>=s.length+t.length){
            return "Yes";
    }

...so our test above will only be needed if `k<s.length+t.length` but larger than our minimum answer. Here's a final example:

    s="jig"
    t="jigglypuff"

    minAns = 7

    Yes: k>=13, k=9, k=11
    No: k<7

The results `No` for `k<7` and `Yes` for `k>=13` are easy to figure out, but the extra test is needed to pick out those two loose values (9 and 11) where `minAns < k < s.length+t.length`. 

With a little bit of tidying, my complete solution for this challenge looks like this:

    function appendAndDelete(s, t, k) {

        if (k>=s.length+t.length){
            return "Yes";
        }
        else{
            let match = "";
            for(let i=0; i<s.length; i++){
                if (s[i]===t[i]){
                    match += s[i];
                }
                else {
                    break;
                }
            }
            let minAns = t.length + s.length - 2*match.length;
            if (k < minAns){
                return "No";
            }
            else if (k%2 === 0 && minAns%2 === 0 || k%2 !==0 && minAns%2 !== 0){
                return "Yes";
            }
            else {
                return "No";
            } 
        }
    }


I've come across so many situations while learning to code where I've been caught out by pesky edge cases; on this occasion I could have saved some time if I'd read the question more carefully before writing my solution. An optimal approach could have involved carefully examining every facet of the problem at hand and reasoning out all the edge cases before writing any code at all. However, some edge cases will be hard to fathom out until they present themselves as bugs in the code, and I think there's a lot to be said for the pragmatic approach; why not start off with a best guess and then examine, tinker and amend, until all those edges are nicely tidied away? 
