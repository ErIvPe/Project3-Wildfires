console.log("heatmap.js"); 

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

//let url = "wildfire_db1.geojson";
axios.get('/api/db1')
  .then(function(response) {
    console.log(response);

    features = response.data.features;
  
    let heatArray = [];
  
    for (let i = 0; i < features.length; i++) {
      let location = features[i].geometry;
      if (location) {
        //console.log(location);
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
  
    }
  
    let heat = L.heatLayer(heatArray, {
      radius: 12,
      blur: 1,
      gradient:{0.1:"blue", 0.2: 'orange', 0.3: 'red', 1: 'red'}, 
      intensity: 20
    }).addTo(myMap2);

    console.log(heatArray);
  })
  .catch(function(error) {
    console.log(error);
  });

 
//d3.json(url).then(function(response) {

 


