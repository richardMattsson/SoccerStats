const premierLeagueIndex = 2;
const championsLeagueIndex = 3;
const ligue1Index = 5;
const bundesligaIndex = 6;
const serieAIndex = 7;
const laLigaIndex = 11;

let playerId = "";
playerId = "7869";
let urlCompetition = "https://api.football-data.org/v4/competitions";

// Test fetch
let urlChampionsLeagueMatches =
  "https://api.football-data.org/v4/competitions/CL/matches";
let urlTest = "https://api.football-data.org/v4/competitions/PL/matches";
let urlPerson = "https://api.football-data.org/v4/persons/";
function test() {
  fetch(urlChampionsLeagueMatches, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.matches);
      let matches = result.matches;
      matches.forEach((element) => {
        if (element.status === "TIMED") {
          if (element.matchday === 7) {
            console.log(
              `${element.homeTeam.name} vs. ${element.awayTeam.name}`
            );
          }
          // console.log(element.matchday);
        }
        // console.log(element.status);
      });
    });
}
// test();

// ============================================

let homeParagraph = document.querySelector("#pHome");

let leagueImg;
let leagueImg2;
let leagueLink;
let leagueLink2;
const divHome = document.querySelector("#divHome");
let infoText = document.querySelector("#infoText");

// Här skapar jag en funktion som skapar objektstrukturen för ligornas innehåll.
function League(name, emblem, code) {
  this.name = name;
  this.img = emblem;
  this.code = code;
}

fetch(urlCompetition, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    let teams = result.competitions;

    let premier = teams[premierLeagueIndex];
    let champions = teams[championsLeagueIndex];
    let bundes = teams[bundesligaIndex];
    let serA = teams[serieAIndex];
    let laL = teams[laLigaIndex];
    let lig1 = teams[ligue1Index];

    // Nedan sätter jag bild, namn och id på respektive ligas objekt.
    let premierLeague = new League(premier.name, premier.emblem, premier.code);
    let championsLeague = new League(
      champions.name,
      champions.emblem,
      champions.code
    );
    let bundesliga = new League(bundes.name, bundes.emblem, bundes.code);
    let serieA = new League(serA.name, serA.emblem, serA.code);
    let laLiga = new League(laL.name, laL.emblem, laL.code);
    let ligue1 = new League(lig1.name, lig1.emblem, lig1.code);

    // detta skickar ett felmeddelande ifall fetchen inte går igenom.
    if (result.errorCode === 429) {
      infoText.textContent = `${result.message}...`;
    }
    //  anropar funktion som hämtar ligans information.
    // skickar med respektive ligas objekt.
    setLigueImg(premierLeague);
    setLigueImg(championsLeague);
    setLigueImg(bundesliga);
    setLigueImg(serieA);
    setLigueImg(laLiga);
    setLigueImg(ligue1);
  });

function setLigueImg(league) {
  // skapar länkelement och skickar med info till nästa sida
  leagueLink = document.createElement("a");
  leagueLink.classList.add("aHome");
  leagueLink.setAttribute(
    "href",
    `details.html?league=${league.name}&id=${league.code}&emblem=${league.img}`
  );
  leagueLink2 = document.createElement("a");
  leagueLink2.classList.add("aHome");
  leagueLink2.setAttribute(
    "href",
    `details.html?league=${league.name}&id=${league.code}&emblem=${league.img}`
  );
  // skapar bild på respektive ligas loga
  leagueImg = document.createElement("img");
  leagueImg.classList.add("imgLeagueHome");
  leagueImg.setAttribute("src", league.img);
  leagueImg.setAttribute("alt", `Bild på ${league.name}s emblem`);
  leagueImg.style.backgroundColor = "white";

  leagueImg2 = document.createElement("img");
  leagueImg2.classList.add("imgLeagueHome");
  leagueImg2.setAttribute("src", league.img);
  leagueImg2.setAttribute("alt", `Bild på ${league.name}s emblem`);
  leagueImg2.style.backgroundColor = "white";

  // lägger in bilderna in i länkarna
  leagueLink.appendChild(leagueImg);
  leagueLink2.appendChild(leagueImg2);

  // skapar en fram och baksida div till bilderna
  let divBackImg = document.createElement("div");
  divBackImg.classList.add("back");
  let divFrontImg = document.createElement("div");
  divFrontImg.classList.add("front");
  // lägger in länkarna i divarna
  divFrontImg.appendChild(leagueLink);
  divBackImg.appendChild(leagueLink2);
  // skapar en yttre div som gör att bilderna och länkarna roterar
  let outerDivForImg = document.createElement("div");
  outerDivForImg.classList.add("flipper");
  // outerDivForImg.appendChild(Link);
  outerDivForImg.appendChild(divFrontImg);
  outerDivForImg.appendChild(divBackImg);
  divHome.appendChild(outerDivForImg);
}

// ============================================

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
//
//           pTitle.textContent = `Matchday: ${match.matchday}. `;
//           document.body.appendChild(pTitle);

//           let p = document.createElement("p");
//
//
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
