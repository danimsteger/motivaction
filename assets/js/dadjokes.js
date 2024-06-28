const jokesUrl = "https://icanhazdadjoke.com/slack";
const jokes = document.getElementById("jokes-line");
const jokesButton = document.getElementById("jokes-button");

fetch(jokesUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.attachments[0].text);
    const jokesdata = data.attachments[0].text;
    jokes.textContent = jokesdata;
  });

jokesButton.addEventListener("click", () => {
  fetch(jokesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.attachments[0].text);
      const jokesdata = data.attachments[0].text;
      jokes.textContent = jokesdata;
    });
});
