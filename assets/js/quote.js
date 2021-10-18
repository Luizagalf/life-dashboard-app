document.addEventListener("DOMContentLoaded", function(event){
    let Quote = document.getElementById("quote");
        fetch("https://xcom.pro/quotes/api?maxLength=70")
        .then(response => response.json())
        .then(data => {
            let showQuote = '';
            if (data.success && data.quotes.length) {
                let author = '';
                if(data.quotes[0].author.length) {
                    author=
                    ` /<i>${data.quotes[0].author}</i>/`
                }
                showQuote =
                `<div>
                <p class="title is-4">${data.quotes[0].quote}${author}</p>
                </div>`
            }
            Quote.innerHTML = showQuote;
        }).catch(error => {
            if (Quote) {
                Quote.innerHTML =
                `<div>
                <p class="title is-4">Our greatest glory is not in never falling, but in rising every time we fall. <i>/Confucius/</i></p>
                </div>`;
            }
        });
});

