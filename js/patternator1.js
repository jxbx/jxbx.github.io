const gridItems = document.getElementsByClassName("grid-item");

let itemAngles = [];
let itemStretches = [];

window.onload = function randomise(){
  for (let i=0; i<900; i++){
    itemAngles.push(0);
    itemStretches.push(20);
    const para = document.createElement("div");
    para.className = "grid-item";
    para.setAttribute("id", "cell"+i);

    const node = document.createTextNode(character.value);
    para.appendChild(node);

    const container = document.getElementById("gridContainer");
    container.appendChild(para);
    }
}

const sliderThickness = document.getElementById("thickness");
const outputThickness = document.getElementById("thicknessValue");
outputThickness.innerHTML = sliderThickness.value;

sliderThickness.oninput = function() {
  outputThickness.innerHTML = this.value;

  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.fontWeight = this.value;
  }
}

const sliderFontSize = document.getElementById("fontSize");
const outputFontSize = document.getElementById("fontSizeValue");
outputFontSize.innerHTML = sliderFontSize.value;
sliderFontSize.oninput = function () {
  outputFontSize.innerHTML = this.value;

  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.fontSize = this.value +"pt";
  }
}

const sliderJitter = document.getElementById("jitter");
const outputJitter = document.getElementById("jitterValue");
outputJitter.innerHTML = sliderJitter.value;

sliderJitter.oninput = function() {
  outputJitter.innerHTML = this.value;
  for (let i=0; i<gridItems.length; i++){

    const randomMultiplier = function() {
      let plusOrMinus = Math.random() > 0.5 ? 1 : -1;
      return 0.5 * Math.random() * plusOrMinus;
    }
    gridItems[i].style.margin = "0 0" + this.value*randomMultiplier() + "px " + this.value*randomMultiplier() + "px";
  }
}

const sliderDropShadow = document.getElementById("dropShadow");
const outputDropShadow = document.getElementById("dropShadowValue");
outputDropShadow.innerHTML = sliderDropShadow.value;

sliderDropShadow.oninput = function () {
  outputDropShadow.innerHTML = this.value;
  if (this.value <=0){
    for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.textShadow = "none";
    }
  }
  else {
    for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.textShadow = this.value + "px " + this.value + "px " + "0 " + "white";
    }
  }

}

const sliderSpacing = document.getElementById("spacing");
const outputSpacing = document.getElementById("spacingValue");
outputSpacing.innerHTML = sliderSpacing.value;

sliderSpacing.oninput = function () {
  outputSpacing.innerHTML = this.value;

    gridContainer.style.gridTemplate = "repeat(30, " +  this.value + "px) / repeat(30, " + this.value + "px)";

}

const sliderAngle = document.getElementById("angle");
const outputAngle = document.getElementById("angleValue");
outputAngle.innerHTML = sliderAngle.value;

sliderAngle.oninput = function () {
  outputAngle.innerHTML = this.value;
  for (let i=0; i<gridItems.length; i++){
    newAngle =  itemAngles[i]+this.value % 360;
    gridItems[i].style.transform = "rotate(" + newAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
   itemAngles[i] = newAngle;
  }
}

const sliderStretch = document.getElementById("stretch");
const outputStretch = document.getElementById("stretchValue");
outputStretch.innerHTML = sliderStretch.value;


sliderStretch.oninput = function () {
  outputStretch.innerHTML = this.value;
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(" + itemAngles[i] + "deg) scaleY(" + this.value/20 + ")";
    itemStretches[i] = this.value;
  }
}


const sliderRotation = document.getElementById("rotation");
const outputRotation = document.getElementById("rotationValue");
outputRotation.innerHTML = sliderRotation.value;

sliderRotation.oninput = function () {
  outputRotation.innerHTML = this.value;
  gridContainer.style.transform = "rotate(" + this.value + "deg)";
}



const randomiseButton = document.getElementById("randomiseButton");

randomiseButton.onclick = function () {
  itemAngles = [];
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.random()*360;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = randomAngle;
  }
}

const rightAnglesButton = document.getElementById("rightAnglesButton");

rightAnglesButton.onclick = function () {
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.round(Math.random()*4)*90;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = randomAngle;
  }
}

const alternateButton = document.getElementById("alternateButton");

alternateButton.onclick = function () {

  for (let i=0; i<gridItems.length; i++){
    if (i % 2 !==0){
      gridItems[i].style.transform = "rotate(90deg) scaleY(" + itemStretches[i]/20 + ")";
      itemAngles[i] = 90;
    }
    else {
      gridItems[i].style.transform = "rotate(270deg) scaleY(" + itemStretches[i]/20 + ")";
      itemAngles[i] = 270;
    }

  }
}

const regulariseButton = document.getElementById("regulariseButton");

regulariseButton.onclick = function () {

  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(0deg) scaleY(" + itemStretches[i]/20 + ")";
    itemAngles[i] = 0;
  }

}

const characterInput = document.getElementById("character");

characterInput.oninput = function () {
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].innerHTML = characterInput.value;
  }
}

function test () {
  console.log(itemAngles);
}
