const box = document.getElementById("box");


window.onload = function generateCharacters() {
  for (let i=0; i<16; i++){
    const shape = document.createElement("path");
    shape.className = "shape";
    shape.setAttribute("id", "blob"+i);
    shape.setAttribute(d="M51.3,-18.7C57.5,2.3,47.2,26.6,27.5,41.8C7.8,57.1,-21.4,63.4,-43.4,49.8C-65.3,36.2,-80,2.7,-71.6,-21.4C-63.2,-45.6,-31.6,-60.4,-4.5,-58.9C22.6,-57.4,45.2,-39.7,51.3,-18.7Z");
  }
  box.appendChild(shape);
}
