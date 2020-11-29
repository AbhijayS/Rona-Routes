/*
walking
-------
type of destination
duration of walking
county
"walk"

car
---
type
county
"car"

heatmap
-------


suggested routes

*/


var carButton = document.getElementById("car-button");
var walkButton = document.getElementById("walk-button");
var transport = carButton;
var searchButton = document.getElementById("search-button");
var toLngLat, fromLngLat, toCounty, allRoutes;
var routeRatingEl = document.getElementById("route-rating");
var routeDurationEl = document.getElementById("route-duration");
var routeArrivalEl = document.getElementById("route-arrival");
var heatMapLayers = [];

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

/* Algolia */
var toSearch = places({
  appId: 'plOI9A6ZZG8E',
  apiKey: 'c06e6514463c64853edb7dcfd882d774',
  container: document.querySelector('#to-input'),
  aroundLatLng: '30.285358101094687, -97.73564712031731'
})

var fromSearch = places({
  appId: 'plOI9A6ZZG8E',
  apiKey: 'c06e6514463c64853edb7dcfd882d774',
  container: document.querySelector('#from-input'),
  aroundLatLng: '30.285358101094687, -97.73564712031731'
})

toSearch.on('change', e => {
  toLngLat = [e.suggestion.latlng.lng, e.suggestion.latlng.lat];
  toCounty = e.suggestion.county;
  map.flyTo({ center: [toLngLat[0], toLngLat[1]], zoom: 12 });
  addEndPoint();
});

fromSearch.on('change', e => {
  fromLngLat = [e.suggestion.latlng.lng, e.suggestion.latlng.lat]
  map.flyTo({ center: [fromLngLat[0], fromLngLat[1]], zoom: 12 });
  addStartPoint();
});

/* MapBox */
mapboxgl.accessToken = 'pk.eyJ1IjoiYXMyMDAxIiwiYSI6ImNraGZkbHVwNzBiZTQydnBjbXFuNXA0ZTAifQ.E0nuXPtQYbmI_6r7KGqKjg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-97.73564712031731, 30.285358101094687],
  zoom: 12
});

map.on('load', () => {
  // add heatmap layer for testing
  // map.addSource('counties', {
  //   type: 'geojson',
  //   data: './earthquakes.geojson'
  // });

  // map.addLayer({
  //   id: 'counties-heat',
  //   type: 'heatmap',
  //   source: 'counties',
  //   maxzoom: 15,
  //   paint: {
  //     'heatmap-weight': {
  //       property: 'mag',
  //       type: 'linear'
  //     }
  //   }
  // })
  var countiesGeoJSONURL = 'http://localhost:8080/US_Counties.json';
  var countiesRatingsURL = 'http://localhost:8080/Counties_Heatmap_Ratings.json'

  // counties pre-calculated ratings
  fetch(countiesRatingsURL)
    .then(res => res.json())
    .then(countiesRatingsJSON => {
      console.log(countiesRatingsJSON);
      // counties geojson data
      fetch(countiesGeoJSONURL)
        .then(res => res.json())
        .then(countiesGeoJSON => {
          console.log(countiesGeoJSON);
          for (const countyGeoJSONFeature of countiesGeoJSON.features) {
            // var countyRatingObj = countiesRatingsJSON.find(ratingObj => ratingObj.county == countyGeoJSONFeature.properties.NAME + ' County');
            // if (countyRatingObj) {
              map.addSource(countyGeoJSONFeature.properties.GEO_ID, {
                type: 'geojson',
                data: countyGeoJSONFeature
              });

            //   heatMapLayers.push({
            //     county: countyGeoJSONFeature.properties.NAME,
            //     source: countyGeoJSONFeature.properties.GEO_ID
            //   });

            //   // for testing
              map.addLayer({
                id: countyGeoJSONFeature.properties.GEO_ID + "-heat",
                type: 'fill',
                source: countyGeoJSONFeature.properties.GEO_ID,
                layout: {},
                paint: {
                  'fill-color': '#088',
                  'fill-opacity': 0.8
                }
              })
            // }
          }
          console.log("Done");
        })
        .catch(e => console.error("Error loading US Counties GeoJSON.", e));
    })
    .catch(e => console.error("Error loading Counties Ratings.", e));


  /*
  fetch(countiesJSONURL)
    .then(res => res.json())
    .then(async (countiesData) => {
      await Promise.all(
        countiesData.features.map(mapboxSourceObject => {
          // making rating request
          var ratingColor;
          var ratingsURL = "http://localhost:8080/countyheatmapdata.json";
          return fetch(ratingsURL)
            .then(res => res.json())
            .then(allRatings => {
              var county = allRatings.find(r => r['county'] == mapboxSourceObject.properties.NAME + ' County');
              ratingColor = applyColor(county['rating']);
              // create then append layer
              var mapboxLayer = {
                id: mapboxSourceObject.properties.NAME,
                type: 'fill',
                source: mapboxSourceObject,
                layout: {},
                paint: {
                  'fill-color': ratingColor,
                  'fill-opacity': 0.8
                }
              };
              heatMapLayers.push(mapboxLayer);
            })
            .catch(() => {
              console.error('Ratings response error.');
              ratingColor = applyColor(1);
              map.addSource(mapboxSourceObject.properties.NAME, mapboxSourceObject);
              var mapboxLayer = {
                id: mapboxSourceObject.properties.NAME,
                type: 'fill',
                source: mapboxSourceObject.properties.NAME,
                layout: {},
                paint: {
                  'fill-color': ratingColor,
                  'fill-opacity': 0.8
                }
              };
              heatMapLayers.push(mapboxLayer);
            })
        })
      );
      // setup heatmap button
      console.log(heatMapLayers);

      // for testing
      map.addLayer(heatMapLayers[0]);
    });

  // map.addSource('poly', poly);
  // map.addLayer({
  //   id: 'poly-layer',
  //   type: 'fill',
  //   source: 'poly',
  //   'paint': {
  //     'fill-color': '#088',
  //     'fill-opacity': 0.8
  //   }
  // });
  */

  searchButton.onclick = () => {
    function doneStartPoint() {
      if (map.getLayer('start') && map.isSourceLoaded('start')) {
        map.off('sourcedata', doneStartPoint);
        // add end point
        map.on('sourcedata', doneEndPoint);
        addEndPoint();
      }
    }
    function doneEndPoint() {
      if (map.getLayer('end') && map.isSourceLoaded('end')) {
        map.off('sourcedata', doneEndPoint);
        // add directions   
        if (!map.getLayer('0')) {
          addRoutes();
        }
        addRoutes();
        map.on('sourcedata', doneRoute);
      }
    }

    function doneRoute() {
      if (map.getSource('0') && map.isSourceLoaded('0')) {
        map.off('sourcedata', doneRoute);
        makePrimary('0');
        console.log('done loading routes');
      }
    }

    addStartPoint();
    map.on('sourcedata', doneStartPoint);
    map.fitBounds([toLngLat, fromLngLat], { padding: 20 });
  }
});

// Add starting point to the map
function addStartPoint() {
  var startData = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: fromLngLat
      }
    }
    ]
  };
  if (map.getLayer('start')) {
    map.getSource('start').setData(startData)
  } else {
    map.addLayer({
      id: 'start',
      type: 'circle',
      source: {
        type: 'geojson',
        data: startData
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
  }
}


// Add end point
function addEndPoint() {
  var endData = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: toLngLat
      }
    }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(endData);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: endData
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }
}


function addRoutes() {
  var url = 'https://api.mapbox.com/directions/v5/mapbox/' + (transport == carButton ? 'driving/' : 'walking/') + fromLngLat[0] + ',' + fromLngLat[1] + ';' + toLngLat[0] + ',' + toLngLat[1] + '?alternatives=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
  // Add directions
  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function () {
    var json = JSON.parse(req.response);
    allRoutes = json;
    allRoutes.routes.map((r, index) => {
      var data = {
        type: 'Feature',
        properties: {},
        geometry: r.geometry
      };
      addMapboxRouteLayer(data, index);
    });
  };
  req.send();
}

const primaryColor = '#3887be';
const secondaryColor = '#8a8a8a';

function addMapboxRouteLayer(geojsonData, ordinal, primary = false) {
  var routeID = '' + ordinal;
  console.log(routeID + ' Loading');
  // if the route already exists on the map, reset it using setData
  if (map.getSource(routeID)) {
    map.getSource(routeID).setData(geojsonData);
  } else { // otherwise, make a new request
    map.addLayer({
      id: routeID,
      type: 'line',
      source: {
        type: 'geojson',
        data: geojsonData
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': primary ? primaryColor : secondaryColor,
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  map.on('click', routeID, e => {
    console.log(routeID + ' clicked');
    makePrimary(routeID);
  });
}

function makePrimary(routeID) {
  map.setPaintProperty('0', 'line-color', secondaryColor);
  map.setPaintProperty('1', 'line-color', secondaryColor);
  map.setPaintProperty('2', 'line-color', secondaryColor);
  map.setPaintProperty(routeID, 'line-color', primaryColor);
  updateEstimates(routeID);
}

function updateEstimates(routeID) {
  var duration = allRoutes.routes[parseInt(routeID)].duration;
  var arrival = new Date(Date.now() + duration * 1000);
  var now = new Date();

  // request place type
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${toLngLat[0]},${toLngLat[1]}.json?types=poi&access_token=${mapboxgl.accessToken}`)
    .then(res => res.json())
    .then(data => {
      var ratingRequest = {
        county: toCounty,
        type: data.features[0].properties.category.split(',')[0].trim(),
        duration: duration,
        mode: transport == carButton ? "car" : "walk"
      };

      fetch(`127.0.0.1:8000/rating/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingRequest)
      })
        .then(res => res.json())
        .then(rating => {
          routeRatingEl.innerText = rating;
          console.log(applyColor(rating));
          routeRatingEl.style.color = applyColor(rating);
        })
    });

  // travel duration
  // display format
  routeDurationEl.innerText = (Math.floor(duration / 3600) != 0 ? `${Math.floor(allRoutes.routes[0].duration / 3600)} h ` : '') + `${Math.floor(((allRoutes.routes[0].duration / 3600) - Math.floor(allRoutes.routes[0].duration / 3600)) * 60)} m`;

  // traval arrival
  routeArrivalEl.innerText = (arrival.getDate() != now.getDate()) ? arrival.toLocaleString() : arrival.toLocaleTimeString();
}

function applyColor(value) {
  value = Math.floor(value);
  switch (value) {
    case 1: return "#69B34C"
    case 2: return "#FAB733"
    case 3: return "#FF8E15"
    case 4: return "#FF4E11"
    case 5: return "#FF0D0D"
    default: return "black"
  }
}
