const smallContainer = document.getElementById("smallContainer");
const bigContainer = document.getElementById("bigContainer");
const gridItems = document.getElementsByClassName("item");
const box = document.getElementById("box");

let coordinates = [];

let state = {
  character:null,
  fontWeight: null,
  fontSize: null,
  dropShadow: null,
  spacing: null,
  angle: null,
  colour0: null,
  colour1: null,
  colour2: null,
}

function generateCoordinates(space) {
  let min = -4*space+300
  for (let y=0; y<9; y++){
    for (let x=0; x<9; x++){
      let item = [];
      item.push(min+space*x);
      item.push(min+space*y);
      coordinates.push(item);
    }
  }
}

function render() {

  while (smallContainer.hasChildNodes()) {
    smallContainer.removeChild(smallContainer.firstChild);
  }

  coordinates = [];
  generateCoordinates(spacing.value);


  for (let i=0; i<81; i++){
    const shape = document.createElementNS('http://www.w3.org/2000/svg',"text");
    shape.setAttributeNS(null, "id", "item"+i);
    shape.setAttributeNS(null, "x", coordinates[i][0]);
    shape.setAttributeNS(null, "y", coordinates[i][1]);
    shape.setAttributeNS(null, "class", "item");
    const text  = document.createTextNode(characterInput.value);
    shape.appendChild(text);
    smallContainer.appendChild(shape);
  }
  for (const item of gridItems){
    dropShadow.value <= 0 ? item.style.filter = null : item.style.filter = "drop-shadow("+dropShadow.value+"px 0 " +picker2.color.rgbaString+")";
    item.style.fontFamily = "\"Raleway\", sans-serif";
    item.style.transform = "rotate("+angle.value+"deg)";
    item.style.fontSize = fontSize.value + "px";
    item.style.fontWeight = fontWeight.value;
    item.style.fill = picker1.color.rgbaString;
    item.style.transformBox = "fill-box";
    item.style.transformOrigin = "center";
    item.style.textAnchor = "middle";
    item.style.dominantBaseline = "middle";
  }
}

const angle = document.getElementById("angle");
const angleValue = document.getElementById("angleValue");
angle.addEventListener("input", render);

angle.oninput = function adjustAngle() {
  angleValue.innerHTML = this.value;
}

const dropShadow = document.getElementById("dropShadow");
const dropShadowValue = document.getElementById("dropShadowValue");
dropShadow.addEventListener("input", render);

dropShadow.oninput = function adjustDropShadow() {
  dropShadowValue.innerHTML = this.value;
}


const fontSize = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
fontSize.addEventListener("input", render);

fontSize.oninput = function adjustFontSize() {
  fontSizeValue.innerHTML = this.value;
}

const fontWeight = document.getElementById("fontWeight");
const fontWeightValue = document.getElementById("fontWeightValue");
fontWeight.addEventListener("input", render);

fontWeight.oninput = function adjustFontWeight() {
  fontWeightValue.innerHTML = this.value;
}

const spacing = document.getElementById("spacing");
const spacingValue = document.getElementById("spacingValue");
spacing.addEventListener("input", render);

spacing.oninput = function adjustSpacing() {
  spacingValue.innerHTML = this.value;
}

const characterInput = document.getElementById("characterInput");
characterInput.addEventListener("input", render);

characterInput.oninput = function adjustCharacter() {
}

const parent0 = document.getElementById('parent0');
const background = document.getElementById('wrapper');

const picker0 = new Picker({
  parent: parent0,
  color: "#2197ac",
  popup: "top",
  alpha: false,
  onChange: function (color) {
    smallContainer.style.backgroundColor = color.rgbaString;
    parent0.style.backgroundColor = color.rgbaString;
    }
  });

const parent1 = document.getElementById("parent1");
const picker1 = new Picker({
  parent: parent1,
  color: "#f45555ff",
  popup: "top",
  onChange: function (color) {
    for (const item of gridItems){
      item.style.fill = color.rgbaString;
    }
    parent1.style.backgroundColor = color.rgbaString;
    }
  });

  const parent2 = document.getElementById("parent2");
  const picker2 = new Picker({
    parent: parent2,
    color: "#356969ff",
    popup: "top",
    onChange: function (color) {
      for (const item of gridItems){
          dropShadow.value <= 0 ? item.style.filter = null : item.style.filter = "drop-shadow("+dropShadow.value+"px 0" + color.hex +")";
      };
      parent2.style.backgroundColor = color.rgbaString;
      }
    });

const randomiseParameters = document.getElementById("randomiseParameters");

randomiseParameters.onclick = function() {
  dropShadow.value = Math.random()*100;
  dropShadow.dispatchEvent(new Event('input'));
  angle.value = Math.random()*360;
  angle.dispatchEvent(new Event('input'));
  fontSize.value = Math.random()*300 + 50;
  fontSize.dispatchEvent(new Event('input'));
  fontWeight.value = Math.random()*800 + 100;
  fontWeight.dispatchEvent(new Event('input'));
  spacing.value = Math.random()*225 + 75;
  spacing.dispatchEvent(new Event('input'));
  characterInput.value = String.fromCharCode(Math.round(Math.random()*93)+33);
  characterInput.dispatchEvent(new Event('input'));

  render();
}

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

const shareButton = document.getElementById("shareButton");
shareButton.onclick = function setState() {
  state.character = characterInput.value;
  state.angle = angle.value;
  state.dropShadow = dropShadow.value;
  state.fontSize = fontSize.value;
  state.fontWeight = fontWeight.value;
  state.spacing = spacing.value;
  state.colour0 = picker0.color.rgbaString;
  state.colour1 = picker1.color.rgbaString;
  state.colour2 = picker2.color.rgbaString;

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

function loadState() {
  let string = window.location.hash.slice(1);
  if (string.length <= 0){
    return;
  }
  else {
    state = JSON.parse(decodeURIComponent(string));
    characterInput.value = state.character;
    characterInput.dispatchEvent(new Event('input'));
    angle.value = state.angle;
    angle.dispatchEvent(new Event('input'));
    dropShadow.value = state.dropShadow;
    dropShadow.dispatchEvent(new Event('input'));
    fontSize.value = state.fontSize;
    fontSize.dispatchEvent(new Event('input'));
    fontWeight.value = state.fontWeight;
    fontWeight.dispatchEvent(new Event('input'));
    spacing.value = state.spacing;
    spacing.dispatchEvent(new Event('input'));

    picker0.setColour(state.colour0);
    picker1.setColour(state.colour1);
    picker2.setColour(state.colour2);
  }
}

const downloadSVGButton = document.getElementById("downloadSVG");


function downloadSVG() {
  const blob = new Blob([bigContainer.innerHTML], { type: "image/svg+xml" });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = "mypattern";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}






window.addEventListener("load", render);
window.addEventListener("load", loadState);
downloadSVGButton.addEventListener("click", downloadSVG);
