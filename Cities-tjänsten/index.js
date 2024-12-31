function onClick(event) {
  console.log(event);
  console.log(event.pressure); // true eller false
}

document.querySelector("#p").addEventListener("click", onClick);

const article = document.querySelector("#article");

let cities = document.querySelector("#showCities");
cities.classList.add("options");

cities.addEventListener("click", () => {
  fetch("https://avancera.app/cities/")
    .then((response) => response.json())
    .then((result) => {
      drawCities(result);
    });
});

let citiesParagraph;

function drawCities(cities) {
  if (article.innerHTML !== "") {
    article.innerHTML = "";
  }
  cities.forEach((city) => {
    citiesParagraph = document.createElement("p");
    citiesParagraph.textContent += `${city.name}. Befolkning: ${city.population} id: ${city.id}`;
    article.appendChild(citiesParagraph);
  });
}

const addCity = document.querySelector("#addCity");
addCity.classList.add("options");
const editCity = document.querySelector("#editCity");
editCity.classList.add("options");
const deleteCity = document.querySelector("#deleteCity");
deleteCity.classList.add("options");

const addForm = document.querySelector("#addForm");
const editForm = document.querySelector("#editForm");
const deleteForm = document.querySelector("#deleteForm");

let cityName = document.querySelector("#addCityName");
cityName.value = "";
let population = document.querySelector("#addPopulation");
population.value = "";

let changeName = document.querySelector("#changeName");
changeName.value = "";
let changePopulation = document.querySelector("#changePopulation");
changePopulation.value = "";
let cityId = document.querySelector("#cityId");
cityId.value = "";

let idDelete = document.querySelector("#idDelete");
idDelete.value = "";

addCity.addEventListener("click", () => {
  addForm.style.display = "block";
});
editCity.addEventListener("click", () => {
  editForm.style.display = "block";
});
deleteCity.addEventListener("click", () => {
  deleteForm.style.display = "block";
});

addForm.addEventListener("submit", add);
editForm.addEventListener("submit", edit);
deleteForm.addEventListener("submit", del);

function del(event) {
  event.preventDefault();
  console.log(idDelete.value);
  fetch("https://avancera.app/cities/" + idDelete.value, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
    location.reload();
  });
}

function edit(event) {
  event.preventDefault();
  fetch("https://avancera.app/cities/" + cityId.value, {
    body: JSON.stringify({
      id: cityId.value,
      name: changeName.value,
      population: parseInt(changePopulation.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then((response) => {
    console.log(response);
    location.reload();
  });
}

function add(event) {
  event.preventDefault();
  fetch("https://avancera.app/cities/", {
    body: JSON.stringify({
      name: cityName.value,
      population: parseInt(population.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((result) => {
      drawCities(result);
    });
}
