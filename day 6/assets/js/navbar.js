let humburger = document.querySelector(".humburger")
let navhumburger = document.querySelector(".navhumburger")
let humburger_home = document.querySelector(".humburger_home") 
let humburger_myproject = document.querySelector(".humburger_myproject") 
let humburger_contactme = document.querySelector(".humburger_contactme")
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

function sethumburgerstyle() {
    var currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage == "index.html") {
        humburger_home.style.setProperty("border-radius", "1000px");
        humburger_home.style.setProperty("border", "4px solid #00FFCB");
        humburger_home.style.setProperty("box-shadow", "0 0 60px rgba(0,255,203,.64)");
        humburger_home.style.setProperty("background-color", "#00b38f");
        humburger_home.style.setProperty("color", "white");
    } else if (currentPage == "myproject.html") {
        humburger_myproject.style.setProperty("border-radius", "1000px");
        humburger_myproject.style.setProperty("border", "4px solid #00FFCB");
        humburger_myproject.style.setProperty("box-shadow", "0 0 60px rgba(0,255,203,.64)");
        humburger_myproject.style.setProperty("background-color", "#00b38f");
        humburger_myproject.style.setProperty("color", "white");
    } else if (currentPage == "form.html") {
        humburger_contactme.style.setProperty("border-radius", "1000px");
        humburger_contactme.style.setProperty("border", "4px solid #00FFCB");
        humburger_contactme.style.setProperty("box-shadow", "0 0 60px rgba(0,255,203,.64)");
        humburger_contactme.style.setProperty("background-color", "#00b38f");
        humburger_contactme.style.setProperty("color", "white");
    }
}






