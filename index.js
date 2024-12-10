const premierLeagueIndex = 2;
const championsLeagueIndex = 3;
const ligue1Index = 5;
const bundesligaIndex = 6;
const serieAIndex = 7;
const laLigaIndex = 11;

// Har lagt nedan i helpers som utför åt både index.html och details.html
// Nedan hämtar favoritlaget.

// const apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";
// let urlTeams = `https://api.football-data.org/v4/teams`;

// let valueFromLocalStorage = localStorage.getItem("favouriteTeamId");
// console.log(localStorage.getItem("favouriteTeamId"));

// function setFavTeam(id) {
//   fetch((urlTeams += `/${id}`), {
//     headers: {
//       "X-Auth-Token": apiKey,
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);

//       let favTeamLogo = document.createElement("img");
//       favTeamLogo.setAttribute("src", result.crest);

//       let favTeamName = document.createElement("h2");
//       favTeamName.textContent = `Jag hejar på ${result.shortName}!`;

//       headerHomePage.appendChild(favTeamLogo);
//       headerHomePage.appendChild(favTeamName);
//     });
// }
// setFavTeam(valueFromLocalStorage);

// Test fetch
apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";
let playerId = "";
playerId = "7869";
let urlCompetition = "https://api.football-data.org/v4/competitions";
let urlTest =
  "https://api.football-data.org/v4/persons/16275/matches?e=SUB_OUT&limit=10";
let urlPerson = "https://api.football-data.org/v4/persons/" + playerId;
function test() {
  fetch(urlTest, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}
test();
// ============================================
let homeParagraph = document.querySelector("#pHome");
let leagueImg;
let leagueLink;
const divHome = document.querySelector("#divHome");

let premier = { img: "", name: "", code: "" };
let champions = { img: "", name: "", code: "" };
let bundesliga = { img: "", name: "", code: "" };
let serieA = { img: "", name: "", code: "" };
let laliga = { img: "", name: "", code: "" };
let ligue1 = { img: "", name: "", code: "" };

function getLigueImg() {
  fetch(urlCompetition, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // Nedan sätter jag bild, namn och id på respektive ligas objekt.
      premier.img = result.competitions[premierLeagueIndex].emblem;
      premier.name = result.competitions[premierLeagueIndex].name;
      premier.code = result.competitions[premierLeagueIndex].code;

      champions.img = result.competitions[championsLeagueIndex].emblem;
      champions.name = result.competitions[championsLeagueIndex].name;
      champions.code = result.competitions[championsLeagueIndex].code;

      bundesliga.img = result.competitions[bundesligaIndex].emblem;
      bundesliga.name = result.competitions[bundesligaIndex].name;
      bundesliga.code = result.competitions[bundesligaIndex].code;

      serieA.img = result.competitions[serieAIndex].emblem;
      serieA.name = result.competitions[serieAIndex].name;
      serieA.code = result.competitions[serieAIndex].code;

      laliga.img = result.competitions[laLigaIndex].emblem;
      laliga.name = result.competitions[laLigaIndex].name;
      laliga.code = result.competitions[laLigaIndex].code;

      ligue1.img = result.competitions[ligue1Index].emblem;
      ligue1.name = result.competitions[ligue1Index].name;
      ligue1.code = result.competitions[ligue1Index].code;

      if (result.errorCode === 429) {
        homeParagraph.textContent = `${result.message}...`;
        // jag skapar en bild som fetchas från ett annat api med
        // en random kattbild som visas medans man väntar med
        // ett felmeddelande som säger att man behöver vänta
      }

      //   anropar funktion som hämtar ligans information.
      // skickar med respektive ligas objekt.
      setLigueImg(premier);
      setLigueImg(champions);
      setLigueImg(bundesliga);
      setLigueImg(serieA);
      setLigueImg(laliga);
      setLigueImg(ligue1);
    });
}
getLigueImg();

function setLigueImg(league) {
  // skapar ett länkelement och sätter attributen.
  leagueLink = document.createElement("a");
  leagueLink.classList.add("aHome");
  leagueLink.setAttribute(
    "href",
    `details.html?league=${league.name}&id=${league.code}`
  );
  // skapar bild på respektive ligas loga
  leagueImg = document.createElement("img");
  leagueImg.classList.add("imgHome");
  leagueImg.setAttribute("src", league.img);
  leagueImg.setAttribute("alt", `Bild på ${league.name}s emblem`);
  //  lägger in bilden i länken och lägger länken in i diven i
  //  html-dokumentet
  leagueLink.appendChild(leagueImg);
  divHome.appendChild(leagueLink);
}

// ============================================

// premierLeagueLink.appendChild(leagueImg);
// const ctx = document.getElementById("myChart");
// Chart.defaults.elements.bar.borderWidth = 2;
// let chartBtn = document.querySelector("#chart");
// chartBtn.addEventListener("click", () => {
//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: teamNames,
//       datasets: [
//         {
//           label: "Points",
//           data: tablePosition,
//           borderWidth: 1,
//           barThickness: 10,
//           // backgroundColor: "black",
//           borderColor: "black",
//         },
//       ],
//     },
//     options: {
//       indexAxis: "y",
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//         x: {
//           grid: {
//             offset: true,
//           },
//           height: "1000px",
//           color: "black",
//         },
//       },
//     },
//   });
// });

// let championsBtn = document.querySelector("#clBtn");
// championsBtn.addEventListener("click", () => {
//   let championsLeagueMatches =
//     "https://api.football-data.org/v4/competitions/CL/matches";

//   fetch(championsLeagueMatches, {
//     headers: {
//       "X-Auth-Token": apiKey,
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       let img = document.createElement("img");
//       img.setAttribute("src", result.matches[0].competition.emblem);
//       document.body.appendChild(img);

//       let matches = result.matches;
//       matches.forEach((match) => {
//         if (match.status === "FINISHED") {
//           let pTitle = document.createElement("p");
//           pTitle.style.border = "1px solid black";
//           pTitle.textContent = `Matchday: ${match.matchday}. `;
//           document.body.appendChild(pTitle);
//           let p = document.createElement("p");
//           p.style.border = "1px solid black";
//           p.style.backgroundColor = "lightgreen";
//           p.innerHTML = `<a href="index2.html">${match.homeTeam.name}</a> ${match.score.fullTime.home} - ${match.score.fullTime.away} <a href="index3.html">${match.awayTeam.name}</a>`;
//           document.body.appendChild(p);
//           // console.log(match.score.fullTime.home);
//         }
//       });
//       console.log(result.matches[0].competition.emblem);
//       // console.log(result.matches[0].awayTeam.name);
//     });
// });

// let competitionMatchUrl =
//   "https://api.football-data.org/v4/competitions/2021/matches/";

// fetch(competitionMatchUrl, {
//   headers: {
//     "X-Auth-Token": apiKey,
//   },
// })
//   .then((response) => response.json())
//   .then((result) => {
//     let img = document.createElement("img");
//     let img2 = document.createElement("img");
//     img.setAttribute("src", result.matches[0].homeTeam.crest);
//     img2.setAttribute("src", result.matches[0].awayTeam.crest);
//     console.log(img);
//     document.body.appendChild(img);
//     document.body.appendChild(img2);
//     // console.log(result.matches);
//   });

// fetch(`https://api.football-data.org/v4/competitions`)
//   .then((response) => response.json())
//   .then((result) => console.log(result.competitions));
