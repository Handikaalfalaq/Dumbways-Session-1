let humburger = document.querySelector(".humburger")
let navhumburger = document.querySelector(".navhumburger")

let home = document.querySelector(".navbar_kiri a .home");

let myproject = document.querySelector("#my_project") 
let testimonials = document.querySelector("#testimonials") 
let contactme = document.querySelector(".navbar_kanan a .contactme")

let humburger_home = document.querySelector(".humburger_home") 
let humburger_myproject = document.querySelector(".humburger_myproject") 
let humburger_contactme = document.querySelector(".humburger_contactme")
let humburger_testimonial = document.querySelector(".humburger_testimonial")
let navshadow = document.querySelector(".navshadow")
var currentPage = window.location.pathname.split("/").pop();

navhumburger.style.display = "none"


humburger.addEventListener("click", function() {
    if (navhumburger.style.display == "none") {
        navhumburger.style.display = "block";
        navshadow.style.display = "block";
    } else if (navhumburger.style.display == "block") {
        navhumburger.style.display = "none";
        navshadow.style.display = "none";
    }
});

window.addEventListener("resize", function(){
    if (window.innerWidth < 768) {
        navhumburger.style.display = "block";
        navshadow.style.display = "block";
    } else {
        navhumburger.style.display = "none";
        navshadow.style.display = "none";
    }});

    
window.addEventListener("load", sethumburgerstyle);
window.addEventListener("hashchange", sethumburgerstyle);

const style_humburger = {
    "border-radius":"1000px",
    "border":"4px solid #00FFCB",
    "box-shadow":"0 0 60px rgba(0,255,203,.64)",
    "background-color":"#00b38f",
    "color":"white",
}

const style_navbar = {
    "color" : "aqua",
    "background": "linear-gradient(90deg,  white, white)",
    "border":"4px solid aqua",
    "box-sizing": "border-box",
}

function sethumburgerstyle() {
    var currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage == "index.html") {
        Object.assign(humburger_home.style, style_humburger);
        Object.assign(home.style, style_navbar);
    } else if (currentPage == "myproject.html") {
        Object.assign(humburger_myproject.style, style_humburger);
        Object.assign(myproject.style, style_navbar);
    } else if (currentPage == "form.html") {
        Object.assign(humburger_contactme.style, style_humburger);
        Object.assign(contactme.style, style_navbar);
    }  else if (currentPage == "testimonial.html") {
        Object.assign(humburger_testimonial.style, style_humburger);
        Object.assign(testimonials.style, style_navbar);
}}

// Object.assign(nav1_home.style, style_navbar);
// Object.assign(nav1_myproject.style, style_navbar);
// Object.assign(nav_contactme.style, style_navbar);
// Object.assign(nav_testimonial.style, style_navbar);