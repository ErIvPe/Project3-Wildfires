// Creating the map object
let myMap = L.map("map1", {
    center: [39.0997, -94.5786 ],
    zoom: 3,
});
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "wildfire_db1.geojson";

// Our style object..nothing is pink but thats not necessarry
let mapStyle = {
    color: "white",
    fillColor: "pink",
    fillOpacity: 0.5,
    weight: 1.5
  };
// Getting our GeoJSON data
d3.json(link).then(function(data) {
    
   /* // Creating a GeoJSON layer with the retrieved data
   L.geoJson(data, {
      // Passing in our style object
      style: mapStyle
    }).addTo(myMap);*/
  

    //Create a new marker cluster group.
    
    console.log(data);

    getData(data);
   
});
function getData(data){
  // Loop through the data.
  var markers = L.markerClusterGroup();
 
for (let i = 0; i < data.features.length; i++) {
    fires= data.features[i];
    if(fires.properties.fire_cause == 'Human'||fires.properties.fire_cause == 'Natural'){
// Set the data location property to a variable.
        
        let location = fires.geometry.coordinates;
        //console.log(location);
// Check for the location property.
        if (location) {
            let name = fires.properties.fire_name;
            let county = fires.properties.county;
            let state = fires.properties.fire_state;
            let trState = state.substring(3,5);
            let coord = fires.geometry.coordinates;
            let cause = fires.properties.fire_cause;
    
            let textTest = name + "<br>" + county + " County, " + trState + "<br>Coordinates: " + coord +  "<br>Fire Cause: " + cause;
  // Add a new marker to the cluster group, and bind a popup.
         markers.addLayer(L.marker([location[1], location[0]])
            .bindPopup(textTest));
}
    }

    else {
        continue;
    }    
    

  }
  console.log(1);

  myMap.addLayer(markers);
};
 

