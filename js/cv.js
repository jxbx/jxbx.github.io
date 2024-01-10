//const educationKey = ["course", "institution", "dateStart", "dateEnd", "description"];
const introSection = document.getElementById("introSection");
const keyExperienceList = document.getElementById("keyExperienceList");
const otherExperienceList = document.getElementById("otherExperienceList");
const educationList = document.getElementById("educationList")

const introText = "I'm a digital project manager with a backgound working in design, and extensive experience working in arts and education focused roles. I work closely with my clients to map out effective user journeys across their sites. My work serves core user needs through simple, accessible design approaches. I'm looking to build my design career through a junior product design role at an organisation with a charitable and educational focus."

const education = [
  {
    course: "Javascript",
    institution: "Codecademy",
    dates: "2021",
    description: `A course on fundamental programming concepts in Javascript.`
  },
  {
    course: "React",
    institution: "Codecademy",
    dates: "2021",
    description: `A foundational course in front end programming using the React library for Javascript.`,
  },
  {
    course: "Responsive Web Design",
    institution: "FreeCodeCamp",
    dates: "2021",
    description: `A comprehensive course focusing on using HTML and CSS to build responsive web pages using grid and flexbox layouts, with special emphasis on applied accessibility approaches.`,
  },
  {
    course: "CELTA (certificate in English Language Teaching to Adults)",
    institution: "Ealing, Hammersmith and West London College",
    dates: "2014",
    description: `120-hour English-teaching course including 6 hours of assessed teaching.`
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
    employer: "Cog Design",
    role: "Digital Project Manager",
    dates: "Jan 2023 - present",
    url: "https://cogdesign.com",
    keyExperience: true,
    description: `A client-facing role at a digital design agency which exclusively develops websites for arts and heritage organisations. I work with venues like the Foundling Museum, Soho Theatre, London Philharmonic Orchestra, and Nottingham Playhouse. 
    <br></br> I help clients to adapt and update their websites to suit evolving business and user needs. I map out interface designs and user journeys in collaboration with clients, and work closely with specialist design and web development teams to deliver updates. Key responsibilities include:
    <ul>
      <li>Planning and delivering design and branding updates to existing websites for clients like the Belgrade Theatre (Coventry) and Lakeside Arts (Nottingham).</li>
      <li>Designing user purchase pathways based on integration with third party ticketing systems like Spektrix and Tessitura</li>
      <li>Auditing websites for accessibility through rigourous testing against the WCAG 2.x guidelines, and working closely with developers to deploy changes</li>
    </ul>`
  },
  {
    employer: "Costello Medical",
    role: "Graphic designer",
    dates: "Aug 2021 - May 2022",
    url: "https://www.costellomedical.com",
    keyExperience: true,
    description: `A wide-ranging graphic design and digital design role at an agency with clients in the medical sector, ranging from large corporate entities to small third sector and charity organisations. My responsibilities included:

<ul>
  <li>Supporting the development of websites for charities using the WordPress and Wix platforms through user testing and consulting on accessibility</li>
  <li>Designing, building, testing and deploying HTML emails via the Pure360 platform</li>
  <li>Designing printed policy reports and factsheets for both medical specialist and general audiences</li>
  <li>Designing technical reference materials for clinicians in interactive pdf and printed poster format</li>
  <li>Developing new best practice accessibility guidelines for digital design and exhibition design</li>
</ul>`
  },
  {
    employer: "The Charterhouse",
    role: "Visitor experience assistant",
    dates: "Jun 2021 - Aug 2022",
    url: "https://thecharterhouse.org",
    keyExperience: false,
    description: `A part-time role based at a historic venue in Islington. I managed the venue's online
retail and ticketing system using the DigiTickets platform, planned the delivery of guided tours and managed day-to-day operations.`
  },
  {
    employer: "St John Ambulance",
    role: "Event planning and delivery coordinator",
    dates: "April - December 2020",
    url: "https://www.sja.org.uk",
    keyExperience: false,
    description: `A role based at St John Ambulance's regional operations command centre. I coordinated the daily deployment of volunteer healthcare workers in response to Covid-19, managing the booking of healthcare volunteers onto hospital shifts and ambulance shifts and liaising with commercial clients to organise first aid support for behind closed doors sport events.`
  },
  {
    employer: "Museum of the Order of St John",
    role: "Lead designer and administrator",
    dates: "2017 - 2020",
    url: "https://museumstjohn.org.uk",
    keyExperience: true,
    description: `A design role based at a historic venue in central London with a strong focus on education and outreach . My responsibilities included:
    <ul>
<li>Designing exhibitions, gallery displays and wayfinding signage based on best practice accesibility guidelines</li>
<li>Delivering marketing creative for commercial events and generating retail design concepts based on the museum collections</li>
<li>Managing the museum's WordPress website, including updating content via the CMS and liaising with a digital agency to plan and implement design and functionality updates</li>
<li>Supporting the development of public programme content including talks, tours and activity sessions</li>
  </ul>`
  },
  {
    employer: "Museum of London",
    role: "Host and guide",
    dates: "2015 - 2017",
    url: "https://www.museumoflondon.org.uk/museum-london",
    keyExperience: false,
    description: `I developed and delivered public engagement content including talks and tours and creative workshops across two sites at one of London's busiest museums.`
  },
  {
    employer: "Elac study vacations",
    role: "English teacher",
    dates: "2014",
    url: "https://elac.co.uk",
    keyExperience: false,
    description: `I taught at a summer school for students aged 10-18 learning English as a second language`
  }
]

window.onload = function () {

  introSection.innerText = introText;
  for (const item of education){
    const newItem = document.createElement("li");
    newItem.setAttribute("class", "cvEntry");
    const newDates = document.createElement("p");
    const newDetails = document.createElement("p");
    const newDescription = document.createElement("p");
    newDates.setAttribute("class", "cvDate");
    newDates.innerText = item.dates;
    newDetails.innerText = item.course + " • " + item.institution
    newDescription.innerText = item.description;
    newItem.appendChild(newDates);
    newItem.appendChild(newDetails);
    newItem.appendChild(newDescription);
    educationList.appendChild(newItem);
  }

  for (const item of work){
    const newItem = document.createElement("li");
    newItem.setAttribute("class", "cvEntry");
    const newDates = document.createElement("p");
    const newDetails = document.createElement("p");
    const newDescription = document.createElement("p");
    newDates.setAttribute("class", "cvDate");
    newDetails.setAttribute("class", "cvDetails");
    newDates.innerText = item.dates;
    newDetails.innerHTML = "<a href=\"" + item.url + "\">" + item.employer + "</a>" + " • " + item.role;
    newDescription.innerHTML = item.description;
    newItem.appendChild(newDetails);
    newItem.appendChild(newDates);
    newItem.appendChild(newDescription);
    item.keyExperience == true ? keyExperienceList.appendChild(newItem) : otherExperienceList.appendChild(newItem);
  }
}
