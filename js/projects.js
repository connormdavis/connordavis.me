// Master list of projects
let projects = [
  {
    "title": "KickStat",
    "description": "KickStat is an iOS application for kickers/punters like myself to track & analyze practice data over time. Developing KickStat allowed me to combine two of my passions - football & programming - while forcing me to learn Swift and iOS development paradigms along the way.",
    "technologies": [
      "Swift",
      "Core Data",
    ],
    "link": "https://kickstat.app",
    "code_link": false,
    "image_path": "/assets/kickstat-site.png"
  },
  {
    "title": "Fetch352",
    "description": "To create Fetch352, I had to learn and utilize multiple web technologies on the fly. Our system handles requests from multiple cities, dispatches them to our drivers, and allows users to receive live status updates along the route.",
    "technologies": [
      "PHP",
      "Perl",
      "HTML",
      "JavaScript",
      "CSS",
      "Linux",
      "Apache"
    ],
    "link": "https://fetch352.com",
    "code_link": false,
    "image_path": "/assets/fetch-order.png"
  },
  {
    "title": "SportsIX",
    "description": "SportsIX is a prototype platform for helping young athletes find instruction from local collegiate & professional athletes. The majority of my work consisted of designing and implementing the REST API written with Express.js in Node.js, hosted on Heroku. Our front end React.js application makes calls to our API which performs operations on our MySQL database hosted with AWS' Relational Database Service. The API provides endpoints for performing complex CRUD operations that require the joining of multiple tables, while maintaining third normal form.",
    "technologies": [
      "JavaScript",
      "React",
      "Redux",
      "Express.js",
      "Node.js",
      "MySQL",
      "AWS RDS"
    ],
    "link": false,
    "code_link": "https://github.com/connormdavis/sportsix_api",
    "image_path": "/assets/sportsix.png"
  },
  {
    "title": "Tiny Search Engine",
    "description": "I created a command line search engine, written entirely in C, that returns matching documents given a starting URL, max depth to search, and search query. The program matches the classic search engine architecture, recursively crawling the source webpage for all links up to the max depth. The resulting links are indexed and stored, mapping words to pages. Finally, the querier evaluates a search string, intelligently taking into account \'and/or\' presidence, and returns matching documents.",
    "technologies": [
      "C",
      "Shell"
    ],
    "link": "",
    "code_link": false,
    "image_path": "/assets/tse.png"
  }
]

// Object mapping technologies to their colors
let techColors = {
  "PHP": "#61639E",
  "Perl": "#247FAE",
  "HTML": "#D5351D",
  "Apache": "#BE051D",
  "CSS": "#1B30D9",
  "Linux": "#EB7415",
  "JavaScript": "#E4CE3D",
  "Swift": "#E93A2C",
  "Core Data": "#2272C2",
  "Redux": "#6626AE",
  "React": "#68D0F4",
  "Express.js": "#E6D217",
  "Node.js": "#569050",
  "MySQL": "#D37607",
  "AWS RDS": "#EA8019",
  "C": "#0B4384",
  "Shell": "#1F2428"
}

let projectHTML = "";
projects.forEach(project => {
  let technologies = project.technologies;
  let technology_string = "";
  technologies.forEach(tech => {
    technology_string += `
      <span class="mx-1" style="color: ${techColors[tech]}; font-weight: 600;">${tech}</span>
    `;
  });

  let link_string = project.link ? `
    <a class="project-icon-link" href="${project.link}">
      <i class="mx-2 project-icon fas fa-link fa-2x"></i>
    </a>
  ` : "";

  let code_string = project.code_link ? `
    <a class="project-icon-link" href="${project.code_link}">
      <i class="mx-2 project-icon fab fa-github fa-2x"></i>
    </a>
  ` : "";

  projectHTML += `
    <div class="col-sm-6 col-xl-6 d-flex justify-content-center">
      <div class="project-card card mb-4" >
        <div id="card-row" class="row no-gutters">
          <div class="col-md-12 col-xl-6">
            
            <a href="${project.link || project.code_link || ''}">
              <img src="${project.image_path}" class="card-img project-img" alt="...">
            </a>
            
          </div>
          <div class="col-md-12 col-xl-6">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">
                ${project.description}
              </p>
              <p class="card-text"><small class="text-muted">${technology_string}</small></p>
              ${link_string}
              ${code_string}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.getElementById("projects-list").innerHTML = projectHTML;

