

//page navigation


const slides = document.getElementsByClassName("pageContent");

slides[0].style.visibility = "visible";
  let counter = 0;
  const  counterTextEl = document.getElementById("counterText");
  counterTextEl.innerText = `${counter + 1} / ${slides.length}`;


function navSlides(input) {
  slides[counter].style.visibility = "hidden";

  if (input === 1){
    counter++;
  }
  else if (input === 0){
    counter--;
  }

  if (counter >= slides.length ){
    counter = slides.length-1;
  }
  else if (counter < 0) {
    counter = 0;
  }
  counterTextEl.innerText = `${counter + 1} / ${slides.length}`;
  slides[counter].style.visibility = "visible";
}

function start () {
  slides[0].style.visibility = "visible";
  for (let i=1; i<=26; i++){
    slides[i].style.visibility = "hidden";
  }
  counter = 0;
  counterTextEl.innerText = `${counter + 1} / ${slides.length}`;
}

function end () {
  slides[26].style.visibility = "visible";
  for (let i=0; i<26; i++){
    slides[i].style.visibility = "hidden";
  }
  counter = 26;
  counterTextEl.innerText = `${counter + 1} / ${slides.length}`;
}
