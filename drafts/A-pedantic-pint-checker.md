Pint Pedant is a web app that calculates how much froth is in your beer by modelling your beer glass as a truncated cone. Here's some background on the project, followed by a more detailed development walkthrough with coding examples.

Why are pint glasses usually wider at the top? It could just be to make them easier to grip, but that's a bit boring, so here's another theory: what if wide brims are actually a devious ploy by beer companies to con you out of beer?

Human beings are quite bad at judging volume. If you don't believe me, have a look at the two objects below: the one on the left is a rough representation of a "yard" glass, a traditional British ale glass used for drinking games. It's about a yard tall, hence the name, with a flared rim and a bulb at the bottom, which means you'll probably get splashed with beer if you try to drink from one (all part of the fun).

One the right you'll see a shallow dish-like object. This model is based on the measurements for the official 175g DisCraft ultimate frisbee disc, used in the popular college sport of ultimate frisbee (and it's many associated drinking games). So which vessel should you pick for a truly impressive feat of drinking?

You may have guessed the point I'm about to make, but weirdly enough, the frisbee is the winner here. I checked this by modelling both objects and using some formulae (volume of a sphere, volume of a truncated cone) to calculate the results.

    function sphereVol (radius) {
      return 4/3*Math.PI *
        Math.pow(radius, 3);
    }

    function truncatedConeVol(height, rad1, rad2) {
      return (
        (1 / 3) *
        Math.PI *
        height *
        (Math.pow(rad1, 2) + Math.pow(rad2, 2) + rad1 * rad2)
      );
    }

    const frisbeeVol = Math.round(truncatedConeVol(2.6,14.4,14.1));

    const yardVol = Math.round(truncatedConeVol(83.4,3,1)+sphereVol(4));


    console.log(frisbeeVol)
    console.log(yardVol)

    //expected result: 1659
    //expected result: 1403

We can treat the frisbee as a very shallow truncated cone. Using the measurements from the diagram, its volume comes out as 1659ml.

We can treat the yard glass as a very elongated truncated cone with a sphere stuck to the bottom of it (for simplicity's sake I've ignored the small overlap between the cone and the sphere which would exist in a real glass). Crunch the numbers from the diagram and we get a volume of 1403ml; that's a difference of more than half a pint!

If you're puzzled by this, don't worry, it's normal. Challenges involving judging volumes were first used in the early 20th Century by psychologist Jean Piaget as part of a test to measure mental development in children (I can actually remember doing one of these questions as part of my SAT exams in primary school). Piaget's tests work on the basis that "conservation", the ability to determine that a quantity will stay the same even if the size or shape of the container is changed, is not instinctive, but a acquired ability which requires well-developed critical thinking skills. In other words, you have to learn how to do it...and drinking beer probably makes you worse at it.

We've seen that it's very easy to be tricked when comparing the volume of a wide but shallow object against a tall but narrow one. In a typical pint glass the wide part is at the top, which is where the frothy head on top of your beer goes, so what if beer companies are making their brims wider on purpose, knowing you'll probably underestimate how much froth they're giving you?

I can't prove that, but I do know that the British Beer and Pub Association (the leading industry organisation for British pubs and bars) recommends that "a measure of beer served with a head must include a minimum of 95% liquid" with the remaining 5% as froth. Reckon you can guess what 5% looks like at the top of a pint glass? Nor do I, which is why I've built this tool to let you estimate how much beer is in your glass without relying purely on intuition!


_The problem_

Make a web app which gives visual output and statistical information about your pint of beer based on information about the cost, the type of glass, and the amount of head.


Inputs:

- Cost  
- Head   
- Depth  
- Glass type (e.g. standard pint glass, pilsner glass, stubby pint glass...)

Outputs:

- Froth volume  
- Beer volume  
- Percentage froth  
- Froth cost

The user inputs the head depth they have observed on their beer, selects a glass type from a predetermined list, and inputs the price.

The program calculates the froth volume based on the head depth and the specific glass type and returns this along with a selection of statistics derived from the initial froth volume calculation.

_Assumptions/limitations:_

To find the volumes of the yard glass and the ultimate frisbee I modelled them using regular 3D shapes whose properties are well understood. In real life, beer glasses come in many shapes and sizes; and there's no simple way to model them all. However, many of them are essentially "conical" in style, resembling a tapered cylinder, and its these glasses I'm focusing on. They can be defined mathematically using a few key measurements (height, top radius, bottom radius), and I already have a way of calculating volume using the `truncatedConeVol` function. Using this system, a "pilsner" style glass is a long, thin truncated cone, while a "stubby" pint glass is short, with a wide top radius. We can even use this approach to model half pint glasses as long as we keep a record of volume as well.

In real life many beer glasses are curved, and although there are well-understood ways to describe curved objects and calculate their volume (e.g. by modelling them as solids of revolution and using calculus) I decided not to step into this, in order keep this as a coding and web development challenge rather than a maths challenge!

Another problem with real life pint glasses is that they rarely ever have a volume of exactly one pint (568ml). A quick search online shows that many are sold as having a volume of 560 or 570ml, and I'm sure real world testing would reveal a whole range of other values besides these. This is a complete mess, so to keep things simple I'm just going to assume that a pint is a pint and model all my glasses as having a volume of exactly 568ml, or 284ml for a half-pint.


_Modelling the glasses_

Now that I've decided what my glasses will be like, I should be able to create a set of glasses as Javascript objects with keys for height, volume and radius, and then create a function which calculates froth volume for any glass type by accessing the object keys.

What should the object look like?

I measured a pint glass I have at home and determined its height, top radius, and base radius as 14cm, 4cm and 3.2cm respectively.

~~~~~~~~~~~~~~~~
 __rad1___
|         |
___________ _
\         /  |      rad1 = 14
 \       /   |h     rad2 = 3.2
  \     /    |      h = 14
   \___/    _|           

   |___|
   rad2
~~~~~~~~~~~~~~~~~

In theory, its volume should be 568ml, but as I've said before, this is rarely accurate. Crunching the numbers using the `truncatedConeVol` function from earlier confirms this:

    console.log(truncatedConeVol(14,4,3.2));

    //output: 572.35629...

I'm out by a few ml; either my pint glass has an inaccurate volume, or my measurements aren't completely right. In either case, it's messy. For simplicity and accuracy I really want to model my glass using a full set of nice round values, but this just isn't possible. At least one of my four values (`height`, `rad1`, `rad2`, `volume`) will have to be a fiddly decimal number in order for the other three to be neat integers. I've already decided using my "pint is a pint" rule that my glass needs to be exactly 568ml, so with this locked in I've decided to model the glass using nice round values for height and rad1, since these are the easiest to measure. That leaves `rad2` as the messy, derived value. I can now write my glass as a Javascript object as follows:

    const standardPintGlass = {
      height: 14,
      rad1: 4,
      volume: 568,
    };

I still need `rad2` for my calculations, so I now need a function to find rad2. This is a bit messy because it involves rearranging the formula for a truncated cone and using the quadratic formula to find a solution. The functions I've written below will do the job; they are not very succinct, but I wanted to write a separate function for the classic quadratic formula just to make it a bit clearer what process we are using to derive `rad2`.

    function quadFormula(a, b, c) {
      return 0.5 * (-b + Math.sqrt(b * b - 4 * a * c));
    }

    function findRad2(glass){

      let newVar = Math.pow(glass.rad1, 2) - glass.volume / ((Math.PI*glass.height) / 3);

      return quadFormula(1, glass.rad1, newVar);
    }

    console.log(findRad2(standardPintGlass));

    // expected output: 3.17134....

I can see from this that my real life measurement of 3.2cm was actually pretty close!

Now that I have a system I like I can go ahead and create objects for a whole range of glass styles:

    const standardPintGlass = {
      height: 14,
      rad1: 4,
      volume: 568
    };

    const standardHalfPintGlass = {
      height: 11,
      rad1: 3.5,
      volume: 284
    };

    const stubbyPintGlass = {
      height: 10,
      rad1: 4.5,
      volume: 568
    };

    const pilsnerPintGlass = {
      height: 20,
      rad1: 3.5,
      volume: 568
    };


Calculating froth

Now that I've created my glasses, I need to think about calculating froth. Modelling my glass as a truncated cone makes this easy, because I can take my glass of beer and chop through it horizontally to segment it into two smaller cones, one for the froth and one for the beer. I can then crunch my numbers through `truncatedConeVol` to figure out my froth volume.


Here's an illustration:

~~~~~~~~~~~~~~~~~~~


     glass:           froth:                       beer:

     _rad1
    |     |                                        newRad
   _ ____________                                  |    |
  |  \          /     _rad1_                        __________ _
h |   \        /     |      |                       \        /  |
  |    \      /    =  ____________ _            +    \      /   |h - newHeight
  |_    \____/        \__________/ _| newHeight       \____/   _|

        |_|           |____|                          |_|
         rad2            newRad                        rad2


glass.volume = truncatedConeVol(h, rad1, rad2)
froth.volume = truncatedConeVol (newHeight, rad1, newRad)
beer.volume = glass.volume-froth.volume

~~~~~~~~~~~~~~~~~~~


This is neat, but in order to calculate the froth volume I need to find `newHeight` and `newRad`. `newHeight` is easy because it will be supplied by the user. `newRad` is trickier because it needs to be calculated. In order to find the bottom radius of the cone at any given height we can use the fact that the steepness of the cone is constant, meaning change in radius is directly proportional to change in height. In the illustration below it's clear that when we halve the height, the difference between the top and bottom radii is also halved.

~~~~~~~~~~~~~~~~~~~


  _rad1_
 |      |            

 difference =       
 (rad1-rad2)         newRad
   _|__              |    |
 _|____|________     (rad1-rad2)/2
|  \   |       /      _|
h   \  |      /      |__|______ _
|    \ |     /        \ |     /  h/2
|_    \|____/          \|____/  _|

      |_|              |_|
      rad2             rad2  


rad2 + difference = rad1
rad2 + difference/2 = newRad

~~~~~~~~~~~~~~~~~~~


If we slice the glass exactly half way up, we know that `newRad` will be exactly halfway between `rad2` and `rad1`. Likewise, if we slice the glas 28% of the way up `newRad` will be exactly 28% of the way between `rad2` and `rad1`. The same rule applies for any height.

We can express this as follows:

    let headRatio = newHeight / glass.height;
    let radNew = glass.rad1 - headRatio * (glass.rad1 - rad2);


Once we've calculated the froth volume and the glass volume we can derive the beer volume. A user supplied price input means we can now generate all the outputs we need:

- Froth volume = `truncatedConeVol(newHeight, newRad, rad2)`
- Beer volume  = `glass volume - froth volume`
- Froth percentage = `froth volume / glass volume * 100`
- Froth price = `froth volume / glass volume * price`

I can now write a function which takes glass type, head height and pint price as inputs, and gives me back all the outputs I need.

    function checkHead(glass, inputHeadHeight, inputPrice) {
      let result = [];

      let rad2 = quadFormula(
        1,
        glass.rad1,
        Math.pow(glass.rad1, 2) - glass.volume / ((Math.PI * glass.height) / 3)
      );

      let headRatio = inputHeadHeight / glass.height;
      let radNew = glass.rad1 - headRatio * (glass.rad1 - rad2);

      let headVol = findVol(inputHeadHeight, glass.rad1, radNew);
      let volProportion = headVol / glass.volume;
      let headPrice = volProportion * inputPrice;

      result.push(Math.round(headVol));
      result.push(Math.round(glass.volume - headVol));
      result.push(Math.round(volProportion * 100));
      result.push(headPrice.toFixed(2));

      return result;
    }

`checkHead` crunches all our numbers and conveniently returns our outputs as the array `result`.
