var carButton = document.getElementById("car-button");
var walkButton = document.getElementById("walk-button");
var searchButton = document.getElementById("search-button");
var transport = carButton;

walkButton.onclick = () => {
  walkButton.querySelector("path").setAttribute("fill", "black");
  carButton.querySelector("path").setAttribute("fill", "#9f9f9f");
  transport = walkButton;
}
carButton.onclick = () => {
  walkButton.querySelector("path").setAttribute("fill", "#9f9f9f");
  carButton.querySelector("path").setAttribute("fill", "black");
  transport = carButton;
}

var toSearch = places({
  appId: 'plOI9A6ZZG8E',
  apiKey: 'c06e6514463c64853edb7dcfd882d774',
  container: document.querySelector('#to-input')
})

var fromSearch = places({
  appId: 'plOI9A6ZZG8E',
  apiKey: 'c06e6514463c64853edb7dcfd882d774',
  container: document.querySelector('#from-input')
})