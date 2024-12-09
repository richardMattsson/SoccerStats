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
