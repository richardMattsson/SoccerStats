let apiKey = "d5d8a211dbbd4ef5849cc74165a5be01";
let testUrl = "https://api.football-data.org/v4/competitions/PL/teams";

fetch(testUrl, {
  headers: {
    "X-Auth-Token": apiKey,
  },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
  });
