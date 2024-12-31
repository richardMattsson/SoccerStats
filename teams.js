showTeamMembers();
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
        const teamLogo = document.createElement("img");
        teamLogo.setAttribute("src", result.crest);
        teamLogo.classList.add("favTeamLogo");
        figureArticle.appendChild(teamLogo);

        // Knapp rita diagram
        const drawChartBtn = document.createElement("button");
        drawChartBtn.textContent = "Rita diagram";
        drawChartBtn.classList.add("teamBtn", "btn", "btn-dark");
        // figureArticle.appendChild(drawChartBtn);

        // Knapp lägga till favoritlag
        const favouriteBtn = document.createElement("button");
        favouriteBtn.textContent = "Spara som mitt lag";
        favouriteBtn.classList.add("teamBtn", "btn", "btn-dark");
        //  figureArticle.appendChild(favouriteBtn);

        // Lägger in knapparna i en div för att
        // kunna placeras som jag vill.
        const divButtons = document.createElement("div");
        divButtons.appendChild(drawChartBtn);
        divButtons.appendChild(favouriteBtn);
        divButtons.classList.add("divButtons");
        figureArticle.appendChild(divButtons);

        // Skapar info som ska in i cirkeldiagrammet.
        const labelsCircleChart = ["Vinster", "Oavgjorda", "Förluster"];
        const dataCircleChart = [
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
        const coach = document.createElement("p");
        coach.innerHTML = `Coach: <strong>${result.coach.name}</strong>`;
        coach.classList.add("coachName");
        figureArticle.appendChild(coach);

        // Här skapar jag tableheader för tabellens struktur
        const rowHead = document.createElement("tr");
        const thData = ["Position", "Namn"];

        thData.forEach((data) => {
          const cell = document.createElement("th");
          cell.textContent = data;
          rowHead.appendChild(cell);
        });

        thead.appendChild(rowHead);

        result.squad.forEach((player) => {
          // här lägger jag till data om varje spelare i tabellen
          const row = document.createElement("tr");
          const rowData = [player.position, player.name];
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
              const cell = document.createElement("td");
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
