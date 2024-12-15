// Jag hämtar informationen från länkarna från startsidan
// där information om den valda ligans id, namn och logga skickas med.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const league = urlParams.get("league");
const id = urlParams.get("id");
const emblem = urlParams.get("emblem");
document.querySelector("#h1Home").innerHTML = league;
document.querySelector("#imgLeagueLogo").src = emblem;

let urlStandings = `https://api.football-data.org/v4/competitions/${id}/standings`;
let backUpStanding = `https://api.football-data.org/v4/competitions/${id}/standings`;
let urlMatches = `https://api.football-data.org/v4/competitions/${id}/matches`;
let backUpUrlTeams = `https://api.football-data.org/v4/teams`;

// De här arrayerna är till för data till chart.
let teamNames = [];
let numberOfWins = [];
let numberOfGoals = [];

let matches = {};
let matchesArray = [];
let teamName;
let playerName;
let leagueTable;
let leagueInfo;
let teamLink;
let chartTitle = "";
let chart;
let chartCircle;

let myTable = document.querySelector("#myTable");
let tableHeader = document.querySelector("#tableheader");
let main = document.querySelector("#main");
let figureArticle = document.querySelector("#figureArticle");

let thead = document.querySelector("#myTable thead");
let tbody = document.querySelector("#myTable tbody");

const headerHomePage = document.querySelector("#headerHomePage");
const canvasContext = document.querySelector("#canvasContext");
const canvasDiv = document.querySelector("#canvasDiv");
let showAmountWins = document.querySelector("#amountOfWins");
let amountOfScores = document.querySelector("#amountOfScores");
let pShowTable = document.querySelector("#showTable");
let showMatches = document.querySelector("#showMatches");

let divElement = document.createElement("div");
let paragraphElement = document.createElement("p");
const chartBtn = document.createElement("button");

// Denna fetch körs direkt när sidan öppnas och ropar på
// funktionen drawtable för att rita upp tabellen.
fetch(urlStandings, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result.errorCode);
    leagueInfo = result.standings[0].table;
    drawTable(leagueInfo);

    leagueInfo.forEach((object) => {
      teamNames.push(object.team.name);
      numberOfGoals.push(object.goalsFor);
      numberOfWins.push(object.won);
    });
  });

// fetchar kommande matcher från ligan
fetch(urlMatches, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    let games = result.matches;
    let arrayOfUpComingMatches = [];
    games.forEach((game) => {
      if (game.status === "TIMED") {
        arrayOfUpComingMatches.push(game);
      }
    });
    let minMatch = Math.min(
      ...arrayOfUpComingMatches.map((match) => match.matchday)
    );
    let nextMatches = arrayOfUpComingMatches.filter(
      (match) => match.matchday === minMatch
    );
    nextMatches.forEach((game) => {
      let date = game.utcDate;
      let formattedDate = date.replace("T", " ").replace(":00Z", "");
      matchesArray.push({
        date: formattedDate,
        matchday: game.matchday,
        homeTeam: game.homeTeam.name,
        awayTeam: game.awayTeam.name,
      });
    });
  });

function showTeamMembers() {
  urlTeams = backUpUrlTeams;

  teamName.addEventListener("click", (event) => {
    // Förbereder tabellen genom att ta bort tidigare tabeller.
    emptyTableAndChart();
    urlTeams += `/${event.target.id}`;

    fetch(urlTeams, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Lägger till rubrik med lagets namn
        setTitle(result.name);
        // Lagets flagga / logo
        let teamLogo = document.createElement("img");
        teamLogo.setAttribute("src", result.crest);
        teamLogo.classList.add("favTeamLogo");
        figureArticle.appendChild(teamLogo);

        // Knapp rita diagram
        let drawChartBtn = document.createElement("button");
        drawChartBtn.textContent = "Rita diagram";
        drawChartBtn.classList.add("teamBtn", "btn", "btn-dark");
        // figureArticle.appendChild(drawChartBtn);

        // Knapp lägga till favoritlag
        let favouriteBtn = document.createElement("button");
        favouriteBtn.textContent = "Spara som mitt lag";
        favouriteBtn.classList.add("teamBtn", "btn", "btn-dark");
        //  figureArticle.appendChild(favouriteBtn);

        // Lägger in knapparna i en div för att
        // kunna placeras som jag vill.
        let divButtons = document.createElement("div");
        divButtons.appendChild(drawChartBtn);
        divButtons.appendChild(favouriteBtn);
        divButtons.classList.add("divButtons");
        figureArticle.appendChild(divButtons);

        // Skapar info som ska in i cirkeldiagrammet.
        let labelsCircleChart = ["Vinster", "Oavgjorda", "Förluster"];
        let dataCircleChart = [
          event.target.won,
          event.target.draw,
          event.target.lost,
        ];

        // Lyssnar efter klick som skapar cirkel-diagram.
        drawChartBtn.addEventListener("click", () => {
          // Förebereder diagrammet genom att ta bort tidigare tabeller
          // och rensa canvas för att rita upp nytt diagram.
          emptyTableAndChart();
          prepareChartContext();

          drawChartCircle(
            event.target.name,
            labelsCircleChart,
            dataCircleChart
          );
        });

        // Denna lyssnare sparar undan favoritlaget i localstorage
        // och laddar samtidigt om sidan för att uppdatera lagets flagga på sidan.
        favouriteBtn.addEventListener("click", () => {
          localStorage.setItem("favouriteTeamId", result.id);
          location.reload();
        });

        // Lägger till lagets tränares namn
        let coach = document.createElement("p");
        coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
        coach.classList.add("coachName");
        figureArticle.appendChild(coach);

        // Här skapar jag tableheader för tabellens struktur
        let rowHead = document.createElement("tr");
        let thData = ["Position", "Namn"];

        thData.forEach((data) => {
          let cell = document.createElement("th");
          cell.textContent = data;
          rowHead.appendChild(cell);
        });

        thead.appendChild(rowHead);

        result.squad.forEach((player) => {
          // här lägger jag till data om varje spelare i tabellen
          // let playerId = player.id;

          let row = document.createElement("tr");
          let rowData = [player.position, player.name];
          rowData.forEach((data, index) => {
            // här lägger jag in inforamtion
            // om varje spelare som ska in i tabellen.
            // På första index med spelarens namn
            // lägger jag till attribut som används för
            // senare fetch om spelarna.
            if (index === 1) {
              playerName = document.createElement("td");
              playerName.classList.add("cellTeams");
              playerName.textContent = data;
              playerName.classList.add("tableTeams");
              playerName.id = player.id;
              playerName.name = player.name;
              playerName.position = player.position;
              row.appendChild(playerName);
            } else {
              let cell = document.createElement("td");
              cell.textContent = data;
              row.appendChild(cell);
            }
          });
          // jag lägger in raden in i tablebody
          tbody.appendChild(row);

          // jag lägger in i lyssnare efter klick på spelaren
          // och visar ytterligare information.
          playerName.addEventListener("click", (event) => {
            thead.innerHTML = "";
            tbody.innerHTML = "";
            figureArticle.innerHTML = "";
            // jag anropar funktion och skickar med eventet för info om spelarens id.
            playerInfo(event.target.id);
          });
        });
      });
  });
}
function playerInfo(id) {
  fetch("https://api.football-data.org/v4/persons/" + id, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // skapar en liten tabell med info om spelaren.
      let rowHead = document.createElement("tr");
      let thData = ["Namn", "Nummer", "Position", "Född", "Nationalitet"];

      thData.forEach((data) => {
        let cell = document.createElement("th");
        cell.textContent = data;
        rowHead.appendChild(cell);
      });

      thead.appendChild(rowHead);

      let row = document.createElement("tr");
      let rowData = [
        result.name,
        result.shirtNumber,
        result.position,
        result.dateOfBirth,
        result.nationality,
      ];

      rowData.forEach((data) => {
        let cell = document.createElement("td");
        cell.textContent = data;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
}
function drawTable(table) {
  let rowHead = document.createElement("tr");
  let thData = [
    "Position",
    "Namn",
    "Matcher",
    "Vinster",
    "Oavgjorda",
    "Förluster",
    "Gjorda mål",
    "Insläppta mål",
  ];

  thData.forEach((data) => {
    let cell = document.createElement("th");
    cell.textContent = data;
    rowHead.appendChild(cell);
  });

  thead.appendChild(rowHead);

  table.forEach((object) => {
    // skapar en tabell över ligan med lite statistik.
    let row = document.createElement("tr");
    let rowData = [
      object.position,
      object.team.name,
      object.playedGames,
      object.won,
      object.draw,
      object.lost,
      object.goalsFor,
      object.goalsAgainst,
    ];

    rowData.forEach((data, index) => {
      if (index === 1) {
        // skapar celler med data om laget som ska in i tabellen.
        // Det ska gå att klicka på lagnamnet för att få mer info.
        // jag skickar därför med attribut i lagnamnet till nästa fetch.
        teamName = document.createElement("td");
        teamName.classList.add("cellTeams");
        teamName.classList.add("tableTeams");
        teamName.textContent = data;
        teamName.id = object.team.id;
        teamName.name = object.team.name;
        teamName.won = object.won;
        teamName.draw = object.draw;
        teamName.lost = object.lost;

        row.appendChild(teamName);
      }
      // på resterande index lägger jag in endast datan.
      else {
        let cell = document.createElement("td");
        cell.textContent = data;
        row.appendChild(cell);
      }
    });
    // jag lägger in samtliga rader i tablebody
    tbody.appendChild(row);
    // ropar på funktionen showTeamMembers
    showTeamMembers();
  });
}
function drawChart(chartTitle, labels, data) {
  Chart.defaults.elements.bar.borderWidth = 2;
  chart = new Chart(canvasContext, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartTitle,
          data: data,
          borderWidth: 1,
          barThickness: 20,
          backgroundColor: "lightgrey",
          borderColor: "black",
        },
      ],
    },
    options: {
      indexAxis: "x",
      plugins: {
        legend: {
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "white" },
        },
        x: {
          grid: {
            offset: false,
          },
          height: "1000px",
          ticks: { color: "white" },
        },
      },
    },
  });
}
function drawChartCircle(chartTitle, labels, data) {
  // canvasContext.style.width = "40vw";
  chartCircle = new Chart(canvasContext, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartTitle,
          data: data,
          backgroundColor: ["green", "yellow", "red"],
        },
      ],
    },
    labels: ["Red", "Yellow", "Blue"],
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16,
            },
            color: "white",
          },
        },
      },
    },
  });
}
// Nedan funktion ritar upp en titel.
function setTitle(name) {
  let title = document.createElement("h2");
  title.innerHTML = name;
  title.style.textAlign = "center";
  figureArticle.appendChild(title);
}
// Nedan funktion förbereder chart genom att visa canvas div
// och ta bort tidigare chart på sidan.
function prepareChartContext() {
  canvasContext.style.display = "block";

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
  }
}
// Nedan funktion tömmer tidigare tabeller och döljer eventuell chart.
function emptyTableAndChart() {
  figureArticle.innerHTML = "";
  thead.innerHTML = "";
  tbody.innerHTML = "";
  canvasContext.style.display = "none";
}

pShowTable.addEventListener("click", () => {
  // rensar tidigare tabeller och chart samt
  // ropar på funktionen som ritar upp tabellen.
  emptyTableAndChart();
  drawTable(leagueInfo);
});
showMatches.addEventListener("click", () => {
  // Tömmer tidigare tabeller och chart samt
  // förbereder canvas så den är töm för ny chart
  emptyTableAndChart();
  setTitle(`Matchdag: ${matchesArray[0].matchday}`);

  let rowHead = document.createElement("tr");
  let thData = ["Hemmalag", "Datum", "Bortalag"];

  thData.forEach((data) => {
    let cell = document.createElement("th");
    cell.textContent = data;
    rowHead.appendChild(cell);
  });
  thead.appendChild(rowHead);

  matchesArray.forEach((match) => {
    let row = document.createElement("tr");
    let rowData = [match.homeTeam, match.date, match.awayTeam];

    rowData.forEach((data) => {
      let cell = document.createElement("td");
      cell.textContent = data;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
});
showAmountWins.addEventListener("click", () => {
  // Tömmer tidigare tabeller och chart samt
  // förbereder canvas så den är töm för ny chart
  emptyTableAndChart();
  prepareChartContext();

  // Anropar funtion som ritar upp diagram och skickar med data.
  chartTitle = "Antal vinster per lag.";
  drawChart(chartTitle, teamNames, numberOfWins);
});
amountOfScores.addEventListener("click", () => {
  // Tömmer tidigare tabeller och chart samt
  // förbereder canvas så den är töm för ny chart
  emptyTableAndChart();
  prepareChartContext();

  // Anropar funtion som ritar upp diagram och skickar med data.
  chartTitle = "Antal mål";
  drawChart(chartTitle, teamNames, numberOfGoals);
});
