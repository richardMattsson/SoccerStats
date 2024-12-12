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

const params = new URLSearchParams(window.location.search);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const league = urlParams.get("league");
const id = urlParams.get("id");

document.querySelector("#h1Home").innerHTML = league;

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
let tableDiv = document.querySelector("#tableDiv");

let thead = document.querySelector("#myTable thead");
let tbody = document.querySelector("#myTable tbody");

const headerHomePage = document.querySelector("#headerHomePage");
const ctx = document.querySelector("#myChart");
const canvasDiv = document.querySelector("#canvasDiv");
let showAmountWins = document.querySelector("#amountOfWins");
let amountOfScores = document.querySelector("#amountOfScores");
let pShowTable = document.querySelector("#showTable");

let divElement = document.createElement("div");
let paragraphElement = document.createElement("p");
const canvas = document.createElement("canvas");
const chartBtn = document.createElement("button");

function showTeamMembers() {
  urlTeams = backUpUrlTeams;

  anchorCell.addEventListener("click", (event) => {
    tableDiv.innerHTML = "";
    tableheader.innerHTML = "";
    tablebody.innerHTML = "";
    urlTeams += `/${event.target.id}`;

    let dataCircleChart = [
      event.target.won,
      event.target.draw,
      event.target.lost,
    ];
    let labelsCircleChart = ["Vinster", "Oavgjorda", "Förluster"];

    // Knapp rita diagram
    let drawChartBtn = document.createElement("button");
    drawChartBtn.textContent = "Rita diagram";
    drawChartBtn.classList.add("teamBtn");
    tableDiv.appendChild(drawChartBtn);

    drawChartBtn.addEventListener("click", () => {
      tableheader.innerHTML = "";
      tablebody.innerHTML = "";
      tableDiv.innerHTML = "";
      ctx.style.display = "none";
      cleanChart();
      drawChartCircle(event.target.name, labelsCircleChart, dataCircleChart);
    });

    fetch(urlTeams, {
      headers: {
        "X-Auth-Token": apiKey,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Lagets flagga
        let teamLogo = document.createElement("img");
        teamLogo.setAttribute("src", result.crest);
        tableDiv.appendChild(teamLogo);

        // Knapp lägga till favoritlag
        let favouriteBtn = document.createElement("button");
        favouriteBtn.textContent = "Spara som mitt lag";
        favouriteBtn.classList.add("teamBtn");
        tableDiv.appendChild(favouriteBtn);

        // Här lägger jag till en eventlistener som lyssnar efter klick på knappen.
        // Om knappen trycks på sparas laget undan i local storage vilket gör att
        // sidan minns till nästa gång vilket favoritlag användaren har.

        favouriteBtn.addEventListener("click", () => {
          sessionStorage.setItem("favouriteTeamId", result.id);
          location.reload();
          // favouriteDiv.style.display = "block";
        });
        // Lägger till rubrik med lagets namn
        let teamHeader = document.createElement("h2");
        teamHeader.innerHTML = `${result.name}`;
        tableDiv.appendChild(teamHeader);
        // Lägger till lagets tränares namn
        let coach = document.createElement("p");
        coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
        tableDiv.appendChild(coach);
        // Går igenom alla spelare och skriver ut i listan
        result.squad.forEach((player) => {
          createAndAppendElements();
          paragraphElement.innerHTML = `${player.position}: <strong>${player.name}</strong>.`;
        });
      });
  });
}

function drawTable(table) {
  cleanChart();

  let rowHead = document.createElement("tr");
  let thData = ["Position", "Namn", "Vinster", "Oavgjorda", "Förluster"];

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
      JSON.stringify(object.position),
      object.team.name,
      JSON.stringify(object.won),
      JSON.stringify(object.draw),
      JSON.stringify(object.lost),
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
    // jag lägger in raden in i tablebody
    tbody.appendChild(row);

    // divElement = document.createElement("div");
    // divElement.classList.add("tableDiv");

    // divElement.appendChild(teamLink);
    // tableDiv.appendChild(divElement);

    showTeamMembers();
  });
}
function drawChart(chartTitle, labels, data) {
  ctx.style.width = "80vw";
  Chart.defaults.elements.bar.borderWidth = 2;
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartTitle,
          data: data,
          borderWidth: 1,
          barThickness: 20,
          backgroundColor: "white",
          borderColor: "black",
        },
      ],
    },
    options: {
      indexAxis: "x",
      plugins: {
        legend: {
          labels: {
            color: "black",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "black" },
        },
        x: {
          grid: {
            offset: false,
          },
          height: "1000px",
          ticks: { color: "black" },
        },
      },
    },
  });
}
function drawChartCircle(chartTitle, labels, data) {
  ctx.style.width = "40vw";
  chartCircle = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: chartTitle,
          data: data,
          backgroundColor: [
            "rgb(0, 128, 0)", // green
            "rgb(255, 205, 86)", // yellow
            "rgb(255, 99, 132)", // red
          ],
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
            color: "black",
          },
        },
      },
    },
  });
}
function cleanChart() {
  tableDiv.innerHTML = "";
  ctx.style.display = "block";

  if (chart) {
    chart.destroy();
  }
  if (chartCircle) {
    chartCircle.destroy();
  }
}
function cleanDiv() {
  tableDiv.innerHTML = "";
  tableDiv.appendChild(chartBtn);
  ctx.style.display = "none";
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
  tableDiv.appendChild(divElement);
}

pShowTable.addEventListener("click", () => {
  tableheader.innerHTML = "";
  tablebody.innerHTML = "";

  tableDiv.innerHTML = "";
  ctx.style.display = "none";

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
  cleanDiv();
  tableheader.innerHTML = "";
  tablebody.innerHTML = "";

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
        numberOfWins.push(object.won);
        createAndAppendElements();
        paragraphElement.innerHTML = `${object.team.name}. ${object.won} vinster. `;
      });

      chartBtn.addEventListener("click", () => {
        cleanChart();
        chartTitle = "Antal vinster";
        drawChart(chartTitle, teamNames, numberOfWins);
      });
    });
});

amountOfScores.addEventListener("click", () => {
  cleanDiv();
  ctx.style.display = "none";
  tableheader.innerHTML = "";
  tablebody.innerHTML = "";

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
        chartTitle = "Antal mål";
        drawChart(chartTitle, teamNames, numberOfGoals);
      });
    });
});
