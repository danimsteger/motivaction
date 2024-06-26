const quotesurl = 'https://api.quotable.io/quotes/random'
const quote = document.getElementById('quote')
const author = document.getElementById('author')
const quotebtn = document.getElementById('quotebtn')

fetch(quotesurl)
    .then(function  (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data[0].author);
        console.log(data[0].content);
        const contentdata = data[0].content
        const authordata= data[0].author
        quote.textContent = '"' + contentdata + '"'
        author.textContent = "-" + authordata
        
      })

quotebtn.addEventListener('click',() => {
fetch(quotesurl)
    .then(function  (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data[0].author);
        console.log(data[0].content);
        const contentdata = data[0].content
        const authordata= data[0].author
        quote.textContent = '"' + contentdata + '"'
        author.textContent = "-" + authordata
        
      })
    })
     
    