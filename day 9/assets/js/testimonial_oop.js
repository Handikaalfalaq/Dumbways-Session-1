class Blog {
    constructor(image, quates, author) {
        this._image = image;
        this._quates = quates;
        this._author = author;
    }

    // getter 
    get image() {
        return this._image
    }

    get quates() {
        return this._quates
    }

    get author() {
        return this._author
    }

    // setter
    set image(image) {
        this._image = image;
    }

    set quates(quates) {
        this._quates = quates;
    }

    set author(author) {
        this._author = author;
    }

    displayBlog() {
        return `
        <div class="card_testimonial">
            <div class="image" style="background-image: url(${this._image});"></div>
            <div class="quates">"${this._quates}"</div>
            <div class="author"> - ${this._author}</div>
        </div>`
    }
}

const data1 = new Blog (
    "/assets/img/ai.jpg",
    "selalu berada di garis depan teknologi, menciptakan solusi canggih yang memudahkan hidup.",
    "Artificial Intelligence"
)

const data2 = new Blog (
    "/assets/img/anonymous.jpg",
    "teruslah mengubah dunia tanpa menampilkan fisikmu.",
    "Anonymous"
    )

const data3 = new Blog (
    "/assets/img/jarvis.jpg",
    "Kehebatan Anda tidak dapat diukur oleh teknologi apa pun, dan tidak ada yang mustahil untuk anda.",
    "J.a.r.v.i.s"
)

const data4 = new Blog (
    "/assets/img/optimusprime.jpg",
    "Kebebasan adalah hak semua makhluk yang merdeka.",
    "Optimus Prime"
)

let blogs = [data1, data2, data3, data4];
let testimonial = document.querySelector(".testimonial");

for (let i = 0; i < blogs.length; i++) {
    testimonial.innerHTML += blogs[i].displayBlog();
}



