document.addEventListener("DOMContentLoaded", function (event) {
    showBooks();
});

let oneBook = document.getElementById("books");

function showBooks() {
    fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&filter=ebooks&langRestrict=en&maxResults=20&startIndex=0')
        .then(response => response.json())
        .then(library => {
            let booksContainer = document.getElementById('books');
            for (let i = 0; i < library.items.length; i++) {
                if (!library.items[i] || !library.items[i].volumeInfo) continue;
                let info = library.items[i].volumeInfo;
                if (info.title && info.authors) {
                    let cover = '';
                    if (info.imageLinks && info.imageLinks.smallThumbnail) {
                        cover = info.imageLinks.smallThumbnail;
                    }
                    let bookElement = document.createElement('div');
                    bookElement.innerHTML =
                        `<div class="book__content">
                            <figure>
                                <img class="book__image" alt="" src="${cover}">
                                <figcaption>
                                    <div class="book__title">${info.title}</div>
                                    <div class="book__author">${info.authors}</div>
                                </figcaption>
                            </figure>
                        </div>`;
                    bookElement.bookInfo = info;
                    bookElement.onclick = function () {
                        showBookInfoPopup(this.bookInfo);
                    };
                    booksContainer.appendChild(bookElement);
                }
            }
            $('.books-carousel').slick({
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                slidesToShow: 4,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
}

function showBookInfoPopup(info) {
    let popup = document.createElement('div');
    popup.id = 'book-info-view';
    popup.className = 'modal opened';
    let description = info.description;
    if (!description) {
        description = `Sorry, there's no description for this book.`
    }
    popup.innerHTML = `
        <div id="openModal" class="modal opened">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${info.title}</h3>
                    <a href="#close" title="Close" class="close">×</a>
                </div>
                <div class="modal-body">    
                    <p class="authors">Author(s): <span class="authors-list">${info.authors}</span></p>
                    <p>${description}</p>
                </div>
                </div>
            </div>
        </div>`;
    popup.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('book-info-view').remove();
    }
    document.body.appendChild(popup);
}