// Store your News API key
const apiKey = "2a715776860348a69293b0483d1727e4";
const newsSection = document.getElementById("news-section");
console.log("new stuff");
var url =
  "https://api.currentsapi.services/v1/latest-news?" +
  "language=us&" +
  "apiKey=C43tW42wb8rWiukhTtALCyRRog30rbbmHHmOwOO9mV-ThHx3";
var req = new Request(url);
fetch(req)
  .then(function (response) {
    console.log(response.json());
  })
  .catch(function (err) {
    console.log(err);
  });

// Make a request to the News API using the API key
console.log("API Key");
function getNews() {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&limit=5&apiKey=2a715776860348a69293b0483d1727e4`;
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Handle the retrieved data from the News API
      console.log(data);
      // Define your variables for the title, description, url, and image
      const title = data.articles[0].title;
      const author = data.articles[0].author;
      const url = data.articles[0].url;
      const newsUrl = `https://newsapi.org/v2/top-headlines?title=${title}&author=${author}&country=US&apiKey=2a715776860348a69293b0483d1727e4`;
      // Update the DOM with the retrieved data
      console.log(title);
      console.log(author);
      console.log(url);
      fetch(newsUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const newsTitle1 = data.articles[0].title;
          const newsTitle2 = data.articles[1].title;
          const newsTitle3 = data.articles[2].title;
          const newsTitle4 = data.articles[3].title;
          const newsTitle5 = data.articles[4].title;
          const url1 = data.articles[0].url;
          const url2 = data.articles[1].url;
          const url3 = data.articles[2].url;
          const url4 = data.articles[3].url;
          const url5 = data.articles[4].url;
          news1.textContent = "" + newsTitle1;
          news2.textContent = "" + newsTitle2;
          news3.textContent = "" + newsTitle3;
          news4.textContent = "" + newsTitle4;
          news5.textContent = "" + newsTitle5;
          news1.href = "" + url1;
          news2.href = "" + url2;
          news3.href = "" + url3;
          news4.href = "" + url4;
          news5.href = "" + url5;
        });
    });
}

getNews();

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
