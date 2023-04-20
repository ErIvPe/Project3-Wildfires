let myMap2 = L.map("map2", {
    center: [39.0997, -94.5786 ],
    zoom: 4,
    fullscreenControl: true,
    fullscreenControlOptions: {
    position: 'topleft'
  }
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap2);

let url = "wildfire_db1.geojson";

d3.json(url).then(function(response) {

  console.log(response);
  features = response.features;

  let heatArray = [];

  for (let i = 0; i < features.length; i++) {
    let location = features[i].geometry;
    if (location) {
      //console.log(location);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }

  }

  let heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 1,
    gradient:{0.2:"yellow", 0.3: 'orange', 0.4: 'red', 0.65: 'blue', 1: 'purple'} ,
    intensity: 1
  }).addTo(myMap2);


});