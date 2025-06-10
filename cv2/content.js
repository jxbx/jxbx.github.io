const sections = [
  {
    title: "technicalSkillsList",
    include: false
  },
  {
    title: "keyExperienceList",
    include: true
  },
  {
    title: "otherExperienceList",
    include: true
  },
  {
    title: "studyList",
    include: true
  }
]

const introText = "I'm a digital project manager with experience in client support and a background working in arts and charity organisations. I have strong technical knowledge and great problem solving skills, and I love working in people facing roles."

const study = [

    {
      course: "Mental Health First Aid",
      institution: "MHFA England",
      dates: "2024",
      description: `<p>Two day course to become a qualified mental health first aider</p>`,
      include: true
    },  
    {
      course: "Javascript",
      institution: "Codecademy",
      dates: "2022",
      description: `<p>A course on fundamental programming concepts in Javascript.</p>`,
      include: true
    },
    {
      course: "React",
      institution: "Codecademy",
      dates: "2021",
      description: `<p>A foundational course in front end programming using the React library for Javascript.</p>`,
      include: true
    },
    {
      course: "Responsive Web Design",
      institution: "FreeCodeCamp",
      dates: "2021",
      description: `<p>A comprehensive course focusing on using HTML and CSS to build responsive web pages using grid and flexbox layouts, with special emphasis on applied accessibility approaches.</p>`,
      include: true
    },
    {
      course: "CELTA (certificate in English Language Teaching to Adults)",
      institution: "Ealing, Hammersmith and West London College",
      dates: "2014",
      description: `<p>120-hour English-teaching course including 6 hours of assessed teaching.</p>`,
      include: true
    },
    {
      course: "MA in Film and Literature",
      institution: "University of York",
      dates: "2009 - 2011",
      description: "<p>Awarded distinction</p>",
      include: true
    },
    {
      course: "BA in English Literature",
      institution: "University of York",
      dates: "2006 - 2009",
      description: "<p>Awarded First</p>",
      include: true
    },
    {
      course: "Secondary Education",
      institution: "Colchester Royal Grammar School",
      dates: "2002 - 2006",
      description: `<p>A-Levels: AAAAB (English literature, Biology, Chemistry, General Studies, Mathematics).<br/> GCSEs: 10 awarded at A*-C grade.</p>`,
      include: true
    }
  ]
  
  const work = [
    {
      employer: "Cog Design",
      role: "Digital Project Manager",
      dates: "Jan 2023 - present",
      url: "https://cogdesign.com",
      keyExperience: true,
      description: `<p>A client facing support role at a digital agency which builds and manages websites exclusively for arts and culture organisations. I work with clients like the London Philharmonic Orchestra, Soho Theatre and the Foundling Museum, responding to support requests, providing training, and helping them to set up integrations with external ticketing and CRM platforms. My responsibilities include:</p>
      <ul>
        <li>
        Providing on call support by email and video call for around 30 different clients, including bugfixing, assistance using the Wordpress CMS, and help setting up integration with ticketing and CRM platforms like Spektrix, Ticketsolve and Mailchimp
        </li>
        <li>
        Providing training to clients to help them make the most of their websites and CRM systems
        </li>
        <li>
        Building relationships with clients, understanding their work, and providing proactive technical solutions to business needs
        </li>
        <li>
        Providing project management for larger scale projects like new website builds, including running discovery workshops and writing up technical notes for developers
        </li>
      </ul>`,
     include: true
    },
    {
      employer: "Costello Medical",
      role: "Graphic designer",
      dates: "Aug 2021 - May 2022",
      url: "https://www.costellomedical.com",
      keyExperience: true,
      description: `<p>A wide-ranging graphic design and digital design role at an agency with clients in the medical sector, ranging from large corporate entities to small third sector and charity organisations. My responsibilities included:</p>
  
  <ul>
    <li>Supporting the development of websites for charities using the WordPress and Wix platforms through user testing and consulting on accessibility</li>
    <li>Designing, building, testing and deploying HTML emails via the Pure360 platform</li>
    <li>Designing printed policy reports and factsheets for both medical specialist and general audiences</li>
    <li>Designing technical reference materials for clinicians in interactive pdf and printed poster format</li>
    <li>Developing new best practice accessibility guidelines for digital design and exhibition design</li>
  </ul>`,
  include: true
    },
    {
      employer: "The Charterhouse",
      role: "Visitor experience assistant",
      dates: "Jun 2021 - Aug 2022",
      url: "https://thecharterhouse.org",
      keyExperience: false,
      description: `<p>A part-time role based at a historic venue in Islington. I managed the venue's online
  retail and ticketing system using the DigiTickets platform, planned the delivery of guided tours and managed day-to-day operations.</p>`,
  include: true
    },
    {
      employer: "St John Ambulance",
      role: "Event planning and delivery coordinator",
      dates: "April - December 2020",
      url: "https://www.sja.org.uk",
      keyExperience: true,
      description: `<p>A role based at St John Ambulance's regional operations command centre. I coordinated the daily deployment of volunteer healthcare workers in response to Covid-19, managing the booking of healthcare volunteers onto hospital shifts and ambulance shifts and liaising with commercial clients to organise first aid support for behind closed doors sport events.</p>`,
    include: true
    },
    {
      employer: "Museum of the Order of St John",
      role: "Lead designer and administrator",
      dates: "2017 - 2020",
      url: "https://museumstjohn.org.uk",
      keyExperience: true,
      description: `<p>A design role based at a historic venue in central London with a strong focus on education and outreach . My responsibilities included:</p>
      <ul>
  <li>Designing exhibitions, gallery displays and wayfinding signage based on best practice accesibility guidelines</li>
  <li>Delivering marketing creative for commercial events and generating retail design concepts based on the museum collections</li>
  <li>Managing the museum's WordPress website, including updating content via the CMS and liaising with a digital agency to plan and implement design and functionality updates</li>
  <li>Supporting the development of public programme content including talks, tours and activity sessions</li>
    </ul>`,
    include: true
    },
    {
      employer: "Museum of London",
      role: "Host and guide",
      dates: "2015 - 2017",
      url: "https://www.museumoflondon.org.uk/museum-london",
      keyExperience: false,
      description: `<p>I developed and delivered public engagement content including talks and tours and creative workshops across two sites at one of London's busiest museums.</p>`,
      include: true
    },
    {
      employer: "Elac study vacations",
      role: "English teacher",
      dates: "2014",
      url: "https://elac.co.uk",
      keyExperience: false,
      description: `<p>I taught at a summer school for students aged 10-18 learning English as a second language</p>`,
      include: true
    }
  ]

  const technical = [
    {
        type: "design",
        entries: ["InDesign", "Illustrator", "Photoshop", "After Effects", "Inkscape", "Sketchup", "Figma"]
    },
    {
        type: "web",
        entries: ["JavaScript (ES5/6)", "CSS3", "HTML5", "GitHub", "Liquid", "Jekyll", "WordPress"]
    }
  ]