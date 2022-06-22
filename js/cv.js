const cvEducationList = document.getElementById("cvEducationList");

const educationKey = ["course", "institution", "dateStart", "dateEnd", "description"];

const education = [
  {
    course: "Javascript",
    institution: "Codecademy",
    dates: "2021",
    description: `Course on fundamental programming concepts in Javascript`
  },
  {
    course: "React",
    institution: "Codecademy",
    dates: "2021",
    description: `Foundational course in front end programming using the React library for Javascript.`,
  },
  {
    course: "Responsive Web Design",
    institution: "FreeCodeCamp",
    dates: "2021",
    description: null,
  },
  {
    course: "MA in Film and Literature",
    institution: "University of York",
    dates: "2009 - 2011",
    description: "Awarded distinction"
  },
  {
    course: "BA in English Literature",
    institution: "University of York",
    dates: "2006 - 2009",
    description: "Awarded First"
  },
  {
    course: "Secondary Education",
    institution: "Colchester Royal Grammar School",
    dates: "2002 - 2006",
    description: `A-Levels: AAAAB (English literature, Biology, Chemistry, General Studies, Mathematics). GCSEs: 10 awarded at A*-C grade.`
  }
]

const work = [
  {
    employer: "Costello Medical",
    role: "Graphic designer",
    dates: "August 2021 - May 2022",
    description: null
  },
  {
    employer: "The Charterhouse",
    role: "visitor assistant",
    dates: "June 2021 - August 2022",
    description: null
  },
  {
    employer: "St John Ambulance",
    role: "Event planning and delivery coordinator",
    dates: "April - December 2020",
    description: `Based at St John Ambulance's regional operations command centre. I coordinated the daily deployment of volunteer healthcare workers in response to Covid-19, managing the booking of healthcare volunteers onto hospital shifts and ambulance shifts and liaising with commercial clients to organise first aid support for behind closed doors sport events.`
  },
  {
    employer: "Museum of the Order of St John",
    role: "Lead designer and administrator",
    dates: "2017 - 2020",
    description: `A design role based at a historic venue in central London. My responsibilities included:
Designing exhibitions, gallery displays and wayfinding signage based on best practice accesibility guidelines.
Delivering marketing creative for commercial events and generating retail design concepts based on the
museum collections.
Managing financial administration of the museum and developing new public programme content including
talks, tours and activity sessions`
  },
  {
    employer: "Museum of London",
    role: "Host and guide",
    dates: "2015 - 2017",
    description: `Developed and delivered public engagement content including talks and tours and creative workshops across two sites at one of London's busiest museums.`
  }
]

window.onload = function () {
  for (const item of education){
    const newItem = document.createElement("div");
    newItem.setAttribute("class", "cvEntry");
    const newDetails = document.createElement("p");
    const newDescription = document.createElement("p");
    newDetails.innerText = item.dates + " • " + item.course + " • " + item.institution;
    newDescription.innerText = item.description;
    newItem.appendChild(newDetails);
    newItem.appendChild(newDescription);
    cvEducationList.appendChild(newItem);
  }

  for (const item of work){
    const newItem = document.createElement("div");
    newItem.setAttribute("class", "cvEntry");
    const newDetails = document.createElement("p");
    const newDescription = document.createElement("p");
    newDetails.innerText = item.dates + " • " + item.employer + " • " + item.role;
    newDescription.innerText = item.description;
    newItem.appendChild(newDetails);
    newItem.appendChild(newDescription);
    cvWorkList.appendChild(newItem);

  }
}
