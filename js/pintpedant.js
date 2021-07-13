//declare HTML elements as variables

const slider = document.getElementById("slider");
const priceEl = document.getElementById("price");
const headDepthEl = document.getElementById("headDepth");
const frothVolText = document.getElementById("frothVolText");
const beerVolText = document.getElementById("beerVolText");
const percentText = document.getElementById("percentText");
const costText = document.getElementById("costText");
const statContainer = document.getElementById("statContainer");
const beerBody = document.getElementById("beerBody");
const again = document.getElementById("again");
const drip = document.getElementById("drip");
const glassesText = document.getElementById("glassesText");
const glassInfo = document.getElementById("glassInfo");
const beerContainer = document.getElementById("beerContainer");


//formulas to derive rad2

function quadFormula(a, b, c) {
  return 0.5 * (-b + Math.sqrt(b * b - 4 * a * c));
}

function findRad2(glass){

  let newVar = Math.pow(glass.rad1, 2) - glass.volume / ((Math.PI*glass.height) / 3);

  return quadFormula(1, glass.rad1, newVar);
}

//formula to calculate volume of truncated cone

function findVol(height, rad1, rad2) {
  return (
    (1 / 3) *
    Math.PI *
    height *
    (Math.pow(rad1, 2) + Math.pow(rad2, 2) + rad1 * rad2)
  );
}

//glass info

const glasses = [

  {
    name: "Standard conical",
    height: 14,
    rad1: 4,
    volume: 568,
    scaleX: 1,
    scaleY: 1
  },

  {
    name: "Standard half pint glass",
    height: 11,
    rad1: 3.2,
    volume: 284,
    scaleX: 3.2 / 4,
    scaleY: 12 / 14
  },

  {
    name: "Stubby pint glass",
    height: 10,
    rad1: 4.5,
    volume: 568,
    scaleX: 4.5 / 4,
    scaleY: 10 / 14
  },

  {
    name: "Pilsner glass",
    height: 20,
    rad1: 3.5,
    volume: 568,
    scaleX: 3.5 / 4,
    scaleY: 20 / 14
  },

]

//glass selector

let glassCounter = 0;
let pintSelected = glasses[glassCounter];

function glassSelector(input) {

  glassCounter = (glassCounter + input) % glasses.length;
  glassCounter >= 0 ?
  pintSelected = glasses[glassCounter]:
  pintSelected = glasses[glasses.length + glassCounter];

  glassesText.innerHTML = pintSelected.name;

  glassInfo.innerHTML = `Height: ${pintSelected.height}cm <br> Top diameter: ${pintSelected.rad1 * 2}cm`;

  beerContainer.style.transform = `scale(${pintSelected.scaleX},${pintSelected.scaleY})`;

  checkInputs();
}

function checkHead(glass, inputHeadHeight, inputPrice) {
  let result = [];

  let rad2 = findRad2(glass);

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

// form overlay

function inputOverlay() {
  slider.style.top = "-200vh";
}

//validate head depth and pint price inputs

function checkInputs() {

  if (priceEl.value < 0) {
    priceEl.value = 0;
  }

  if (headDepthEl.value < 0) {
    headDepthEl.value = 0;
  } else if (headDepthEl.value > pintSelected.height) {
    headDepthEl.value = pintSelected.height;
  }
}

priceEl.oninput = checkInputs;
headDepthEl.oninput = checkInputs;

//beer pouring and stat reveal

function resultAnimate() {
  const price = priceEl.value;
  const headDepth = headDepthEl.value;

  let outputValues = checkHead(pintSelected, headDepth, price);

  frothVolText.innerHTML = outputValues[0] + "ml";
  beerVolText.innerHTML = outputValues[1] + "ml";
  percentText.innerHTML = outputValues[2] + "%";
  costText.innerHTML = "£" + outputValues[3];

  //ANIMATION TIMINGS

  //hide input form and reveal stat box

  slider.style.top = "-300vh";
  statContainer.style.marginLeft = `${2 + (16 * pintSelected.scaleX - 16) / 2}rem`;
  statContainer.style.opacity = "1";

  //draw in beer glass contents and reveal stats at 500ms intervals

  setTimeout(function() {
    beerBody.style.height = "30em";
    beerBody.style.animationName = "wobble";
    frothVolText.style.opacity = "1";
  }, 1000);

  setTimeout(function() {
    beerVolText.style.opacity = "1";
  }, 1500);

  setTimeout(function() {
    percentText.style.opacity = "1";
    beerBody.style.borderTop = `${(headDepth * 2) / pintSelected.scaleY}rem solid white`;
  }, 2000);

  setTimeout(function() {
    costText.style.opacity = "1";
  }, 2500);

  //reveal re-submit button and draw in drip

  setTimeout(function() {
    again.style.opacity = "1";
    drip.style.height = "10em";
  }, 4000);

}

//RE-SUBMIT ANIMATION

function againAnimate() {

  //reposition stat box

  statContainer.style.marginLeft = "-13rem";

  //reveal form

  inputOverlay();

  // clear statbox

  setTimeout(function() {
    frothVolText.innerHTML = "";
    beerVolText.innerHTML = "";
    percentText.innerHTML = "";
    costText.innerHTML = "";
  }, 1000);

  //re-hide stats

  frothVolText.style.opacity = "0";
  beerVolText.style.opacity = "0";
  percentText.style.opacity = "0";
  costText.style.opacity = "0";
  statContainer.style.opacity = "0";
  again.style.opacity = "0";
}
