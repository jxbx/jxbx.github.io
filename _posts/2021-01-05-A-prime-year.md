---
layout: post
title: Making the Earth wobble
date: 2021-01-05
---

My friend Lucie pointed out earlier this week that 2021 is a rare year whose value is the product of two consecutive primes. Apparently this hasn't happened since 1763 and won't happen again until 2491. Clearly this has great cosmological significance, so I decided to check the figures in case of any awkward mistakes.

In the code below the function `checkPrime(n)` generates an array of prime numbers up to some maximum value. The `primeMultiples()` function works through this array and logging every possible value for n * (n+1).

    let primes = [];

    function findPrimes(n) {
      for (let i = 2; i <= n; i++) {
        let isPrime = true;
        for (let j = 2; j < i; j++) {
          if (i % j === 0) {
            isPrime = false;
            continue;
          }
        }
        if (isPrime) {
          primes.push(i);
        }
      }
      console.log(primes);
    }

    findPrimes(100);

    function primeMultiples() {
     for (let n = 0; n < primes.length - 1; n++) {
        console.log(primes[n] * primes[n + 1]);
      }
    }

    primeMultiples();

Comparing against this output we can see that Lucie's initial dates were correct! Not a hugely difficult problem to solve, but it got me thinking about methods for generating primes. In my function I used trial division, a pretty naive approach where every number in the list of numbers [2,3,4,...n] is checked against every number below it to see if it will factorise. For each number, a variable `isPrime` is generated; this starts off `true`, and flips to `false` if a factor is discovered. If a number survives every check against possible factors, it stays `true` and gets logged to the console.

This method is rigourous but slow, so I had a go at making an alternative prime generator based on the "sieve of Eratosthenes" algorithm, which takes a more efficient approach.

    function sievePrimes(n){

    let startArray = [];
    let limit = Math.sqrt(n)
    let primes = [];

    for (let i = 0; i < n; i++) {
        array.push(true);
      }
      for (let i = 2; i <= limit; i++) {
            if (array[i]) {
                for (let j = i * i; j < n; j += i) {
                    array[j] = false;
                }
            }
        }
     for (let i = 2; i < n; i++) {
           if(array[i]) {
               primes.push(i);
            }
        }
        return primes;


    }

    console.log(sievePrimes(100));

Like before, `sievePrimes()` initially treats all numbers as potential primes: we start off with an empty array and generate a `true` value for every number in our list [2,3,4,...n]. Starting with our lowest value (2), we generate every possible multiple of (4,6,8...) and mark it `false` since we know 2 is a factor. We do the same with each subsequent number all the way up to n, quickly whittling down the field of possible prime candidates. The wikipedia page on this alogorithm has a great animation to illustrate how this works.

As an additional timesaver, the inner loop of this function starts with the square of each value; since we're evaluating every possible multiple of each value, we know that by the time we get to 5 (for example), that 5+5=10 will already have been evaluated as 2+2+2+2+2 and 5+5+5=15 will have been evaluated as 3+3+3 and earmarked as non-prime at an earlier iteration of the function: there's no reason to start our checks before we get to 5*5=25.  

A similar logic allows us to use `limit = Math.sqrt(n)` to terminate the inner loop. Clearly `sqrt(n)*sqrt(n)` is the biggest possible pair of factors we will find for a number in our range, so there's no need to run checks using any value larger than this.

Working on these functions has highlighted a couple of things I've already discovered while learning coding. Most problems have multiple solutions, and figuring out how to slice the cake in many ways can be really useful for learning and development. However, the simple solution can sometimes be just as valuable as the optimised solution in terms of effort versus results and time saved.
