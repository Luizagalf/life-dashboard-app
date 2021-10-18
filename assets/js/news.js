const getId = require("./utils");
// const $ = require("jquery");
const carousel = require("owl.carousel");

document.addEventListener("DOMContentLoaded", function (event) {
    showNews();
});

let oneNews = getId("news");
let newsContent = "";

const handleError = () => {
    let newsError = getId("newserror");
    newsError.innerHTML +=
        `<div class="box">
            <h5 class="card-title" style="text-align: center;">Sorry, the server is not available right now :(</h5>
            </div>`;
}

async function showNews() {
    try {
        const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=8c256c8b1b714561ab13048f113bef4f");

        const data = await response.json();
        let amount = Math.round(Math.random() * ((data.articles.length - 8) - 0) + 0);

        if (response.ok === false) {
            handleError();
        }

        for (let i = amount; i < amount + 5; i++) {
            if (data.articles[i].title && data.articles[i].description) {
                newsContent +=
                    `<div class="item">
                    <a href="${data.articles[i].url}"><p class="title is-4">${data.articles[i].title}</p>
                        <p>${data.articles[i].description}</p></a>
                            <figure class="image" >
                                <img alt="" src="${data.articles[i].urlToImage}">
                            </figure>
                    </div>`
            }
        }
        oneNews.innerHTML = newsContent;
        $(".owl-carousel").owlCarousel({
            loop: true,
            items: 1,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 7000,
            autoplayHoverPause: true,
            dots: false,
            nav: false
        });

    } catch (error) {
        handleError();
    }
}

module.exports = showNews