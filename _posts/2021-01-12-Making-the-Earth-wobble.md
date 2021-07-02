---
layout: post
title: Making the Earth wobble
date: 2021-01-12
category: blog
---
CSS animation methods are quite basic, but they are really intuitive to use and can be combined to create really nice graphics. As a challenge I made an animation to show why day lengths change so much throughout the year when close the earth's poles.

[See the animation here](https://www.justinbailey.net/projects/earth-animation).

**Constructing it**

This graphic uses several nested `div` elements. The Earth and all its nested elements have their own container `div` which allows animations to be applied:

~~~~
  <div id ="earth-container">
	<div class="ball" id="earth">
          <div class="triangle" id="pointer"></div>
          <div class="small-line" id="small-line1"></div>
          <div class="small-line" id = "small-line2"></div>
        </div>
        <div id ="axis-line"></div>
  </div>
~~~~

The entire graphic including the animated Earth and the Sun is then nested inside another container so it can be moved as a block.

Using the standard trick of setting `border-radius` to 50% creates our circular `earth` element. Inside this are two `small-line` elements which are pushed to the edges of their container to represent the Earth's polar regions. Setting overflow on `earth` to `hidden` trims so they fit inside our container.

We can then add the `pointer` element will be used to indicate the rotation of the Earth. The triangle shape is created using another trick: creating a shape with no zero height and zero width, setting borders, and making all but one side transparent to leave a little wedge:

~~~~
.triangle{
  position: relative;
  width: 0;
  height: 0;
  border-top: 1em solid transparent;
  border-bottom: 1em solid transparent;
  border-left: 1em solid red;
  }
~~~~

Finally, the `axis-line` element is added outside the `earth` element because we don't want it to be trimmed like the `small-line` elements.

**Animation**

The animation `around` is applied just to the `pointer` element. It's actually a combination of several CSS property manipulations, including `opacity` `transform: scaleX()` and the `left` position attribute. The `transform` property is used to flip the direction of the pointer, and `opacity` helps to create the illusion that it's passing behind something. I was suprised how effectively this creates the illusion of 3D movement; the pointer really looks like it's whizzing round and round a globe! Although the animation itself is really simple these layered effects make it much subtler; CSS's default ease in/out animation style also helps to make this look good.

The `angle` animstion is applied to `earth` (and all its contents) and the `axis-line` element. To lock these together, both are placed inside an `earth-container` element, which takes the `angle` animation.

I'm pretty pleased with this; the performance of the animation is surprisingly good considering the use of nested animations. There was no need on this occasion to synchronise the two separate animations, but it would be fun to follow this up with a project which involves injecting some javascript to control sequencing and timing.
