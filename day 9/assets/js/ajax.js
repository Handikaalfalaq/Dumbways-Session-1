let star0 = document.getElementById("star0");
let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");

const databaseTestimonial = new Promise((resolve, reject) => {
    const xhr  = new XMLHttpRequest()

    xhr.open("GET","https://api.npoint.io/c52691e65aa5d60b79f3", true)

    xhr.onload = function () {
        if ( xhr.status === 200){
            resolve(JSON.parse(xhr.response))
        } else {
            reject("Server Error")
        }
    }
    xhr.send()
})

let style_starnew = {
    "border": "4px solid aqua",
    "background-color": "white",
    "color": "aqua"
}

let style_default0 = {
    "border": star0.style.border,
    "background-color": star0.style.backgroundColor,
    "color": star0.style.color
}

let style_default1 = {
    "border": star1.style.border,
    "background-color": star1.style.backgroundColor,
    "color": star1.style.color
}

let style_default2 = {
    "border": star2.style.border,
    "background-color": star2.style.backgroundColor,
    "color": star2.style.color
}

let style_default3 = {
    "border": star3.style.border,
    "background-color": star3.style.backgroundColor,
    "color": star3.style.color
}

let style_default4 = {
    "border": star4.style.border,
    "background-color": star4.style.backgroundColor,
    "color": star4.style.color
}

let style_default5 = {
    "border": star5.style.border,
    "background-color": star5.style.backgroundColor,
    "color": star5.style.color
}

async function alltestimonial () {
    const responseServer = await databaseTestimonial;

    Object.assign(star1.style, style_default1);
    Object.assign(star2.style, style_default2);
    Object.assign(star3.style, style_default3);
    Object.assign(star4.style, style_default4);
    Object.assign(star5.style, style_default5);
    Object.assign(star0.style, style_starnew); 

    let testimoniHtml = ""
    
    responseServer.forEach((index) => {
        testimoniHtml += `
        <div class="card_testimonial">
            <div class="image" style="background-image: url(${index.image});"></div>
            <div class="quates">${index.comment}</div>
            <div class="author">${index.author}</div>
            <div class="star_testimonial">
                <svg viewBox="0 0 576 512">
                    <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                </svg>
                ${index.rating}
            </div>
        </div>`
    })

    document.getElementById("testimonial").innerHTML = testimoniHtml;

    // console.log(responseServer)
}

alltestimonial()

async function filteringRating(rating) {
    const responseServer = await databaseTestimonial;

    if (rating == 1 ) {
        Object.assign(star1.style, style_starnew);
        Object.assign(star2.style, style_default2);
        Object.assign(star3.style, style_default3);
        Object.assign(star4.style, style_default4);
        Object.assign(star5.style, style_default5);
        Object.assign(star0.style, style_default0);
    } else if (rating == 2 ) {
        Object.assign(star1.style, style_default1);
        Object.assign(star2.style, style_starnew);
        Object.assign(star3.style, style_default3);
        Object.assign(star4.style, style_default4);
        Object.assign(star5.style, style_default5);
        Object.assign(star0.style, style_default0);
    } else if (rating == 3 ) {
        Object.assign(star1.style, style_default1);
        Object.assign(star2.style, style_default2);
        Object.assign(star3.style, style_starnew);
        Object.assign(star4.style, style_default4);
        Object.assign(star5.style, style_default5);
        Object.assign(star0.style, style_default0);
    } else if (rating == 4 ) {
        Object.assign(star1.style, style_default1);
        Object.assign(star2.style, style_default2);
        Object.assign(star3.style, style_default3);
        Object.assign(star4.style, style_starnew);
        Object.assign(star5.style, style_default5);
        Object.assign(star0.style, style_default0);
    } else if (rating == 5 ) {
        Object.assign(star1.style, style_default1);
        Object.assign(star2.style, style_default2);
        Object.assign(star3.style, style_default3);
        Object.assign(star4.style, style_default4);
        Object.assign(star5.style, style_starnew);
        Object.assign(star0.style, style_default0);
    }

    let testimoniHtml = "";

    const testimoniFilter = responseServer.filter((index) => {
        return index.rating === rating
    })

    if (testimoniFilter.length === 0) {
            testimoniHtml = `<div class="card_testimonial">
            <div class="image" style="background-image: url(/assets/img/404.jpg);"></div>
            <div class="quates">Data tidak ada</div>
            <div class="author"></div>
            <div class="star_testimonial"><svg viewBox="0 0 576 512">
                <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                    </svg>
            </div>
        </div>`
    } else {
            testimoniFilter.forEach ((index) => {
                testimoniHtml += `
                <div class="card_testimonial">
                    <div class="image" style="background-image: url(${index.image});"></div>
                    <div class="quates">${index.comment}</div>
                    <div class="author">${index.author}</div>
                    <div class="star_testimonial">
                        <svg viewBox="0 0 576 512">
                            <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                        </svg>
                        ${index.rating}
                    </div>
                </div>`
        })
    }

    document.getElementById("testimonial").innerHTML = testimoniHtml
}