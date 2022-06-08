---
layout: post
title: A semi-random pattern generator
date: 1990-05-09
category: blog
---

There are lots of pattern generators online; [here's an example](https://doodad.dev/pattern-generator/) of a really nice one, which lets you export your artwork as svg graphics for use in your design work. [Here's something similar](https://haikei.app); this tool generates simple graphic elements.

I've always wanted to have a go at building one of these, but for a long time I wasn't sure how to make a start. Recently, I used [variable fonts](https://web.dev/variable-fonts/) in a project, and this gave me an idea: these variable fonts are designed to offer multiple font styles in a single font file; starting with a base font, characteristics like weight, width and slant can be continuously adjusted using CSS, giving you access to thousands of different typefaces without the need to download a whole bunch of files. Here's an example:
<html>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap');

    #container {
      font-family: 'Raleway';
      outline: 1px solid black;
    }

    #text1 {
      text-align: center;
      font-size: 50px;
      font-weight: 500;
      padding: 20px 0 0 0;
    }

    #weight1 {
      display: block;
      margin: auto;
      width: 50%;
    }

    #amount {
      display: block;
      margin: auto;
      width: 100px;
      padding: 0 0 20px 0;
    }
  </style>
<body>

  <div id="container">
    <p id="text1">Platypus</p>
    <input id="weight1" type="range" min="100" max="900" value="500" class="slider"  oninput="changeWeight1()">
    <p id="amount">Value: <span id="weightValue1">50</span></p>
  </div>

 </body>

 <script type="text/javascript">

   function changeWeight1 () {
     weightValue1.innerHTML = weight1.value;
     text1.style.fontWeight = weight1.value;
   };
 </script>
</html>

 Why not use characters from one of these variable fonts as elements in a pattern, and make these adjustable characteristics into parameters to help create different pattern designs?



How could this work? Well. let's start with a simple character like "—", the classic em dash. In the image below, I've started with a plain grid of em dashes, and created three new patterns just by applying some form of rotation to them. Initially, we've rotated all the characters by the same value so they lie on a diagonal; then, we've randomly rotated each character by either 0 or 90 degrees, to create an interesting maze-like figure; finally, we've gone full random, rotating each character by its own arbitrary amount for an effect which looks a bit like ice cream sprinkles.

<img class="blog-img" src="/blog/assets/dashpatterns.png">

This is already starting to look quite cool. I really like the simplicity of using typographic characters as graphic elements, particularly simple symbols like +, -, O, and ~ . Even simple manipulations can create striking patterns, and we quickly forget we're looking at type. Wouldn't it be nice to have a character input which allows you to apply these sorts of transformations on any character? What would it look like if we used symbols like A, & or $ in these designs? What other parameters can we build into our pattern generator to give us even more flexibility?

Let's start planning out the objectives for this project:

1. We need some method of generating patterns using typographic characters - this will require some kind of character input and some way to adjust parameters on these characters.

2. Some of the following variables as parameters for the pattern generator:

Character spacing
Character orientation
Character weight (i.e. thickness)
Character colour
Character size
Background colour

3. Some method of creating a repeating pattern from these designs

4. Some method of downloading the designs in a useful graphics format, preferably svg, although png would also be useful

For now, I'm looking at the first two objectives. I think it's worth hacking together a working program as a proof of concept just to see whether this approach can work. After this, I'll tackle point 3 and 4, which are concerned with creating a genuinely useful output from the program.

*Building the grid*

So how are we going to start this? First of all, I'm going to define a space for my pattern swatch. I'll create the `gridContainer` div element and set its height and width to `600px`. I'll style it with the following CSS:

    #gridContainer {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template: repeat(20, 50px) / repeat(20, 50px);
      position: relative;
      overflow: hidden;
    }

This creates a 20x20 grid, which I can populate with characters to form my basic pattern element. I've chosen a large grid because I want to allow for patterns with a lot of elements in them. I'm also going to build in functionality which allows the characters to be scaled, so I want to ensure that the grid is always big enough to fill the whole container even if the elements are close together. By setting  `overflow-hiddden` I'm ensuring that any elements that don't fit into the container are kept out of sight.

My full grid is going to contain 400 cells (20x20), and I'll need to add an element to each of these. I don't want to write that all out in html, so I'll use this script to help me:

    for (let i=0; i<400; i++){
      const para = document.createElement("div");
      para.className = "gridItem";
      para.setAttribute("id", "cell"+i);

      const node = document.createTextNode("—");
      para.appendChild(node);

      const container = document.getElementById("gridContainer");
      container.appendChild(para);   
    }

This loop will build each element, using `setAttribute()` to add the classname `gridItem` and the id `cell[i]` every time one of these elements is created.We can use `appendChild()` to add text to each of these elements, and again to add each element to the `gridContainer` .

*Adjusting the elements*



<html>

  <style>

    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100..900&display=swap');

    .slideContainer {
      width: 300px;  
      font-family: 'Raleway';
      outline: 1px solid black;
      padding: 20px 0 0 0;
      margin: 10px 0 0 0;
    }

    .slider {
      display: block;
      margin: auto;
      width: 50%;
    }

    .value {
      display: block;
      margin: auto;
      width: 100px;
      padding: 0 0 20px 0;
    }

    #gridContainer {
  display: grid;
  width: 300px;
  height: 300px;
  padding: 20px;
  justify-content: center;
  grid-template: repeat(3, 100px) / repeat(3, 100px);
  overflow: hidden;
  border: 1px solid black;
    }

    .gridItem {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Raleway';
      font-size: 50pt;
      font-weight: 500;
      transform: rotate(0deg);

    }


  </style>

<body>

  <div id="gridContainer">    
  </div>

  <div class="slideContainer">
    <input type="range" min="100" max="900" value="500" class="slider" id="weight" oninput="changeText()">
    <p class="value">Value: <span id="weightValue">500</span></p>
  </div>

  <div class="slideContainer">
    <input type="range" min="10" max="100" value="50" class="slider" id="size" oninput="changeText()">
    <p class="value">Value: <span id="sizeValue">50</span></p>
  </div>

   <div class="slideContainer">
    <input type="range" min="0" max="359" value="0" class="slider" id="angle" oninput="changeText()">
    <p class="value">Value: <span id="angleValue">0</span></p>
  </div>

 </body>

 <script type="text/javascript">
   window.onload = function () {
    for (let i=0; i<9; i++){
    const para = document.createElement("div");
    para.className = "gridItem";
    para.setAttribute("id", "cell"+i);

    const node = document.createTextNode("—");
    para.appendChild(node);

    const container = document.getElementById("gridContainer");
    container.appendChild(para);  
    }
   }

   const gridItems = document.getElementsByClassName("gridItem");

   function changeText () {

           for (const item of gridItems){
    item.style.fontWeight = weight.value;
    item.style.fontSize = size.value +"pt";
    item.style.transform = "rotate(" + angle.value + "deg)";

    }   

    weightValue.innerHTML = weight.value;
    sizeValue.innerHTML = size.value;
    angleValue.innerHTML = angle.value;


   };
 </script>

</html>
  <style>
  html {
    font-family: "arial", sans-serif;

  }
  #patternSwatch {
    background: #9fc9aa;
  }
  #patternContainer {
    height: 200px;
    width: 200px;
    font-size: 50px;
    display: inline-block;
    border: 5px solid blue;
  }

  #outputContainer {
    height: 100px;
    width: 100px;
    border: 5px solid red;
  }

  #tiling {
    height: 400px;
    width: 600px;
    border: 5px solid yellow;

  }

  #controls {
    display: flex;
    flex;
    margin: 0 0 30px 0;
  }

    #wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 15px;
    }
  }
  </style>


  <div id="wrapper">

  <div>


    <div id="patternContainer">
      <svg id="patternSwatch" viewbox="-300 -300 600 600" xmlns="http://www.w3.org/2000/svg">
      </svg>
    </div>

    <div id="controls">
      <div>
        <p id="sizeValue">Font size: 50</p>
        <input type="range" id="sizeSlider" min="50" max="700" value="50" >
      </div>
      <div>
        <p id="shadowValue">Shadow: 0</p>
        <input type="range" id="shadowSlider" min="0" max="100" value="0" >
      </div>
    </div>

  </div>

  <div>
  <div id="outputContainer">
    <svg id="outputSwatch" viewbox="-150 -150 300 300" xmlns="http://www.w3.org/2000/svg" style="background: #9fc9aa">
    </svg>
  </div>
  </div>

  </div>

  <div id="tiling">
  </div>


  <script>
  const coordinates = [[-150,-135],[0,-135],[150,-135],[-150,15],[0,15],[150,15],[-150,165],[0,165],[150,165]];
  const gridItems = document.getElementsByClassName("item");
  const spacing = 150;

  window.onload = function () {
  for (let i = 0; i < 9; i++) {
    const shape = document.createElementNS('http://www.w3.org/2000/svg', "text");
    shape.setAttributeNS(null, "id", "item" + i);
    shape.setAttributeNS(null, "x", coordinates[i][0]);
    shape.setAttributeNS(null, "y", coordinates[i][1]+23);
    shape.setAttributeNS(null, "class", "item");
    const text = document.createTextNode("O");
    shape.appendChild(text);
    patternSwatch.appendChild(shape);
  }
  for (const item of gridItems){
    item.style.transformOrigin = "center";
    item.style.textAnchor = "middle";
    item.style.dominantBaseline = "middle";
    item.style.fontFamily = "Raleway";
    render();
  }


  }



  sizeSlider.addEventListener("input", changeText);
  shadowSlider.addEventListener("input", changeShadow);



  function changeText () {
  sizeValue.innerText = "Font size: " + this.value;
  render();
  }

  function changeShadow () {
  shadowValue.innerText = "Shadow: " + this.value;
  render();
  }

  function render() {
  for (const item of gridItems) {
    item.style.fontSize = sizeSlider.value + "px";
    if (shadowSlider.value <= 0){
      item.style.filter = null;
    }
    else {
      item.style.filter = "drop-shadow(" + shadowSlider.value + "px 0 white)";
    }

  }
  outputSwatch.innerHTML = patternSwatch.innerHTML;
  tiling.style.background = "url(\'data:image/svg+xml;base64," + btoa(outputSwatch.outerHTML) + "\')";
  tiling.style.backgroundSize = "100px";
  }

  </script>
</html>
