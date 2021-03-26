//required to derive rad2

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



const standardPintGlass = {
  height: 14,
  rad1: 4,
  volume: 568,
  scaleX: 1,
  scaleY: 1
};

const standardHalfPintGlass = {
  height: 11,
  rad1: 3.2,
  volume: 284,
  scaleX: 3.2 / 4,
  scaleY: 12 / 14
};

const stubbyPintGlass = {
  height: 10,
  rad1: 4.5,
  volume: 568,
  scaleX: 4.5 / 4,
  scaleY: 10 / 14
};

const pilsnerPintGlass = {
  height: 20,
  rad1: 3.5,
  volume: 568,
  scaleX: 3.5 / 4,
  scaleY: 20 / 14
};

const pintTypeLookup = {
  "Standard conical": standardPintGlass,
  "Stubby pint": stubbyPintGlass,
  "Standard half pint": standardHalfPintGlass,
  "Pilsner pint": pilsnerPintGlass
};

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
  document.getElementById("pageThree").style.top = "0vh";
  document.getElementById("pageThree").style.opacity = "1";
  document.getElementById("pageOne").style.top = "-100vh";
  console.log("test");
}

//validate head depth and pint price inputs

const priceEl = document.getElementById("price");
const headDepthEl = document.getElementById("headDepth");

priceEl.oninput = checkInputs;
headDepthEl.oninput = checkInputs;

function checkInputs() {
  let glassType =
    pintTypeLookup[Object.keys(pintTypeLookup)[Math.abs(glassCounter)]];
  if (priceEl.value < 0) {
    priceEl.value = 0;
  }

  if (headDepthEl.value < 0) {
    headDepthEl.value = 0;
  } else if (headDepthEl.value > glassType.height) {
    headDepthEl.value = glassType.height;
  }
}

//beer pouring and stat reveal

function resultAnimate() {
  const glassType =
    pintTypeLookup[Object.keys(pintTypeLookup)[Math.abs(glassCounter)]];
  const price = priceEl.value;
  const headDepth = headDepthEl.value;

  let outputValues = checkHead(glassType, headDepth, price);
  console.log(outputValues);

  document.getElementById("frothVolText").innerHTML = outputValues[0] + "ml";
  document.getElementById("beerVolText").innerHTML = outputValues[1] + "ml";
  document.getElementById("percentText").innerHTML = outputValues[2] + "%";
  document.getElementById("costText").innerHTML = "£" + outputValues[3];

  setTimeout(function() {
    document.getElementById("frothVolText").style.opacity = "1";
  }, 1000);
  setTimeout(function() {
    document.getElementById("beerVolText").style.opacity = "1";
  }, 1500);
  setTimeout(function() {
    document.getElementById("percentText").style.opacity = "1";
  }, 2000);
  setTimeout(function() {
    document.getElementById("costText").style.opacity = "1";
  }, 2500);
  setTimeout(function() {
    document.getElementById("again").style.opacity = "1";
  }, 4000);
  document.getElementById("pageThree").style.opacity = "0";
  setTimeout(function() {
    document.getElementById("pageThree").style.top = "-100vh";
  }, 1000);

  document.getElementById("statContainer").style.marginLeft = `${2 +
    (16 * glassType.scaleX - 16) / 2}rem`;

  document.getElementById("pageThree").style.opacity = "0";
  setTimeout(function() {
    document.getElementById("statContainer").style.opacity = "1";
  }, 1000);

  setTimeout(function() {
    document.getElementById("beerBody").style.borderTop = `${(headDepth * 2) /
      glassType.scaleY}rem solid white`;
  }, 2000);
  setTimeout(function() {
    document.getElementById("beerBody").style.height = "30em";
  }, 1000);
  setTimeout(function() {
    document.getElementById("beerBody").style.animationName = "wobble";
  }, 1000);
  setTimeout(function() {
    document.getElementById("drip").style.height = "10em";
  }, 4000);
}

//again animation

function againAnimate() {
  document.getElementById("statContainer").style.marginLeft = "-13rem";
  inputOverlay();
  document.getElementById("pageThree").style.top = "0vh";

  setTimeout(function() {
    document.getElementById("frothVolText").innerHTML = "";
  }, 1000);
  setTimeout(function() {
    document.getElementById("beerVolText").innerHTML = "";
  }, 1000);
  setTimeout(function() {
    document.getElementById("percentText").innerHTML = "";
  }, 1000);
  setTimeout(function() {
    document.getElementById("costText").innerHTML = "";
  }, 1000);

  document.getElementById("frothVolText").style.opacity = "0";
  document.getElementById("beerVolText").style.opacity = "0";
  document.getElementById("percentText").style.opacity = "0";
  document.getElementById("costText").style.opacity = "0";
  document.getElementById("statContainer").style.opacity = "0";

  document.getElementById("again").style.opacity = "0";
}

//splash screen navigation

const arrowEl = document.getElementById("arrow");

arrowEl.addEventListener("click", inputOverlay);

//glass selector

let glassCounter = 0;

function glassSelector(input) {
  if (input === 1) {
    glassCounter = (glassCounter + 1) % Object.keys(pintTypeLookup).length;
  } else {
    glassCounter = (glassCounter - 1) % Object.keys(pintTypeLookup).length;
  }

  let pintSelected =
    pintTypeLookup[Object.keys(pintTypeLookup)[Math.abs(glassCounter)]];

  document.getElementById("glassesText").innerHTML = Object.keys(
    pintTypeLookup
  )[Math.abs(glassCounter)];

  document.getElementById("glassInfo").innerHTML = `Height: ${
    pintSelected.height
  }cm <br> Top diameter: ${pintSelected.rad1 * 2}cm`;

  document.getElementById(
    "beerContainer"
  ).style.transform = `scale(${pintSelected.scaleX},${pintSelected.scaleY})`;

  checkInputs();
}
