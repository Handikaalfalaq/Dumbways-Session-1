let blogs = [];
let submit = document.querySelector(".submit");
let box_project = document.getElementById("box_project");

let nodejs = document.querySelector(".nodejs input[type='checkbox']")
let nextjs = document.querySelector(".nextjs input[type='checkbox']")
let reactjs = document.querySelector(".reactjs input[type='checkbox']")
let typescript = document.querySelector(".typescript input[type='checkbox']")

let title = document.getElementById("project_name");
let startDate = document.getElementById("startdate");
let endDate = document.getElementById("enddate");
let description = document.getElementById("description");
let input_image = document.getElementById("input_image");

// submit.onclick = getBlog;


submit.onclick = function(){
  if (title.value == "" ) {
    alert("Judul Project tidak boleh kosong");
    return false;
  } else if (startDate.value == "" ) {
    aldert("Start Date Project tidak boleh kosong");
    return false;
  } else if (endDate.value == "" ) {
    alert("End Date Project tidak boleh kosong");
    return false;
  } else if (description.value == "" ) {
    alert("Description Project tidak boleh kosong");
    return false;
  } else if (input_image.value =="") {
    alert("image Project tidak boleh kosong");
    return false;
  } else {
    getBlog();
  }};


function getBlog() {

  const getNodeValue = () => {
    return nodejs.checked? "block" : "none";
  };
  const getnextValue = () => {
    return nextjs.checked? "block": "none";
  };
  const getreactValue = () => {
    return reactjs.checked? "block": "none";
  };
  const gettypescriptValue = () => {
    return typescript.checked? "block": "none";
  };

  let getinput_image = URL.createObjectURL(input_image.files[0]);

  let duration = "3 bulan";
  let tahun = "2023";

  let blog = [
    title.value,
    tahun,
    duration,
    description.value,
    getNodeValue(),
    getnextValue(),
    getreactValue(),
    gettypescriptValue(),
    getinput_image,
  ];

  blogs.push(blog);
  renderBlog();

  title.value = "";
  startDate.value = "";
  endDate.value = "";
  description.value = "";
  nodejs.checked = false;
  nextjs.checked = false;
  reactjs.checked= false;
  typescript.checked = false;
  input_image.value = "";
}


function renderBlog() {
  box_project.innerHTML = "";
  for (let i = 0; i < blogs.length; i++) {
    box_project.innerHTML += `
    <div class="blog_project">
        <div class="foto_blog" style="background-image: url(${blogs[i][8]}); background-size: cover; background-position: center center;" ></div>

        <div class="project_name">
          <span>${blogs[i][0]} - </span>
          <span>${blogs[i][1]}</span>
        </div>
        
        <div class="durasi">durasi: ${blogs[i][2]}</div>
        
        <div class="informasi">${blogs[i][3]}</div>
        
        <div class="technologies">
            <a class="logo_nodejs" href="https://nodejs.org/api/webstreams.html" style="display: ${blogs[i][4]};">
                <svg viewBox="-45 -5 530 550">
                <path d="M224 508c-6.7 0-13.5-1.8-19.4-5.2l-61.7-36.5c-9.2-5.2-4.7-7-1.7-8 12.3-4.3 14.8-5.2 27.9-12.7 1.4-.8 3.2-.5 4.6.4l47.4 28.1c1.7 1 4.1 1 5.7 0l184.7-106.6c1.7-1 2.8-3 2.8-5V149.3c0-2.1-1.1-4-2.9-5.1L226.8 37.7c-1.7-1-4-1-5.7 0L36.6 144.3c-1.8 1-2.9 3-2.9 5.1v213.1c0 2 1.1 4 2.9 4.9l50.6 29.2c27.5 13.7 44.3-2.4 44.3-18.7V167.5c0-3 2.4-5.3 5.4-5.3h23.4c2.9 0 5.4 2.3 5.4 5.3V378c0 36.6-20 57.6-54.7 57.6-10.7 0-19.1 0-42.5-11.6l-48.4-27.9C8.1 389.2.7 376.3.7 362.4V149.3c0-13.8 7.4-26.8 19.4-33.7L204.6 9c11.7-6.6 27.2-6.6 38.8 0l184.7 106.7c12 6.9 19.4 19.8 19.4 33.7v213.1c0 13.8-7.4 26.7-19.4 33.7L243.4 502.8c-5.9 3.4-12.6 5.2-19.4 5.2zm149.1-210.1c0-39.9-27-50.5-83.7-58-57.4-7.6-63.2-11.5-63.2-24.9 0-11.1 4.9-25.9 47.4-25.9 37.9 0 51.9 8.2 57.7 33.8.5 2.4 2.7 4.2 5.2 4.2h24c1.5 0 2.9-.6 3.9-1.7s1.5-2.6 1.4-4.1c-3.7-44.1-33-64.6-92.2-64.6-52.7 0-84.1 22.2-84.1 59.5 0 40.4 31.3 51.6 81.8 56.6 60.5 5.9 65.2 14.8 65.2 26.7 0 20.6-16.6 29.4-55.5 29.4-48.9 0-59.6-12.3-63.2-36.6-.4-2.6-2.6-4.5-5.3-4.5h-23.9c-3 0-5.3 2.4-5.3 5.3 0 31.1 16.9 68.2 97.8 68.2 58.4-.1 92-23.2 92-63.4z"/></svg>
            </a>

            <a class="logo_nextjs" href="https://nextjs.org/" style="display: ${blogs[i][5]}">
                <svg viewBox="0 400 2550 3300">
                <path d="M1009 1501c18,8 229,331 260,376 137,199 255,370 401,562 23,31 46,62 69,93 34,48 59,51 2,78 -482,227 -1051,79 -1348,-363 -201,-298 -239,-682 -96,-1014 282,-652 1124,-859 1668,-392 265,228 399,557 370,906 -21,253 -128,476 -305,656 -28,28 -146,135 -178,141 -14,-12 -83,-123 -100,-148 -94,-141 -199,-309 -292,-442 -66,-95 -131,-199 -195,-297l-246 -369c-25,-39 -47,-32 -92,-30 -54,2 -50,28 -49,72 1,41 0,82 0,123 0,200 2,415 -1,615 -1,37 -6,77 43,79 101,2 87,-10 87,-159 0,-160 -5,-328 2,-487zm-926 216c36,663 598,1156 1257,1124 662,-31 1158,-599 1127,-1256 -21,-460 -323,-873 -749,-1043 -458,-182 -985,-66 -1320,299 -220,240 -332,551 -315,876z"/>
                <path d="M1663 2005c7,-146 1,-306 1,-453 0,-76 0,-152 0,-228 0,-26 8,-80 -22,-91 -20,-7 -82,-9 -98,7 -21,21 -12,176 -12,213l-1 340c1,31 64,114 84,145 10,15 36,63 48,67z"/></svg>
            </a>

            <a class="logo_reactjs" href="https://legacy.reactjs.org/" style="display: ${blogs[i][6]}">
                <svg viewBox="170 40 500 3300">
                <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z"/>
                <circle cx="420.9" cy="296.5" r="45.7"/>
                </svg>
            </a>
        
            <a class="logo_typescript" href="https://www.typescriptlang.org/" style="display: ${blogs[i][7]};">
                <svg viewBox="150 500 2300 3300" style=" fill-rule:evenodd;">
                <path d="M225 600l2100 0 0 2100 -2100 0 0 -2100zm132 132l1836 0 0 1836 -1836 0 0 -1836z"/>
                <path d="M686 1654l0 85 273 0 0 777 193 0 0 -777 273 0 0 -84c0,-47 0,-85 -2,-86 0,-2 -166,-2 -368,-2l-368 1 0 86 -1 0 0 0zm1226 -88c54,13 95,37 131,75 20,21 49,58 51,67 0,3 -91,65 -146,99 -2,1 -11,-7 -19,-21 -27,-39 -55,-56 -99,-59 -63,-4 -105,29 -105,84 0,17 3,26 10,40 14,29 40,46 121,82 151,64 216,107 255,168 45,68 55,175 25,255 -34,88 -116,147 -233,167 -37,6 -121,5 -160,-2 -84,-16 -164,-58 -213,-112 -20,-21 -57,-77 -55,-80l20 -13 79 -46 59 -34 14 18c17,27 56,64 78,77 69,35 160,30 205,-11 19,-18 28,-37 28,-63 0,-24 -4,-35 -16,-53 -17,-23 -50,-42 -145,-84 -108,-46 -155,-76 -198,-121 -24,-27 -47,-70 -57,-105 -8,-30 -11,-105 -4,-135 23,-105 102,-178 216,-199 36,-8 123,-4 159,5l-1 1 0 0z"/>
                </svg>
            </a>
        </div>
    
        <div class="action">
            <button class="edit">edit</button>
            <button class="delete">delete</button>
        </div>
    </div>
    `;    
  }
  

// looping ini digunakan untuk data blog project yang dimasukkan melalui form di web
let blog_project = document.querySelectorAll(".blog_project")

  for (let i = 0; i < blog_project.length; i++ ) {
    blog_project[i].addEventListener("click", function() {
    window.location.href = "detaiproject.html"
})}
}


// looping ini digunakan untuk data blog project yang dimasukkan manual di code html
let blog_project = document.querySelectorAll(".blog_project")

  for (let i = 0; i < blog_project.length; i++ ) {
    blog_project[i].addEventListener("click", function() {
    window.location.href = "detaiproject.html"
})}





















