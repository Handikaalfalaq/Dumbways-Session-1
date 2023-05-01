let blogs = [];
let submit = document.querySelector(".submit");
let box_project = document.getElementById("box_project");

let title = document.getElementById("project_name");
let startdate = document.getElementById("startdate");
let enddate = document.getElementById("enddate");
let description = document.getElementById("description");
let nodejs = document.querySelector(".nodejs input[type='checkbox']").checked;
let nextjs = document.querySelector(".nextjs input[type='checkbox']").checked;
let reactjs = document.querySelector(".reactjs input[type='checkbox']").checked;
let typescript = document.querySelector(
  ".typescript input[type='checkbox']"
).checked;
let input_image = document.getElementById("input_image");


// submit.onclick = getBlog;
submit.onclick = function (event) {
  if (title.value == "") {
    alert("Judul Project tidak boleh kosong");
    return false;
  } else if (startdate.value == "") {
    alert("Start Date Project tidak boleh kosong");
    return false;
  } else if (enddate.value == "") {
    alert("End Date Project tidak boleh kosong");
    return false;
  } else if (description.value == "") {
    alert("Description Project tidak boleh kosong");
    return false;
  } else if (input_image.value == "") {
    alert("image Project tidak boleh kosong");
    return false;
  } else {
    getBlog(event);
  }
};

function getBlog(event) {
  const getNodeValue = () => {
    return nodejs ? "block" : "none";
  };
  const getnextValue = () => {
    return nextjs ? "block" : "none";
  };
  const getreactValue = () => {
    return reactjs ? "block" : "none";
  };
  const gettypescriptValue = () => {
    return typescript ? "block" : "none";
  };

  let image = document.getElementById("input_image").files;
  let getinput_image = URL.createObjectURL(image[0]);

  // yang berhubungan dengan waktu dan tanggal
  let startyear = new Date(startdate.value).getFullYear();
  let startmonth = new Date(startdate.value).getMonth() + 1;
  let startday = new Date(startdate.value).getDate();

  let endyear = new Date(enddate.value).getFullYear();
  let endmonth = new Date(enddate.value).getMonth() + 1;
  let endday = new Date(enddate.value).getDate();

  const starttime = new Date(startdate.value).getTime();
  const endtime = new Date(enddate.value).getTime();
  const selisih = endtime - starttime;
  let selisihhari = selisih / (1000 * 60 * 60 * 24);

  let tahun = Math.floor(selisihhari / 365);
  let bulan = Math.floor((selisihhari % 365) / 30);
  let hari = Math.floor((selisihhari % 365) % 30);

  const waktu = () => {
    if (tahun >= 1) {
      return tahun + " tahun, " + bulan + " bulan, " + hari + " hari.";
    } else if (bulan >= 1) {
      return bulan + " bulan, " + hari + " hari.";
    } else if (hari >= 1) {
      return hari + " hari.";
    }
  };

  let blog = {
    title: title.value,
    startdate,
    startyear,
    startmonth,
    startdate,
    startday,
    enddate,
    endyear,
    endmonth,
    endday,
    duration: waktu(),
    description: description.value,
    nodevalue: getNodeValue(),
    nextvalue: getnextValue(),
    reactvalue: getreactValue(),
    typescriptvalue: gettypescriptValue(),
    getinput_image,
    postedAt: new Date(),
  };

  blogs.push(blog);
  renderBlog();

  // otomatis menghapus data di dalam form
  // title.value = "";
  // startdate.value = "";
  // enddate.value = "";
  // description.value = "";
  // nodejs = false;
  // nextjs = false;
  // reactjs = false;
  // typescript = false;
  // input_image.value = "";
}

function renderBlog() {
  box_project.innerHTML = "";
  
  for (let i = 0; i < blogs.length; i++) {
    box_project.innerHTML += `
      <div class="blog_project">
          <div class="foto_blog" style="background-image: url(${
            blogs[i].getinput_image
          }); background-size: cover; background-position: center center;" ></div>
  
          <div class="project_name">
            <span>${blogs[i].title} - </span>
            <span>${blogs[i].startyear}</span>
          </div>
          
          <div class="durasi">durasi: ${blogs[i].duration}</div>
          
          <div class="informasi">${blogs[i].description}</div>
          
          <div class="technologies">
            <a class="playstore" href="https://play.google.com/store/">
              <svg viewBox="-45 -5 530 550">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
            </a>

            <a class="androidrobot" href="https://web.airdroid.com/">
              <svg viewBox="0 0 500 1000" >
                <path d="M309.446,512c17.119,0,32.048-14.929,32.048-32.048v-74.846h21.399c12.841,0,21.399-8.561,21.399-21.399v-213.77H127.708v213.772c0,12.839,8.56,21.399,21.399,21.399h21.401v74.846c0,17.119,14.925,32.048,32.048,32.048c17.117,0,32.045-14.929,32.045-32.048v-74.846H277.4v74.846C277.398,497.071,292.327,512,309.446,512z"/>
                <path d="M437.74,383.709c17.119,0,32.045-14.927,32.045-32.048v-149.69c0-17.029-14.925-32.034-32.045-32.034c-17.121,0-32.048,15.006-32.048,32.034v149.69C405.692,368.78,420.618,383.709,437.74,383.709z"/>
                <path d="M74.261,383.709c17.121,0,32.048-14.927,32.048-32.048v-149.69c0-17.029-14.925-32.034-32.048-32.034c-17.119,0-32.045,15.006-32.045,32.034v149.69C42.217,368.78,57.142,383.709,74.261,383.709z"/>
                <path d="M358.611,3.229c-4.278-4.305-10.647-4.305-14.925,0l-28.701,28.605l-1.324,1.322c-17.018-8.522-36.099-12.778-57.347-12.819c-0.104,0-0.207-0.003-0.311-0.003h-0.003c-0.108,0-0.207,0.003-0.314,0.003c-21.247,0.041-40.327,4.297-57.344,12.819l-1.327-1.322L168.314,3.229c-4.281-4.305-10.647-4.305-14.925,0c-4.281,4.281-4.281,10.635,0,14.913l27.763,27.768c-8.946,5.973-17.058,13.282-24.112,21.642c-16.888,20.018-27.661,46.071-29.142,74.299c-0.014,0.294-0.043,0.584-0.056,0.878c-0.091,1.922-0.133,3.854-0.133,5.794h256.583c0-1.939-0.046-3.871-0.133-5.794c-0.014-0.294-0.043-0.584-0.06-0.878c-1.478-28.228-12.253-54.282-29.142-74.297c-7.051-8.36-15.166-15.669-24.112-21.642l27.766-27.768C362.893,13.864,362.893,7.511,358.611,3.229z M202.515,111.16c-8.853,0-16.031-7.177-16.031-16.031s7.177-16.031,16.031-16.031c8.853,0,16.031,7.177,16.031,16.031S211.368,111.16,202.515,111.16z M309.485,111.16c-8.853,0-16.031-7.177-16.031-16.031s7.177-16.031,16.031-16.031c8.853,0,16.031,7.177,16.031,16.031S318.339,111.16,309.485,111.16z"/>
              </svg>
            </a>

            <a class="java" href="https://www.java.com/en/">
              <svg viewBox="0 40 500 3300">
                <path d="M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z"/>
              </svg>
            </a>
          </div>
      
          <div class="action">
              <button class="edit">edit</button>
              <button class="delete">delete</button>
          </div>

          <div class="intervalwaktu">
            di upload sejak ${getDuration(blogs[i].postedAt)} lalu
          </div>
      </div>
      `;
  }
  // looping ini digunakan untuk data blog project yang dimasukkan melalui form di web
  let blog_project = document.querySelectorAll(".blog_project");
  for (let i = 0; i < blog_project.length; i++) {
    blog_project[i].addEventListener("click", function () {
      window.location.href = "detailproject.html";
    });
  }
}

function getDuration(time) {
  const distance = new Date() - new Date(time);
  const dayDistance = Math.floor(distance / (24 * 60 * 60 * 1000));
  if (dayDistance > 0) {
    return dayDistance + " Day Ago"; // 1 day ago
  } else {
    const hourDistance = Math.floor(distance / (60 * 60 * 1000));
    if (hourDistance > 0) {
      return hourDistance + " Hour Ago"; // 3 hour ago
    } else {
      const minuteDistance = Math.floor(distance / (60 * 1000));
      if (minuteDistance > 0) {
        return minuteDistance + " Minute Ago"; // 55 minute ago
      } else {
        const secondDistance = Math.floor(distance / 1000);
        if (secondDistance > 0) {
          return secondDistance + " Second Ago"; // 45 second ago
        }
      }
    }
  }
}

// setInterval(renderBlog, 1000);
