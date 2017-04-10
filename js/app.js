/*jshint esversion: 6*/

const dataReq = (source, property, element, func) => {
  const dReq = new XMLHttpRequest();

  dReq.addEventListener(`load`, function () {
    const data = JSON.parse(this.responseText);
    func(data, property, element);
  });
  dReq.open(`GET`, source);
  dReq.send();
};

const getMovies = (data, property, element) => {
  const filmList = document.querySelector(`#filmList`);
  if (data.next !== null && data.next !== undefined) {
    dataReq(data.next, `name`, null, getMovies);
  }
  for (let i = 0; i < data.results.length; ++i) {
    let list = document.createElement(`li`);
    list.style.listStyleType = `hebrew`;
    list.class = `movie`;
    filmList.appendChild(list);
    let filmTitle = document.createElement(`p`);
    filmTitle.style.fontSize = `24px`;
    filmTitle.style.fontWeight = `bold`;
    filmTitle.class = `movieName`;
    filmTitle.innerHTML = `Movie ${i + 1}: ` + data.results[i].title;
    list.appendChild(filmTitle);
    let planetHeader = document.createElement(`p`);
    planetHeader.style.fontSize = `18px`;
    planetHeader.style.fontWeight = `bold`;
    planetHeader.innerHTML = `Planets in "${data.results[i].title}"`;
    list.appendChild(planetHeader);
    let planetTitle = document.createElement(`ul`);
    planetTitle.class = `moviePlanets`;
    list.appendChild(planetTitle);
    for (let j = 0; j < data.results[i].planets.length; ++j) {
      dataReq(data.results[i].planets[j], `name`, planetTitle, getPlanets);
    }
  }
};

const getPlanets = (data, property, element) => {
  let newPlanet = document.createElement(`li`);
  newPlanet.style.listStyleType = `hebrew`;
  newPlanet.class = `planet`;
  let planetList = document.createElement(`p`);
  planetList.class = `planetName`;
  planetList.innerHTML = data.name;
  newPlanet.appendChild(planetList);
  element.appendChild(newPlanet);
};


dataReq(`http://swapi.co/api/people/4/`, `name`, `#person4Name`, (data, property, element) => {
    document.querySelector(element).innerHTML = `Hi, my name is ${data[property]}...`;
  });
dataReq(`http://swapi.co/api/planets/1/`, `name`, `#person4HomeWorld`, (data, property, element) => {
    document.querySelector(element).innerHTML = `...and I come from ${data[property]}.`;
  });
dataReq(`http://swapi.co/api/people/14/`, `name`, `#person14Name`, (data, property, element) => {
    document.querySelector(element).innerHTML = `I'm ${data[property]}...`;
  });
dataReq(`http://swapi.co/api/species/1/`, `name`, `#person14Species`, (data, property, element) => {
    document.querySelector(element).innerHTML = `... and I'm just a ${data[property]} amongst aliens.`;
  });


dataReq(`http://swapi.co/api/films/`, `name`, `#filmList`, getMovies);