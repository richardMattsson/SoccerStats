let apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";

let urlTeams = `https://api.football-data.org/v4/teams`;

let valueFromLocalStorage = localStorage.getItem("favouriteTeamId");

function setFavTeam(id) {
  fetch((urlTeams += `/${id}`), {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      let favTeamLogo = document.createElement("img");
      favTeamLogo.setAttribute("src", result.crest);

      let favTeamName = document.createElement("h2");
      favTeamName.textContent = `Jag hejar på ${result.shortName}!`;

      headerHomePage.appendChild(favTeamLogo);
      headerHomePage.appendChild(favTeamName);
    });
}
setFavTeam(valueFromLocalStorage);
