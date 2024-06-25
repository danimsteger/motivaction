const quotesurl = 'https://api.quotable.io/quotes/random'
fetch(quotesurl)
    .then(function  (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data[0].author);
        console.log(data[0].content);
      });
    