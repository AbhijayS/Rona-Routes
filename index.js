var carButton = document.getElementById("car-button");
var walkButton = document.getElementById("walk-button");
var transport = carButton;
var searchButton = document.getElementById("search-button");
var toLngLat, fromLngLat;

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
  container: document.querySelector('#to-input')
})
var fromSearch = places({
  appId: 'plOI9A6ZZG8E',
  apiKey: 'c06e6514463c64853edb7dcfd882d774',
  container: document.querySelector('#from-input')
})
toSearch.on('change', e => toLngLat = [e.suggestion.latlng.lng, e.suggestion.latlng.lat]);
fromSearch.on('change', e => fromLngLat = [e.suggestion.latlng.lng, e.suggestion.latlng.lat]);

/* MapBox */
mapboxgl.accessToken = 'pk.eyJ1IjoiYXMyMDAxIiwiYSI6ImNraGZkbHVwNzBiZTQydnBjbXFuNXA0ZTAifQ.E0nuXPtQYbmI_6r7KGqKjg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-97.73564712031731, 30.285358101094687],
  zoom: 10
});

map.on('load', () => {
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
        
        if (!map.getLayer('route')) {
          addRoute();
        }
  
        addRoute();
      }
    }
  
    map.on('sourcedata', doneStartPoint);
  
    addStartPoint();
  
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


function addRoute() {
  var url = 'https://api.mapbox.com/directions/v5/mapbox/' + (transport==carButton?'driving/':'walking/') + fromLngLat[0] + ',' + fromLngLat[1] + ';' + toLngLat[0] + ',' + toLngLat[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
  // Add directions
  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = function () {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, reset it using setData
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else { // otherwise, make a new request
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geojson
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
  };
  req.send();
}