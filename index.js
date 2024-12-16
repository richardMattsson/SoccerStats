const premierLeagueIndex = 2;
const championsLeagueIndex = 3;
const ligue1Index = 5;
const bundesligaIndex = 6;
const serieAIndex = 7;
const laLigaIndex = 11;

const urlCompetition = "https://api.football-data.org/v4/competitions";

const homeParagraph = document.querySelector("#subHeader");
const divHome = document.querySelector("#divHome");
const infoText = document.querySelector("#infoText");

let leagueImg;
let leagueImg2;
let leagueLink;
let leagueLink2;

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
    const teams = result.competitions;
    const premier = teams[premierLeagueIndex];
    const champions = teams[championsLeagueIndex];
    const bundes = teams[bundesligaIndex];
    const serA = teams[serieAIndex];
    const laL = teams[laLigaIndex];
    const lig1 = teams[ligue1Index];

    // Nedan sätter jag bild, namn och id på respektive ligas objekt.
    const premierLeague = new League(
      premier.name,
      premier.emblem,
      premier.code
    );
    const championsLeague = new League(
      champions.name,
      champions.emblem,
      champions.code
    );
    const bundesliga = new League(bundes.name, bundes.emblem, bundes.code);
    const serieA = new League(serA.name, serA.emblem, serA.code);
    const laLiga = new League(laL.name, laL.emblem, laL.code);
    const ligue1 = new League(lig1.name, lig1.emblem, lig1.code);

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
  leagueLink.classList.add("leagueLinks");
  leagueLink.setAttribute(
    "href",
    `details.html?league=${league.name}&id=${league.code}&emblem=${league.img}`
  );
  leagueLink2 = document.createElement("a");
  leagueLink2.classList.add("leagueLinks");
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
  const divBackImg = document.createElement("div");
  divBackImg.classList.add("back");
  const divFrontImg = document.createElement("div");
  divFrontImg.classList.add("front");
  // lägger in länkarna i divarna
  divFrontImg.appendChild(leagueLink);
  divBackImg.appendChild(leagueLink2);
  // skapar en yttre div som gör att bilderna och länkarna roterar
  const outerDivForImg = document.createElement("div");
  outerDivForImg.classList.add("flipper");
  // outerDivForImg.appendChild(Link);
  outerDivForImg.appendChild(divFrontImg);
  outerDivForImg.appendChild(divBackImg);
  divHome.appendChild(outerDivForImg);
}
