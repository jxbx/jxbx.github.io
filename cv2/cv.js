const intro = document.getElementById("intro");
const keyExperienceList = document.getElementById("keyExperienceList");
const otherExperienceList = document.getElementById("otherExperienceList");
const studyList = document.getElementById("studyList");
const designSpan = document.getElementById("designSpan");
const webSpan = document.getElementById("webSpan");

//the following sections are imported from content.js:

let studyImported = study;
let workImported = work;
let technicalImported = technical;
let introTextImported = introText;
let sectionsImported = sections;

//populate intro text
function populateIntro(){
  const newItem = document.createElement("p");
  newItem.innerText = introText;
  intro.append(newItem);
}

//populate technical skills section
function populateTechnicalSkills(){
  for (const item of technicalImported){
    let text = "";
    for (let i=0;i<item.entries.length-1;i++){
      text += item.entries[i] + ", ";
    }
    text += item.entries[item.entries.length-1];
    item.type === "design" ? designSpan.innerText = text : webSpan.innerText = text;
  }
}

//populate work and study sections
function populateWorkAndStudy(section){

  for (const item of section){
    
    //use these consts to format the details differently for study vs work entries:
    const studyDetailsFormat = `${item.course} <span>//</span> ${item.institution}`;
    const workDetailsFormat = `<a href=\"${item.url}\">${item.employer}</a> <span>//</span> ${item.role}`;
  
    if (item.include === true){
      const newItem = document.createElement("div");
      const newItem2 = document.createElement("div")
      newItem.setAttribute("class", "cvEntry");
      newItem2.setAttribute("class", "entryHeading");
      newItem.appendChild(newItem2);
      const newDates = document.createElement("h3");
      const newDetails = document.createElement("h3");
      const newDescription = document.createElement("div");
      newDates.setAttribute("class", "cvDate");
      newDates.innerText = item.dates;
      newDetails.setAttribute("class", "cvDetails");
      newDetails.innerHTML = section === studyImported ? studyDetailsFormat : workDetailsFormat;
      newDescription.innerHTML = item.description;
      newItem2.appendChild(newDetails);
      newItem2.appendChild(newDates);
      newItem.appendChild(newDescription);

      //different handling for study vs work entries because there are two work sections:
      if (section === studyImported){
        studyList.appendChild(newItem);
      }
      else {
        item.keyExperience === true ? keyExperienceList.appendChild(newItem) : otherExperienceList.appendChild(newItem);
      }
   
    }
    else continue;
  }
}

//show or hide different sections

function displaySections() {
  for (const item of sectionsImported){
    if (item.include === false){
      document.getElementById(`${item.title}`).style.display = "none";
      }
    }
  }

window.addEventListener('load', (event) => { 
  populateIntro();
  populateTechnicalSkills();
  populateWorkAndStudy(studyImported);
  populateWorkAndStudy(workImported);
  displaySections();
});
