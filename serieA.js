// let teamNames = [];
// let numberOfWins = [];
// let numberOfGoals = [];
// let table;
// let a;
// // let statBtn;
// let chartTitle = "";
// let chart;

// let tableDiv = document.querySelector("#tableDiv");
// // const ctx = document.querySelector("#myChart");
// const canvasDiv = document.querySelector("#canvasDiv");
// let showAmountWins = document.querySelector("#amountOfWins");
// let amountOfScores = document.querySelector("#amountOfScores");
// let pShowTable = document.querySelector("#showTable");

// let div = document.createElement("div");
// let p = document.createElement("p");
// const canvas = document.createElement("canvas");
// const chartBtn = document.createElement("button");

// canvas.style.width = "700px";

// function showTeamMembers() {
//   urlTeams = backUpUrlTeams;
//   a.addEventListener("click", (event) => {
//     tableDiv.innerHTML = "";
//     switch (event.target.innerHTML) {
//       case "SSC Napoli":
//         urlTeams = urlTeams + "/113";
//         break;
//       case "Atalanta BC":
//         urlTeams += "/102";
//         break;
//       case "FC Internazionale Milano":
//         urlTeams += "/108";
//         break;
//       case "ACF Fiorentina":
//         urlTeams += "/99";
//         break;
//       case "SS Lazio":
//         urlTeams += "/110";
//         break;
//       case "Juventus FC":
//         urlTeams += "/109";
//         break;
//       case "AC Milan":
//         urlTeams += "/98";
//         break;
//       case "Bologna FC 1909":
//         urlTeams += "/103";
//         break;
//       case "Udinese Calcio":
//         urlTeams += "/115";
//         break;
//       case "Empoli FC":
//         urlTeams += "/445";
//         break;
//       case "Parma Calcio 1913":
//         urlTeams += "/112";
//         break;
//       case "Torino FC":
//         urlTeams += "/586";
//         break;
//       case "Cagliari Calcio":
//         urlTeams += "/104";
//         break;
//       case "Genoa CFC":
//         urlTeams += "/107";
//         break;
//       case "AS Roma":
//         urlTeams += "/100";
//         break;
//       case "US Lecce":
//         urlTeams += "/5890";
//         break;
//       case "Hellas Verona FC":
//         urlTeams += "/450";
//         break;
//       case "Como 1907":
//         urlTeams += "/7397";
//         break;
//       case "AC Monza":
//         urlTeams += "/5911";
//         break;
//       case "Venezia FC":
//         urlTeams += "/454";
//         break;
//     }
//     fetch(urlTeams, {
//       headers: {
//         "X-Auth-Token": apiKey,
//       },
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         let h2 = document.createElement("h2");
//         h2.innerHTML = `${result.name}`;
//         tableDiv.appendChild(h2);
//         let coach = document.createElement("p");
//         coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
//         tableDiv.appendChild(coach);

//         result.squad.forEach((player) => {
//           createAndAppendElements();
//           p.innerHTML = `${player.position}: <strong>${player.name}</strong>.`;
//         });
//       });
//   });
// }
// function drawTable(table) {
//   table.forEach((object) => {
//     a = document.createElement("a");
//     div = document.createElement("div");
//     div.style.border = "1px solid black";
//     a.innerHTML = `${object.team.name}`;
//     div.appendChild(a);
//     tableDiv.appendChild(div);

//     showTeamMembers();
//   });
// }
// function drawChart(chartTitle, labels, data) {
//   Chart.defaults.elements.bar.borderWidth = 2;
//   chart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: chartTitle,
//           data: data,
//           borderWidth: 1,
//           barThickness: 20,
//           backgroundColor: "white",
//           borderColor: "black",
//         },
//       ],
//     },
//     options: {
//       indexAxis: "x",
//       plugins: {
//         legend: {
//           labels: {
//             color: "black",
//           },
//         },
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           ticks: { color: "black" },
//         },
//         x: {
//           grid: {
//             offset: false,
//           },
//           height: "1000px",
//           ticks: { color: "black" },
//         },
//       },
//     },
//   });
// }
// function cleanChart() {
//   tableDiv.innerHTML = "";
//   ctx.style.display = "block";

//   if (chart) {
//     chart.destroy();
//   }
// }
// function cleanDiv() {
//   tableDiv.innerHTML = "";
//   tableDiv.appendChild(chartBtn);
//   ctx.style.display = "none";
//   chartBtn.textContent = "Draw chart";

//   if (teamNames.length > 0) {
//     numberOfGoals = [];
//     numberOfWins = [];
//     teamNames = [];
//   }
// }
// function createAndAppendElements() {
//   div = document.createElement("div");
//   p = document.createElement("p");
//   div.style.border = "1px solid black";
//   div.appendChild(p);
//   tableDiv.appendChild(div);
// }

// pShowTable.addEventListener("click", () => {
//   tableDiv.innerHTML = "";
//   ctx.style.display = "none";

//   fetch(urlStandings, {
//     headers: {
//       "X-Auth-Token": apiKey,
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       drawTable(result.standings[0].table);
//     });
// });

// showAmountWins.addEventListener("click", () => {
//   cleanDiv();

//   fetch(urlStandings, {
//     headers: {
//       "X-Auth-Token": apiKey,
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       table = result.standings[0].table;
//       table.forEach((object) => {
//         teamNames.push(object.team.name);
//         numberOfWins.push(object.won);
//         createAndAppendElements();
//         p.innerHTML = `${object.team.name}. ${object.won} vinster. `;
//       });

//       chartBtn.addEventListener("click", () => {
//         cleanChart();
//         chartTitle = "Antal vinster";
//         drawChart(chartTitle, teamNames, numberOfWins);
//       });
//     });
// });

// amountOfScores.addEventListener("click", () => {
//   cleanDiv();

//   fetch(urlStandings, {
//     headers: {
//       "X-Auth-Token": apiKey,
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       table = result.standings[0].table;
//       table.forEach((object) => {
//         teamNames.push(object.team.name);
//         numberOfGoals.push(object.goalsFor);
//         createAndAppendElements();
//         p.innerHTML = `${object.team.name}. Antal gjorda mål: ${object.goalsFor}. `;
//       });

//       chartBtn.addEventListener("click", () => {
//         cleanChart();
//         chartTitle = "Antal mål";
//         drawChart(chartTitle, teamNames, numberOfGoals);
//       });
//     });
// });
