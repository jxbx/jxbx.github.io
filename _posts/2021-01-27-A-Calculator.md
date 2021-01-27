---
layout: post
title: First blog post
date: 2020-12-21
---

Test

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Hello!</title>

  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>MiniCalc</title>
</head>
<body>
  <div class="grid-container">
    <div class="header">
      <p id="display"></p>
    </div>
    <div class = "numbers">
      <input type="button"
             id = "9"
             onclick = "displayInput(9)"
             value="9" />
      <input type="button"
             id = "8"
             onclick = "displayInput(8)"
             value="8" />
      <input type="button" 
             id = "7"
             onclick = "displayInput(7)"
             value="7" />
      <input type="button" 
             id = "6"
             onclick = "displayInput(6)"
             value="6" />
      <input type="button" 
             id = "5"
             onclick = "displayInput(5)"
             value="5" />
      <input type="button" 
             id = "4"
             onclick = "displayInput(4)"
             value="4" />
      <input type="button"
             id = "3"
             onclick = "displayInput(3)"
             value="3" />
      <input type="button" 
             id = "2"
             onclick = "displayInput(2)"
             value="2" />
      <input type="button"
             id = "1"
             onclick = "displayInput(1)"
             value="1" />
      <input type="button" 
             id = "0"
             onclick = "displayInput(0)"
             value="0" />
      <input type="button" 
             id = "decimal"
             onclick = "displayInput('.')"
             value="." />
      <input type="button"
             id ="clear"
             onclick = "clearInput()"
             value="Clear" />

    </div>
    <div class = "symbols">
       <input type="button" 
              id="plus"
             onclick = "displayInput('+')"
             value="+" />
       <input type="button" 
              id = "minus"
              onclick = "displayInput('-')"
             value="-" />
       <input type="button" 
              id = "divide"
              onclick = "displayInput('/')"
             value="/" />
       <input type="button" 
               id = "multiply"
              onclick = "displayInput('*')"
             value="*" />
    </div>
    <div class = "equals">
      <input type="button"
             id="equals"
             onclick = "calculate()"
             value="=" />
    </div>
  </div>
</body>

<script>let inputString = [];
const symbols = ["+", "-", "/", "*"];

function displayInput(input) {
  console.log(`displayInput(${input})`);
	const lastChar = inputString[inputString.length - 1];
	//special conditions when input is "+", "-", "/" or "*"
	if (symbols.includes(input)) {
		if (inputString.length === 0) {
			console.log("enter a number");
		} else if (symbols.includes(lastChar) || lastChar === ".") {
			inputString = inputString.substring(0, inputString.length - 1) + input;
		} else inputString += input;
	}
	//special conditions when input is "."
	else if (input === ".") {
		if (inputString.length === 0 || symbols.includes(lastChar)) {
			inputString = inputString + "0.";
		} else if (lastChar === ".") {
			inputString = inputString.substring(0, inputString.length - 1) + input;
		} else inputString += input;
	}
	//conditions for all other inputs
	else {
		inputString += input;
	}
  console.log("Changing display in displayInput: ", inputString);
	document.getElementById("display").innerHTML = inputString;
}

function clearInput() {
	inputString = [];
  console.log("changing in clearInput");
	document.getElementById("display").innerHTML = inputString;
}

function calculate() {
	//generate separate arrays of numbers and symbols using regular expressions
	let numArr = inputString.split(/\+|\-|\*|\//g);
	let symbolArr = inputString.replace(/[0-9]|\./g, "").split("");
	let result = parseFloat(numArr[0]);
	console.log(numArr);
	console.log(symbolArr);
	if (symbols.includes(inputString[inputString.length - 1])) {
		return;
	} else {
		for (let n = 1; n < numArr.length; n++) {
			if (symbolArr[n - 1] === "*") {
				result *= parseFloat(numArr[n]);
			} else if (symbolArr[n - 1] === "/") {
				result /= parseFloat(numArr[n]);
			} else if (symbolArr[n - 1] === "+") {
				result += parseFloat(numArr[n]);
			} else {
				result -= parseFloat(numArr[n]);
			}
		}
	}
	result = result;
	console.log(result);
  console.log("changing in calculate");
	document.getElementById("display").innerHTML = result;
	inputString = [];
}
//adding numpad input functionality
function keyInput(event) {
  console.log("keyInput", event);
	if (event.keyCode > 95 && event.keyCode < 106) {
    console.log("displayInput 1");
		displayInput(parseInt(event.keyCode) - 96);
	} else if (event.keyCode === 106) {
    console.log("displayInput 2");
		displayInput("*");
	} else if (event.keyCode === 107) {
    console.log("displayInput 3");
		displayInput("+");
	} else if (event.keyCode === 109) {
    console.log("displayInput 4");
		displayInput("-");
	} else if (event.keyCode === 110) {
    console.log("displayInput 5");
		displayInput(".");
	} else if (event.keyCode === 111) {
    console.log("displayInput 6");
		displayInput("/");
	} else if (event.keyCode === 13) {
		calculate();
    event.preventDefault();  // Don't press the button again!!
	} else if (event.keyCode === 8) {
		clearInput();
	} else {
		return;
	}
}
window.addEventListener("keydown", keyInput);</script>
<style>
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
body {
	max-width: 25rem;
	min-width: 15rem;
	font-family: "Kanit", "sans-serif";
	font-size: 2rem;
	margin: auto;
}
p {
	overflow-wrap: break-word;
	width: 100%;
	margin: 0;
}
.grid-container {
	width: 100%;
	display: grid;
	grid-template-columns: repeat (4, 1fr);
	grid-template-rows: repeat (3, 1fr);
	border: 0.5rem solid #c2c2c2;
	border-radius: 1rem;
	background-color: gray;
	margin-top: 5rem;
}
.header {
	width: 100%;
	min-height: 5.5rem;
	overflow: hidden;
	grid-area: 1/1/1/5;
	background-color: #cde0b6;
	border: 0.1rem solid gray;
	border-bottom: 0.05rem solid gray;
	border-radius: 0.5rem 0.5rem 0 0;
	padding: 1rem;
}
.numbers {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-area: 2/1/3/4;
	border-left: 0.05rem solid gray;
}
.symbols {
	display: grid;
	grid-area: 2/4/3/5;
}
.symbols>input[type=button] {
	background-color: #bfbfbf;
	border-right: 0.1rem solid gray;
}
.equals {
	grid-area: 5/1/5/5;
}
.equals>input[type=button] {
	width: 100%;
	background-color: #cce3e1;
	border-radius: 0 0 0.5rem 0.5rem;
	border: 0.1rem solid gray;
	border-top: 0.05rem solid gray;
}
input[type=button] {
	border: 0.05rem solid gray;
	height: 4rem;
	font-size: 1rem;
	font-family: "Kanit"
}
input[type=button]:hover {
	background-color: gray;
	color: white;
}
input[type=button]:active {
	transform: translateY(0.2rem);
}
input[type=button]:focus {
	outline: none;
	box-shadow: none;
}
</style>
