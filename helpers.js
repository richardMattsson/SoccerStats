let apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";

let urlTeams = `https://api.football-data.org/v4/teams`;

let urlFromSessionStorage =
  urlTeams + `/${sessionStorage.getItem("favouriteTeamId")};`;

console.log(sessionStorage.IsThisFirstTime_Log_From_LiveServer);

let favouriteDiv = document.querySelector(".favouriteDiv");

if (sessionStorage.IsThisFirstTime_Log_From_LiveServer) {
  // favouriteDiv.style.display = "none";
  console.log("hej");
}

setFavTeam(urlFromSessionStorage);

function setFavTeam(url) {
  fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      let favTeamLogo = document.createElement("img");
      favTeamLogo.setAttribute("src", result.crest);
      // favTeamLogo.style.backgroundColor = "white";

      let favTeamName = document.createElement("h2");
      favTeamName.textContent = `Jag hejar på ${result.shortName}!`;

      favouriteDiv.appendChild(favTeamLogo);
      favouriteDiv.appendChild(favTeamName);

      if (sessionStorage.IsThisFirstTime_Log_From_LiveServer === true) {
        favouriteDiv.style.display = "none";
        console.log("hej");
      }
    });
}
