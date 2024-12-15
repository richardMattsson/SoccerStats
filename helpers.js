let apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";

let urlTeams = `https://api.football-data.org/v4/teams`;

let urlFromLocalStorage =
  urlTeams + `/${localStorage.getItem("favouriteTeamId")};`;
console.log(urlFromLocalStorage);

let asideElement = document.querySelector("#aside");

setFavTeam(urlFromLocalStorage);

function setFavTeam(url) {
  fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      let favouriteDiv = document.createElement("div");
      favouriteDiv.classList.add("favouriteDiv");

      let favTeamLogo = document.createElement("img");
      favTeamLogo.setAttribute("src", result.crest);
      favTeamLogo.classList.add("favTeamLogo");

      let favTeamName = document.createElement("h2");
      favTeamName.textContent = `Jag hejar på ${result.shortName}!`;
      favTeamName.classList.add("favTeamName");

      favouriteDiv.appendChild(favTeamLogo);
      favouriteDiv.appendChild(favTeamName);

      if (url !== "https://api.football-data.org/v4/teams/null;") {
        asideElement.appendChild(favouriteDiv);
      }
    });
}
