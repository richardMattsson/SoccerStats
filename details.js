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
      numberOfWins.push(object.won);
    });
    // console.log(teamNames, numberOfGoals, numberOfWins);
  });

let anchorCell;
let leagueTable;
let teamLink;
let chartTitle = "";
let chart;
let chartCircle;

let myTable = document.querySelector("#myTable");
let tableHeader = document.querySelector("#tableheader");
// let tableDiv = document.querySelector("#tableDiv");
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

let divElement = document.createElement("div");
let paragraphElement = document.createElement("p");
// const canvas = document.createElement("canvas");
const chartBtn = document.createElement("button");
// let playerDiv = document.querySelector("#playerDiv");
// playerDiv.classList.add("playerDiv");

function showTeamMembers() {
  urlTeams = backUpUrlTeams;

  anchorCell.addEventListener("click", (event) => {
    // if (playerDiv) {
    //   playerDiv.innerHTML = "";
    // }
    thead.innerHTML = "";
    tbody.innerHTML = "";
    urlTeams += `/${event.target.id}`;

    console.log(event.target.id);
    console.log(urlTeams);

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
          // if (playerDiv) {
          //   playerDiv.innerHTML = "";
          // }
          thead.innerHTML = "";
          tbody.innerHTML = "";

          // canvasDiv.style.height = "60vh";
          // canvasDiv.style.width = "900px";
          // canvasDiv.style.height = "400px";

          prepareChartContext();
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
          localStorage.setItem("favouriteTeamId", result.id);
          location.reload();
          // favouriteDiv.style.display = "block";
        });

        // Lägger till lagets tränares namn
        let coach = document.createElement("p");
        coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
        coach.classList.add("coachName");
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
        console.log(result.squad);
        result.squad.forEach((player) => {
          // här lägger jag till data om varje spelare i tabellen
          // let playerId = player.id;
          let playerLink;

          let row = document.createElement("tr");
          let rowData = [player.position, player.name];
          rowData.forEach((data, index) => {
            // här skapar jag td element och lägger in info
            // om varje spelare som ska in i tabellen.
            if (index === 1) {
              let cell = document.createElement("td");
              cell.classList.add("cellteams");

              playerLink = document.createElement("a");
              playerLink.textContent = data;
              // playerLink.setAttribute(
              //   "href",
              //   `details.html?id=${player.id}&name=${player.name}`
              // );
              playerLink.classList.add("tableTeams");
              playerLink.id = player.id;
              playerLink.name = player.name;
              playerLink.position = player.position;

              cell.appendChild(playerLink);
              row.appendChild(cell);
            } else {
              let cell = document.createElement("td");
              cell.textContent = data;
              row.appendChild(cell);
            }
          });
          // jag lägger in raden in i tablebody
          tbody.appendChild(row);

          playerLink.addEventListener("click", (event) => {
            console.log(event.target.id);
            thead.innerHTML = "";
            tbody.innerHTML = "";
            figureArticle.innerHTML = "";
            // playerDiv.style.height = "70vh";
            fetchPlayer(event.target.id);
            console.log(event.target.id);
            // createAndAppendElements();
            // paragraphElement.innerHTML = `${player.position}: <strong>${player.name}</strong>.`;
          });
          // playerLink.addEventListener("click", (event) => {
          //   fetchPlayer(event.target.id)
          // })
        });
      });
  });
}

// const queryString2 = window.location.search;
// const urlParams2 = new URLSearchParams(queryString);
// const playerid = urlParams.get("id");
// console.log(playerid);

function fetchPlayer(id) {
  fetch("https://api.football-data.org/v4/persons/" + id, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
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

      console.log(result.currentTeam.area.flag);
      console.log(result);

      // let name = document.createElement("h1");
      // let number = document.createElement("p");
      // let born = document.createElement("p");
      // let nationality = document.createElement("p");
      // let position = document.createElement("p");
      // name.innerText = result.name;
      // number.innerText = "Number: " + result.shirtNumber;
      // born.innerText = "Born: " + result.dateOfBirth;
      // nationality.innerText = "Nationality: " + result.nationality;
      // position.innerText = "Position: " + result.position;
      // playerDiv.appendChild(name);
      // playerDiv.appendChild(number);
      // playerDiv.appendChild(position);
      // playerDiv.appendChild(born);
      // playerDiv.appendChild(nationality);
      // myTable.appendChild(playerDiv);
    });
}

function drawTable(table) {
  // prepareChartContext();

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

// canvasDiv.style.height = "0vh";
// canvasContext.style.height = "0vh";

fetch(urlStandings, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    drawTable(result.standings[0].table);
  });

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
  // console.log(chart);
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
function prepareChartContext() {
  // tableDiv.innerHTML = "";
  // thead.innerHTML = "";
  // tbody.innerHTML = "";
  canvasContext.style.display = "block";

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
  }
}
function emptyTableAndChart() {
  // tableDiv.innerHTML = "";
  thead.innerHTML = "";
  tbody.innerHTML = "";
  // myTable.appendChild(chartBtn);
  canvasContext.style.display = "none";
  // chartBtn.textContent = "Draw chart";

  if (teamNames.length > 0) {
    numberOfGoals = [];
    numberOfWins = [];
    teamNames = [];
  }
}
// function createAndAppendElements() {
//   divElement = document.createElement("div");
//   paragraphElement = document.createElement("p");
//   divElement.style.border = "1px solid black";

//   divElement.appendChild(paragraphElement);
//   myTable.appendChild(divElement);
// }

pShowTable.addEventListener("click", () => {
  figureArticle.innerHTML = "";
  thead.innerHTML = "";
  tbody.innerHTML = "";
  canvasContext.style.display = "none";
  // canvasDiv.style.height = "0px";
  // if (playerDiv) {
  //   playerDiv.innerHTML = "";
  // }

  fetch(urlStandings, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log(result.standings[0].table);
      drawTable(result.standings[0].table);
    });
});

showAmountWins.addEventListener("click", () => {
  // emptyTableAndChart();
  // if (playerDiv) {
  //   playerDiv.innerHTML = "";
  //   playerDiv.style.height = "0vh";
  // }

  figureArticle.innerHTML = "";
  thead.innerHTML = "";
  tbody.innerHTML = "";
  // playerDiv.style.height = "0px";

  // emptyTableAndChart();

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
    // canvasContext.style.width = "";
  }

  // canvasDiv.style.height = "600px";
  // canvasDiv.style.width = "900px";
  // canvasContext.style.height = "600px";
  // canvasContext.style.width = "900px";

  // if (teamNames.length > 0) {
  //   numberOfGoals = [];
  //   numberOfWins = [];
  //   teamNames = [];
  // }
  // chartBtn.textContent = "Draw chart";
  // chartBtn.classList.add("teamBtn", "btn", "btn-dark");
  // figureArticle.appendChild(chartBtn);

  // fetch(urlStandings, {
  //   headers: {
  //     "X-Auth-Token": apiKey,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     leagueTable = result.standings[0].table;

  // Här skapar jag tableheader för antal vinster i ligan
  // let rowHead = document.createElement("tr");
  // let thData = ["Namn", "Vinster"];

  // thData.forEach((data) => {
  //   let cell = document.createElement("td");
  //   cell.textContent = data;
  //   rowHead.appendChild(cell);
  // });

  // thead.appendChild(rowHead);

  // leagueTable.forEach((object) => {
  //   teamNames.push(object.team.name);
  //   numberOfWins.push(object.won);

  // här lägger jag till data om varje lag i tabellen
  // let row = document.createElement("tr");
  // let rowData = [object.team.name, object.won];
  // rowData.forEach((data) => {
  // här skapar jag td element och lägger in data
  // om varje lag som ska in i tabellen.
  //   let cell = document.createElement("td");
  //   cell.textContent = data;
  //   row.appendChild(cell);
  // });
  // jag lägger in raden in i tablebody
  // tbody.appendChild(row);

  prepareChartContext();
  chartTitle = "Antal vinster per lag.";
  drawChart(chartTitle, teamNames, numberOfWins);
  // chartBtn.addEventListener("click", () => {

  // });
  // });
});

amountOfScores.addEventListener("click", () => {
  // emptyTableAndChart();
  // if (playerDiv) {
  //   playerDiv.innerHTML = "";
  //   playerDiv.style.height = "0vh";
  // }
  figureArticle.innerHTML = "";
  thead.innerHTML = "";
  tbody.innerHTML = "";
  // playerDiv.style.height = "0vh";

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
    // canvasContext.style.width = "";
  }

  // canvasDiv.style.height = "60vh";
  // canvasDiv.style.width = "80vw";

  // canvasContext.style.height = "60vh";
  // canvasContext.style.width = "80vw";

  // fetch(urlStandings, {
  //   headers: {
  //     "X-Auth-Token": apiKey,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     leagueTable = result.standings[0].table;

  //     leagueTable.forEach((object) => {
  //       teamNames.push(object.team.name);
  //       numberOfGoals.push(object.goalsFor);
  //       numberOfWins.push(object.won);
  // createAndAppendElements();
  // paragraphElement.innerHTML = `${object.team.name}. Antal gjorda mål: ${object.goalsFor}. `;
  // });
  prepareChartContext();
  chartTitle = "Antal mål";
  drawChart(chartTitle, teamNames, numberOfGoals);
  // chartBtn.addEventListener("click", () => {

  // });
  // });
});
