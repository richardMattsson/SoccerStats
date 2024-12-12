// const apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";
let testUrl = "https://api.football-data.org/v4/competitions/PD/standings";
function test(url) {
  fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const league = urlParams.get("league");
const id = urlParams.get("id");
const emblem = urlParams.get("emblem");
console.log(id);

document.querySelector("#h1Home").innerHTML = league;
document.querySelector("#imgLeagueLogo").src = emblem;

let urlStandings = `https://api.football-data.org/v4/competitions/${id}/standings`;
let backUpStanding = `https://api.football-data.org/v4/competitions/${id}/standings`;

// let urlTeams = `https://api.football-data.org/v4/teams`;
let backUpUrlTeams = `https://api.football-data.org/v4/teams`;

// De här arrayerna är till för data till chart.
let teamNames = [];
let numberOfWins = [];
let numberOfGoals = [];

let anchorCell;

let leagueTable;
let teamLink;
let chartTitle = "";
let chart;
let chartCircle;

let myTable = document.querySelector("#myTable");
let tableHeader = document.querySelector("#tableheader");
let tableDiv = document.querySelector("#tableDiv");
let main = document.querySelector("#main");
let figureArticle = document.querySelector("#figureArticle");

let thead = document.querySelector("#myTable thead");
let tbody = document.querySelector("#myTable tbody");

const headerHomePage = document.querySelector("#headerHomePage");
const canvasContext = document.querySelector("#myChart");
canvasContext.classList.add("canvas");
const canvasDiv = document.querySelector("#canvasDiv");
let showAmountWins = document.querySelector("#amountOfWins");
let amountOfScores = document.querySelector("#amountOfScores");
let pShowTable = document.querySelector("#showTable");

let divElement = document.createElement("div");
let paragraphElement = document.createElement("p");
// const canvas = document.createElement("canvas");
const chartBtn = document.createElement("button");

function showTeamMembers() {
  urlTeams = backUpUrlTeams;

  anchorCell.addEventListener("click", (event) => {
    // tableDiv.innerHTML = "";
    tableHeader.innerHTML = "";
    tbody.innerHTML = "";
    urlTeams += `/${event.target.id}`;

    console.log(event.target.id);

    fetch(urlTeams, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Lägger till rubrik med lagets namn
        let teamHeader = document.createElement("h2");
        teamHeader.innerHTML = `${result.name}`;
        teamHeader.style.textAlign = "center";
        figureArticle.appendChild(teamHeader);
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

        // Lyssnar efter klick och skapar då ett diagram.
        drawChartBtn.addEventListener("click", () => {
          tableHeader.innerHTML = "";
          tablebody.innerHTML = "";
          // figureArticle.innerHTML = "";
          // tableDiv.innerHTML = "";
          canvasContext.style.display = "none";
          cleanChart();
          drawChartCircle(
            event.target.name,
            labelsCircleChart,
            dataCircleChart
          );
        });

        // Här lägger jag till en eventlistener som lyssnar efter klick på knappen.
        // Om knappen trycks på sparas laget undan i local storage vilket gör att
        // sidan minns till nästa gång vilket favoritlag användaren har.

        favouriteBtn.addEventListener("click", () => {
          sessionStorage.setItem("favouriteTeamId", result.id);
          location.reload();
          // favouriteDiv.style.display = "block";
        });

        // Lägger till lagets tränares namn
        let coach = document.createElement("p");
        coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
        coach.classList.add("coachName");
        // coach.style.textAlign = "center";
        // coach.style.marginTop = "10px";
        figureArticle.appendChild(coach);
        // Går igenom alla spelare och skriver ut i listan

        // Här skapar jag tableheader för tabellens struktur
        let rowHead = document.createElement("tr");
        let thData = ["Position", "Namn"];

        thData.forEach((data) => {
          let cell = document.createElement("td");
          cell.textContent = data;
          rowHead.appendChild(cell);
        });

        thead.appendChild(rowHead);

        result.squad.forEach((player) => {
          // här lägger jag till data om varje lag i tabellen
          let row = document.createElement("tr");
          let rowData = [player.position, player.name];
          rowData.forEach((data) => {
            // här skapar jag td element och lägger in info
            // om varje spelare som ska in i tabellen.
            let cell = document.createElement("td");
            cell.textContent = data;
            row.appendChild(cell);
          });
          // jag lägger in raden in i tablebody
          tbody.appendChild(row);

          // createAndAppendElements();
          // paragraphElement.innerHTML = `${player.position}: <strong>${player.name}</strong>.`;
        });
      });
  });
}

function drawTable(table) {
  cleanChart();

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
    // teamLink = document.createElement("a");
    // teamLink.innerHTML = `${object.position} | ${object.team.name} | Vinster: ${object.won} | Oavgjorda: ${object.draw} | Förluster: ${object.lost}`;
    // teamLink.id = `${object.team.id}`;
    // teamLink.name = object.team.name;
    // teamLink.won = object.won;
    // teamLink.draw = object.draw;
    // teamLink.lost = object.lost;

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
        // skapar celler med data om laget som ska in
        // i tabellen.
        let cell = document.createElement("td");
        cell.classList.add("cellTeams");
        // Jag vill att namnet på klubben ska gå att
        // klicka sig vidare på så därför skapar jag
        // ett länk-element när index är 1 i rowData.
        anchorCell = document.createElement("a");
        anchorCell.textContent = data;
        anchorCell.classList.add("tableTeams");
        anchorCell.id = object.team.id;
        anchorCell.name = object.team.name;
        anchorCell.won = object.won;
        anchorCell.draw = object.draw;
        anchorCell.lost = object.lost;

        cell.appendChild(anchorCell);
        row.appendChild(cell);
      }
      // här skapar jag td element och lägger in data
      // om varje lag som ska in i tabellen.
      else {
        let cell = document.createElement("td");
        cell.textContent = data;
        row.appendChild(cell);
      }
    });
    // jag lägger in raden in i tbody
    tbody.appendChild(row);

    // divElement = document.createElement("div");
    // divElement.classList.add("tableDiv");

    // divElement.appendChild(teamLink);
    // tableDiv.appendChild(divElement);

    showTeamMembers();
  });
}

fetch(urlStandings, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result.standings[0].table);
    drawTable(result.standings[0].table);
  });

function drawChart(chartTitle, labels, data) {
  canvasContext.style.width = "80vw";
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
      indexAxis: "y",
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
  canvasContext.style.width = "40vw";
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
function cleanChart() {
  // tableDiv.innerHTML = "";
  tableHeader.innerHTML = "";
  tbody.innerHTML = "";
  canvasContext.style.display = "block";

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
  }
}
function cleanDiv() {
  // tableDiv.innerHTML = "";
  tableHeader.innerHTML = "";
  tbody.innerHTML = "";
  myTable.appendChild(chartBtn);
  canvasContext.style.display = "none";
  chartBtn.textContent = "Draw chart";

  if (teamNames.length > 0) {
    numberOfGoals = [];
    numberOfWins = [];
    teamNames = [];
  }
}
function createAndAppendElements() {
  divElement = document.createElement("div");
  paragraphElement = document.createElement("p");
  divElement.style.border = "1px solid black";

  divElement.appendChild(paragraphElement);
  myTable.appendChild(divElement);
}

pShowTable.addEventListener("click", () => {
  figureArticle.innerHTML = "";
  tableHeader.innerHTML = "";
  tbody.innerHTML = "";

  // tableDiv.innerHTML = "";

  canvasContext.style.display = "none";

  fetch(urlStandings, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.standings[0].table);
      drawTable(result.standings[0].table);
    });
});

showAmountWins.addEventListener("click", () => {
  cleanChart();
  figureArticle.innerHTML = "";
  // cleanDiv();
  canvasContext.style.display = "none";

  if (teamNames.length > 0) {
    numberOfGoals = [];
    numberOfWins = [];
    teamNames = [];
  }
  chartBtn.textContent = "Draw chart";
  chartBtn.classList.add("teamBtn", "btn", "btn-dark");
  figureArticle.appendChild(chartBtn);

  fetch(urlStandings, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      leagueTable = result.standings[0].table;

      // Här skapar jag tableheader för antal vinster i ligan
      let rowHead = document.createElement("tr");
      let thData = ["Namn", "Vinster"];

      thData.forEach((data) => {
        let cell = document.createElement("td");
        cell.textContent = data;
        rowHead.appendChild(cell);
      });

      thead.appendChild(rowHead);

      leagueTable.forEach((object) => {
        teamNames.push(object.team.name);
        numberOfWins.push(object.won);

        // här lägger jag till data om varje lag i tabellen
        let row = document.createElement("tr");
        let rowData = [object.team.name, object.won];
        rowData.forEach((data) => {
          // här skapar jag td element och lägger in data
          // om varje lag som ska in i tabellen.
          let cell = document.createElement("td");
          cell.textContent = data;
          row.appendChild(cell);
        });
        // jag lägger in raden in i tablebody
        tbody.appendChild(row);

        // createAndAppendElements();
        // paragraphElement.innerHTML = `${object.team.name}. ${object.won} vinster. `;
      });

      chartBtn.addEventListener("click", () => {
        cleanChart();
        chartTitle = "Antal vinster per lag i ligan.";
        drawChart(chartTitle, teamNames, numberOfWins);
      });
    });
});

amountOfScores.addEventListener("click", () => {
  cleanDiv();
  canvasContext.style.display = "none";
  // tableheader.innerHTML = "";
  // tablebody.innerHTML = "";

  fetch(urlStandings, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      leagueTable = result.standings[0].table;
      leagueTable.forEach((object) => {
        teamNames.push(object.team.name);
        numberOfGoals.push(object.goalsFor);
        createAndAppendElements();
        paragraphElement.innerHTML = `${object.team.name}. Antal gjorda mål: ${object.goalsFor}. `;
      });

      chartBtn.addEventListener("click", () => {
        cleanChart();
        tableHeader.innerHTML = "";
        tablebody.innerHTML = "";
        chartTitle = "Antal mål";
        drawChart(chartTitle, teamNames, numberOfGoals);
      });
    });
});
