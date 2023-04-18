//setup fetch request to pull data from either url or json/csvfile
//fetch("./Starting_Data/WF.json").then(response => {return response.json();}).then(data => console.log(data));
//setup variable for data to be held in main code
//var dataset;
const path = "cleanedWF_ChartTrim.geojson";
//var dataset;

d3.json(path).then(function(data) {
    //run init for opening chart
    console.log(data);
    //dataset = data;
    initChart(data);
});

function  initChart(data) {
    let run = 'init';
    setupPie(data);
    setupBubble(data);
    //runDemo(data, id, run);
  };

function setupPie(data){

    //need to call funtions to setup appropriate variables
    //let newdata = cleanCauses(data);  //not necessary as I can use else in if-else to capture all not specified types as undetermined
    //call same function to get burnType
    let burnType = ["Undetermined","Human","Natural"]; //return two arrays of burnType and burnCount
    let burnCount = getCount(newdata);

    var data = [{
        values: burnCount, // causes data
        labels: burnType, // list of causes
        type: "pie"
    }];

    var layout = {
        height: 600,
        width: 800
      };

    Plotly.newPlot('pie', data, layout);
}

/*function cleanCauses(data){
    let indexDat = data.features;
    for(i = 0; i < indexDat.length; i++){
        let row = indexDat[i];
        if (row.properties.FireCause == null || row.properties.FireCause == ""){
            row.properties.FireCause = "Undetermined";
        }
    }
    return data;
}*/

function getCount(data){
    let indexDat = data.features;
    let human = 0;
    let natural = 0;
    let undetermined = 0;
    for(i = 0; i < indexDat.length; i++){
        let row = indexDat[i];
        if (row.properties.FireCause == "Human"){
            human++;
        }
        else if (row.properties.FireCause == "Natural"){
            natural++;
        }
        else {
            undetermined++;
        }
    }
    let burn = [undetermined, human, natural];
    return burn;
}

function setupBubble(data){

    let newData = cullData(data);

    let ids = pullIDs(newData);
    let durations = pullDuration(newData);
    let burnArea = getSize(newData);
    let bubCol = getColor(newData); // will need a function inside this call to replace nulls with undetermined
    let bubOp = [];
    let popUP = getText(newData);

    //need to call funtions to setup appropriate variables, which will drop rows with necessary data missing and correct blanks in cause to undiscovered/unknown

    let trace1 = {
        x: ids, //id numbers
        y: durations, // duration, will need to convert date/time info and do diference to display length
        text: popUP, // on click string list // popup of data
        mode: 'markers',
        marker: {
          size: burnArea,  // based on area/acerage of burn
          color: bubCol,        // based on cause
          opacity: bubOp        // flat value; maybe on click change to darken?
        }
      };
    
      let BubData = [trace1];
    
      let layout = {
        //showlegend: false,  //legend might be good for color; //may want title
        height: 650,
        width: 1300
    };

    Plotly.newPlot('bubble',BubData, layout); //change bubble to the call in the html file, height and width should be changed to accomodate section deminsions as well
}

function cullData(data) {
    for (let i=0; i<data.features.length; i++){
        let row = data.features[i];
        if (row.properties.ContainmentDateTime == null || row.properties.ContainmentDateTime == ""){
            delete row;
            continue;
        }
        else if (row.properties.FireDiscoveryDateTime == null || row.properties.FireDiscoveryDateTime == ""){
            delete row;
            continue;
        }
        else if (row.properties.IncidentSize == null && row.properties.DiscoveryAcres == null){
            delete row;
            continue;
        }
    }
    return data;
}
