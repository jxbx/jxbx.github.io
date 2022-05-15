const svgContainer = document.getElementById("svgContainer");

const itemPositions = [];

window.onload = function generateCharacters() {

  let xValue = 0;
  let yValue = 0;

  for (let i=0; i<10; i++){
    for (let j=0; j<10; j++){
      itemPositions.push({x: j*150, y: i*150,angle: 0})
    }
  }

  for (let k=0; k<100; k++){

    const shape = document.createElementNS('http://www.w3.org/2000/svg',"text");
    shape.setAttributeNS(null, "id", "item"+k);
    //shape.setAttributeNS(null, "d", "M51.3,-18.7C57.5,2.3,47.2,26.6,27.5,41.8C7.8,57.1,-21.4,63.4,-43.4,49.8C-65.3,36.2,-80,2.7,-71.6,-21.4C-63.2,-45.6,-31.6,-60.4,-4.5,-58.9C22.6,-57.4,45.2,-39.7,51.3,-18.7Z");
    shape.setAttributeNS(null, "x", itemPositions[k].x);
    shape.setAttributeNS(null, "y", itemPositions[k].y);
    //shape.setAttributeNS(null, "transform-origin", itemPositions[k].x + ", " +itemPositions[k].y);
    shape.setAttributeNS(null, "class", "item");
    const text  = document.createTextNode(characterInput.value);
    shape.appendChild(text);
    svgContainer.appendChild(shape);
  }
}

const gridItems = document.getElementsByClassName("item");

const dropShadow = document.getElementById("dropShadow");
const dropShadowValue = document.getElementById("dropShadowValue");

dropShadow.oninput = function adjustDropShadow() {
  dropShadowValue.innerHTML = this.value;
  for (const item of gridItems){
    if (this.value <= 0){
      item.style.filter = null;
    }
    else {
      item.style.filter = "drop-shadow("+this.value+"px "+this.value+"px 0 #5079ad)";
    }
  }
}

const angle = document.getElementById("angle");
const angleValue = document.getElementById("angleValue");

angle.oninput = function adjustAngle() {
  angleValue.innerHTML = this.value;
  for (const item of gridItems){
    item.style.transform = "rotate("+this.value+"deg)";
  }
}

const fontSize = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");

fontSize.oninput = function adjustFontSize() {
  fontSizeValue.innerHTML = this.value;
  for (const item of gridItems){
    item.style.fontSize = this.value + "px";
  }
}

const fontWeight = document.getElementById("fontWeight");
const fontWeightValue = document.getElementById("fontWeightValue");

fontWeight.oninput = function adjustFontWeight() {
  fontWeightValue.innerHTML = this.value;
  for (const item of gridItems){
    item.style.fontWeight = this.value;
  }
}
/*
const spacing = document.getElementById("spacing");
const spacingValue = document.getElementById("spacingValue");

spacing.oninput = function adjustSpacing() {
  spacingValue.innerHTML = this.value;
  for (let i=1; i<100; i++){
    let positi
    gridItems[i].
  }
}
*/




const characterInput = document.getElementById("characterInput");

characterInput.oninput = function () {
  for (const item of gridItems){
    item.innerHTML = characterInput.value;
  }
}
