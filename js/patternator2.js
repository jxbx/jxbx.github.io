//keeping track of state for css transform and textShadow properties

let itemAngles = [];
let itemStretches = [];
let itemDropShadows = "none";
let blends = ["normal", "multiply", "hard-light", "soft-light", "difference", "screen", "overlay", "color"];
const container = document.getElementById("gridContainer");

let state = {
  character:null,
  thickness: null,
  fontSize: null,
  jitter: null,
  dropShadow: null,
  spacing: null,
  angle: null,
  stretch: null,
  rotation: null,
  colour0: null,
  colour1: null,
  colour2: null,
  alignment: null,
  blend: null
}

//generating 20x20 character grid;"

function generateCharacters(){
  for (let i=0; i<400; i++){
    itemAngles.push(0);
    itemStretches.push(10);
    const para = document.createElement("div");
    para.className = "grid-item";
    para.setAttribute("id", "cell"+i);

    const node = document.createTextNode(character.value);
    para.appendChild(node);
    container.appendChild(para);
    }
}

const gridItems = document.getElementsByClassName("grid-item");

//SLIDERS

//thickness (weight) slider

const sliderThickness = document.getElementById("thickness");
const outputThickness = document.getElementById("thicknessValue");
outputThickness.innerHTML = sliderThickness.value;
state.thickness = sliderThickness.value;

sliderThickness.oninput = function () {
  outputThickness.innerHTML = this.value;
  state.thickness = this.value;

  for (const item of gridItems){
    item.style.fontWeight = this.value;
  }
}

//font size slider

const sliderFontSize = document.getElementById("fontSize");
const outputFontSize = document.getElementById("fontSizeValue");
outputFontSize.innerHTML = sliderFontSize.value;
state.fontSize = sliderFontSize.value;

sliderFontSize.oninput = function () {
  state.fontSize = this.value;
  outputFontSize.innerHTML = this.value;
  for (const item of gridItems){
    item.style.fontSize = this.value +"pt";
  }
}

//jitter slider

const sliderJitter = document.getElementById("jitter");
const outputJitter = document.getElementById("jitterValue");
outputJitter.innerHTML = sliderJitter.value;
state.jitter = sliderJitter.value;

sliderJitter.oninput = function() {
  outputJitter.innerHTML = this.value;
  state.jitter = this.value;

  for (const item of gridItems){
    const randomMultiplier = function() {
      let plusOrMinus = Math.random() > 0.5 ? 1 : -1;
      return 0.5 * Math.random() * plusOrMinus;
    }
    item.style.margin = "0 0" + this.value*randomMultiplier() + "px " + this.value*randomMultiplier() + "px";
  }
}

//drop shadow slider

const sliderDropShadow = document.getElementById("dropShadow");
const outputDropShadow = document.getElementById("dropShadowValue");
outputDropShadow.innerHTML = sliderDropShadow.value;
state.dropShadow = dropShadow.value;

sliderDropShadow.oninput = function () {
  outputDropShadow.innerHTML = this.value;
  state.dropShadow = this.value;
  if (this.value <=0){
    for (const item of gridItems){
      itemDropShadows = "none";
      item.style.textShadow = itemDropShadows;
    }
  }
  else {
    itemDropShadows = this.value + "px " + this.value + "px " + "0 ";
    for (const item of gridItems){
      item.style.textShadow = itemDropShadows + picker2.color.rgbaString;
    }
  }
}

//spacing slider (note: this adjusts the grid container rather than the grid elements)

const sliderSpacing = document.getElementById("spacing");
const outputSpacing = document.getElementById("spacingValue");
outputSpacing.innerHTML = sliderSpacing.value;
state.spacing = sliderSpacing.value;

sliderSpacing.oninput = function () {
  state.spacing = this.value;
  outputSpacing.innerHTML = this.value;
  gridContainer.style.gridTemplate = "repeat(20, " +  this.value + "px) / repeat(20, " + this.value + "px)";
}

//angle slider (adjusts angles of individual characters)

const sliderAngle = document.getElementById("angle");
const outputAngle = document.getElementById("angleValue");
outputAngle.innerHTML = sliderAngle.value;
state.angle = sliderAngle.value;
let prevAngle = 0;


sliderAngle.oninput = function () {
  outputAngle.innerHTML = this.value;
  state.angle = this.value;
  for (let i=0; i<gridItems.length; i++){

    let newAngle = (this.value-prevAngle+itemAngles[i]) % 360;

    gridItems[i].style.transform = "rotate(" + newAngle + "deg) scaleY(" + itemStretches[i]/10 + ")";
    itemAngles[i] = newAngle;

  }
  prevAngle = this.value;
}

//stretch slider

const sliderStretch = document.getElementById("stretch");
const outputStretch = document.getElementById("stretchValue");
outputStretch.innerHTML = sliderStretch.value;
state.stretch = sliderStretch.value;

sliderStretch.oninput = function () {
  outputStretch.innerHTML = this.value;
  state.stretch = this.value;
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(" + itemAngles[i] + "deg) scaleY(" + this.value/10 + ")";
    itemStretches[i] = this.value;
  }
}

//rotation slider (adjusts angle of overall layout)

const sliderRotation = document.getElementById("rotation");
const outputRotation = document.getElementById("rotationValue");
outputRotation.innerHTML = sliderRotation.value;
state.rotation = sliderRotation.value;

sliderRotation.oninput = function () {
  state.rotation = this.value;
  outputRotation.innerHTML = this.value;
  gridContainer.style.transform = "rotate(" + this.value + "deg)";
}

//BUTTONS

const alignment = document.getElementById("alignment");

alignment.oninput = function () {
  switch(alignment.value) {
    case "regular":
      regularAlignment();
      break;
    case "random":
      randomAlignment();
      break;
    case "right angles":
      rightanglesAlignment();
      break;
    case "alternating":
      alternatingAlignment();
      break;
  }
}

  //random alignment (randomly adjusts the angle of each character)

function randomAlignment() {
  itemAngles = [];
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.random()*360;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/10 + ")";
    itemAngles[i] = randomAngle;
    sliderAngle.value = state.angle;
    prevAngle = 0;
  }
  state.alignment = alignment.value;
  sliderAngle.dispatchEvent(new Event('input'));
}

//right angles button (randomly adjusts each character to 0 or 90 degrees)

function rightanglesAlignment() {
  for (let i=0; i<gridItems.length; i++){
    let randomAngle = Math.round(Math.random()*4)*90;
    gridItems[i].style.transform = "rotate(" + randomAngle + "deg) scaleY(" + itemStretches[i]/10 + ")";
    itemAngles[i] = randomAngle;
    sliderAngle.value = state.angle;
    prevAngle = 0;
  }
  state.alignment = alignment.value;
  sliderAngle.dispatchEvent(new Event('input'));
}

//alternate button (adjusts character angles so they alternate between 90 and 270 degrees)

function alternatingAlignment() {
  for (let i=0; i<gridItems.length; i++){
    if (i % 2 !==0){
      itemAngles[i] = 90;
      gridItems[i].style.transform = "rotate(90) scaleY(" + itemStretches[i]/10 + ")";
    }
    else {
      itemAngles[i] = 270;
      gridItems[i].style.transform = "rotate(270) scaleY(" + itemStretches[i]/10 + ")";
    }
  }
  sliderAngle.value = state.angle;
  prevAngle = 0;
  state.alignment = alignment.value;
  sliderAngle.dispatchEvent(new Event('input'));
}

//regularise button (adjusts all character angles to 0 degrees)

function regularAlignment() {
  for (let i=0; i<gridItems.length; i++){
    gridItems[i].style.transform = "rotate(0) scaleY(" + itemStretches[i]/10 + ")";
    itemAngles[i] = 0;
  }
  sliderAngle.value = state.angle;
  prevAngle = 0;
  state.alignment = alignment.value;
  sliderAngle.dispatchEvent(new Event('input'));
}

//CHARACTER INPUT

//input form which allows alternate characters to be inserted into the pattern

const characterInput = document.getElementById("character");
state.character = characterInput.value;

characterInput.oninput = function () {
  for (const item of gridItems){
    item.innerHTML = characterInput.value;
  }
  state.character = characterInput.value;
}

//BLEND MODE SELECTOR

const blendOptions = document.getElementById("blendOptions");

blendOptions.oninput = function () {
  for (const item of gridItems){
    item.style.mixBlendMode = blendOptions.value;
  }
  state.blend = blendOptions.value;
}

const parent0 = document.getElementById('parent0');
const background = document.getElementById('wrapper');

const picker0 = new Picker({
  parent: parent0,
  colour: "#2197ac",
  popup: "top",
  alpha: false,
  onChange: function (color) {
    background.style.backgroundColor = color.rgbaString;
    parent0.style.backgroundColor = color.rgbaString;
    state.colour0 = color.rgbaString;
    }
  });

const parent1 = document.getElementById("parent1");
const picker1 = new Picker({
  parent: parent1,
  colour: "#f45555ff",
  popup: "top",
  onChange: function (color) {
    background.style.color = color.rgbaString;
    parent1.style.backgroundColor = color.rgbaString;
    state.colour1 = color.rgbaString;
    }
  });

  const parent2 = document.getElementById("parent2");
  const picker2 = new Picker({
    parent: parent2,
    colour: "#356969ff",
    popup: "top",
    onChange: function (color) {
      for (const item of gridItems){
          item.style.textShadow = itemDropShadows + color.rgbaString;
      };
      parent2.style.backgroundColor = color.rgbaString;
      state.colour2 = color.rgbaString;
      }
    });

//RANDOMISERS

//randomly adjusts all eight sliders, selects random character input, selects random alignment;


//randomise sliders

const randomiseParameters = document.getElementById("randomiseParameters");

randomiseParameters.onclick = function() {

  let randomButton = Math.round(Math.random()*4);

  switch(randomButton) {
    case 0:
      alignment.value = "regular";
      alignment.dispatchEvent(new Event('input'));
      break;
    case 1:
    alignment.value = "random";
    alignment.dispatchEvent(new Event('input'));
    break;
    case 2:
      alignment.value = "right angles";
      alignment.dispatchEvent(new Event('input'));
      break;
    case 3:
      alignment.value = "alternating";
      alignment.dispatchEvent(new Event('input'));
      break;
    }


      sliderThickness.value = Math.random()*800 + 100;
      sliderThickness.dispatchEvent(new Event('input'));

      sliderFontSize.value = Math.random()*295 + 5;
      sliderFontSize.dispatchEvent(new Event('input'));

      sliderJitter.value = Math.random()*100;
      sliderJitter.dispatchEvent(new Event('input'));

      sliderStretch.value = Math.random()*10 + 1;
      sliderStretch.dispatchEvent(new Event('input'));

      sliderDropShadow.value = Math.random()*100;
      sliderDropShadow.dispatchEvent(new Event('input'));

      sliderSpacing.value = Math.random()*200 + 50;
      sliderSpacing.dispatchEvent(new Event('input'));

      sliderAngle.value = Math.random()*359;
      sliderAngle.dispatchEvent(new Event('input'));

      sliderRotation.value = Math.random()*359;
      sliderRotation.dispatchEvent(new Event('input'));

  characterInput.value = String.fromCharCode(Math.round(Math.random()*93)+33);
  characterInput.dispatchEvent(new Event('input'));

  let randomBlend = Math.round(Math.random()*7);
  blendOptions.value = blends[randomBlend];
  blendOptions.dispatchEvent(new Event('input'));
}

//randomly selects colours;

const randomiseColours = document.getElementById("randomiseColours");

randomiseColours.onclick = function() {
  function newColour () {
    let letters = '0123456789ABCDEF'.split('');
    let colour = '#';
    for (let i = 0; i < 6; i++ ) {
      colour += letters[Math.round(Math.random() * 15)];
    }
    return colour;
  }

  //setColour() is from the vanillapicker module;

  picker0.setColour(newColour());
  picker1.setColour(newColour());
  picker2.setColour(newColour());
}

const randomiseEverything = document.getElementById("randomiseEverything");

randomiseEverything.onclick = function() {
  randomiseColours.click();
  randomiseParameters.click();
}

//download pattern as png;

function downloadimage() {

html2canvas(background).then(function (canvas) {

  var link = document.createElement("a");
  document.body.appendChild(link);
  link.download = "html_image.png";
  link.href = canvas.toDataURL();
  link.target = '_blank';
  link.click();
    });
  }

let dlButton = document.getElementById("dlButton");
dlButton.onclick = function() {downloadimage()};

//save program state to URL fragment and copy to clipboard

const shareButton = document.getElementById("shareButton");
shareButton.onclick = function saveState() {
let newState =  JSON.stringify(state);
window.location.hash = newState;
navigator.clipboard.writeText(window.location.href)
  .then(()=>{
    alert("URL copied to clipboard");
  })
  .catch(()=>{
    alert("error");
  })
}

//load state from URL fragment

function loadState() {
  state = JSON.parse(decodeURIComponent(window.location.hash.slice(1)));
  characterInput.value = state.character;
  alignment.value = state.alignment;
  blendOptions.value = state.blend;
  sliderThickness.value = state.thickness;
  sliderFontSize.value = state.fontSize;
  sliderJitter.value = state.jitter;
  sliderDropShadow.value = state.dropShadow;
  sliderSpacing.value = state.spacing;
  sliderAngle.value = state.angle;
  sliderStretch.value = state.stretch;
  sliderRotation.value = state.rotation;

  characterInput.dispatchEvent(new Event('input'));
  alignment.dispatchEvent(new Event('input'));
  blendOptions.dispatchEvent(new Event('input'));
  sliderThickness.dispatchEvent(new Event('input'));
  sliderFontSize.dispatchEvent(new Event('input'));
  sliderJitter.dispatchEvent(new Event('input'));
  sliderDropShadow.dispatchEvent(new Event('input'));
  sliderSpacing.dispatchEvent(new Event('input'));
  sliderAngle.dispatchEvent(new Event('input'));
  sliderStretch.dispatchEvent(new Event('input'));
  sliderRotation.dispatchEvent(new Event('input'));

  picker0.setColour(state.colour0);
  picker1.setColour(state.colour1);
  picker2.setColour(state.colour2);

}

//initialisation

window.addEventListener("load", generateCharacters());
window.addEventListener("load", loadState());
