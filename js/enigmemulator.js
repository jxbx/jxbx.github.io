//inputs 

const plaintextElement = document.getElementById("plaintext");
const decodeButtonElement = document.getElementById("decodeButton");
const encodeSelectElement = document.getElementById("encodeSelect")
const decodeSelectElement = document.getElementById("decodeSelect")

//outputs

const ciphertextElement = document.getElementById("ciphertext");
const keystringElement = document.getElementById("keystring");



//scrambler inputs (1,2,3)

const substring1Element = document.getElementById("scrambler1");
const substring2Element = document.getElementById("scrambler2");
const substring3Element = document.getElementById("scrambler3");

//start position inputs (1,2,3)

const startPos1Element = document.getElementById("startPos1");
const startPos2Element = document.getElementById("startPos2");
const startPos3Element = document.getElementById("startPos3");

//step rate inputs (1,2,3)

const stepRate1Element = document.getElementById("stepRate1");
const stepRate2Element = document.getElementById("stepRate2");
const stepRate3Element = document.getElementById("stepRate3");

const subsArray = 
      [[substring1Element, startPos1Element, stepRate1Element],                
       [substring2Element, startPos2Element, stepRate2Element],           
       [substring3Element, startPos3Element, stepRate3Element]];

function runEnigmemulator() {
  if (encodeSelectElement.checked === true){
    output = showCiphertext(plaintextElement.value);
  }
  else {
    output = showPlaintext(plaintextElement.value);
  }
  ciphertextElement.innerText = output.toUpperCase()
}

function encodeChar(input, startPos, stepRate, num) {
  return (input + startPos + stepRate * num)%26;
}

function decodeChar(input, startPos, stepRate, num){
  return (input + (26 - startPos) + (26 - stepRate) * num)%26
}

function showPlaintext(input) {
  
let string = input.toLowerCase();
  
  for (let i = subsArray.length -1; i>=0; i--){
    
    let subString = subsArray[i][0].value;
    let startPos = parseInt(subsArray[i][1].value);
    let stepRate = parseInt(subsArray[i][2].value);

    let newString = "";  

    for (let n = 0; n < string.length; n++) {
      let charNew = "";
      if (string[n] === " "){
        charNew = " ";
      }
      else {
       let charIndex = subString.indexOf(string[n]);
        if (charIndex < 0 || charIndex > 25){
        continue;
        }
        else {
       charIndex = decodeChar(charIndex, startPos, stepRate, n);
       charNew = String.fromCharCode(charIndex+97);
          }
        }
      newString += charNew;
     }
    string = newString;
  }
  return string;
}

function showCiphertext(input) {
  
let string = input.toLowerCase();
  
  for (let i = 0; i<subsArray.length; i++){
    
    let subString = subsArray[i][0].value;
    let startPos = parseInt(subsArray[i][1].value);
    let stepRate = parseInt(subsArray[i][2].value);
    
  
    let newString = "";  

    for (let n = 0; n < string.length; n++) {
      let charNew = "";
      
      if (string[n] === " "){
        charNew = " ";
      }
      else {
      let charIndex = string.charCodeAt(n) - 97;
        if (charIndex < 0 || charIndex > 25){
        continue;
        }
        else{
        charIndex = encodeChar(charIndex, startPos, stepRate, n);
        charNew = subString.charAt(charIndex);
        }
      }
      newString += charNew;
    }
    
    string = newString;
   
  }
   return string;
}

function clearAll(){
  plaintextElement.value = "";
  substring1Element.value ="qwertyuiopasdfghjklzxcvbnm";
  substring2Element.value ="qwertyuiopasdfghjklzxcvbnm";
  substring3Element.value ="qwertyuiopasdfghjklzxcvbnm";
  startPos1Element.value = "0";
  startPos2Element.value = "0";
  startPos3Element.value = "0";
  stepRate1Element.value = "0";
  stepRate2Element.value = "0";
  stepRate3Element.value = "0";
  encodeSelectElement.checked = "true";
  keystringElement.innerText = "";
  ciphertextElement.innerText = "<output appears here>";
}

function generateKey(){
  
    let keyString = "";
  
  for (let n=0; n<subsArray.length; n++){
     for (let m=0; m<subsArray[0].length; m++){
       
       function stringToId() {
       
       if (subsArray[n][m].value == "qwertyuiopasdfghjklzxcvbnm")
       {return "A-";
       } else if (subsArray[n][m].value == "mlpnkobjivhucgyxftzdrseawq") 
       {return "B-";
       } else if (subsArray[n][m].value == "bncmxzlaksjdhfgyturieowpqv") {
         return "C-";
         
       } else if (n == subsArray.length -1 && m == subsArray[0].length -1)
         {return subsArray[n][m].value
         }
         else return subsArray[n][m].value + "-";
         
         }
       
       
       let char = stringToId();
       
       keyString += char;
       
  }
  }
  keystringElement.innerText = keyString;
}

plaintextElement.oninput = runEnigmemulator;
substring1Element.oninput = runEnigmemulator;
startPos1Element.oninput = runEnigmemulator;
stepRate1Element.oninput = runEnigmemulator;
substring2Element.oninput = runEnigmemulator;
startPos2Element.oninput = runEnigmemulator;
stepRate2Element.oninput = runEnigmemulator;
substring3Element.oninput = runEnigmemulator;
startPos3Element.oninput = runEnigmemulator;
stepRate3Element.oninput = runEnigmemulator;
encodeSelectElement.oninput = runEnigmemulator;
decodeSelectElement.oninput = runEnigmemulator;
