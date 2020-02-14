import AutoCom from "./autocom";

const url = "https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json";


fetch(url)
  .then(response => response.json())
  .then(city => {
    new AutoCom({selector: '#input', data: city.city, characters: 2, clearButton: true});
  })








