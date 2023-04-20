const path = "cleanedWF_ChartTrim.geojson";

d3.json(path).then(function(data) {
    console.log(data);
    initChart(data);
});

function  initChart(data) {
    let run = 'init';
    setupPie(data);
    setupBubble(data);
    //runDemo(data, id, run); // this function would be used for a table display of interesting and useful statistics
  };

function setupPie(data){

    let burnType = ["Undetermined","Human","Natural"]; 
    let burnCount = getCount(data);

    var data = [{
        values: burnCount, // causes data
        labels: burnType, // list of causes
        type: "pie"
    }];

    var layout = {
        height: 500,
        width: 600,
        paper_bgcolor: "black",
      };

    Plotly.newPlot('pie', data, layout);

    // Text for pie chart explanation:
    // This chart breaks down the ratio of wildfire causes for the US 2023 wildfire data.
    
}

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

    let ids = pullIDs(data);
    let durations = pullDuration(data);
    let burnArea = getSize(data);
    let bubCol = getColor(data); 
    let bubOp = [];
    let popUP = getText(data,burnArea, durations);

    for (let i=0; i<data.features.length; i++){
        bubOp.push(.4);
    }

    let trace1 = {
        x: ids, 
        y: durations,
        showlegend: false, 
        text: popUP, 
        mode: 'markers',
        marker: {
          size: burnArea,  
          color: bubCol,        
          opacity: bubOp        
        }
      };
    
      let BubData = [trace1];
    
      let layout = {
        showlegend: false,
        height: 800,
        width: 1600,
        plot_bgcolor: 'd3d3d3',
        paper_bgcolor: 'black',
        xaxis: {
            title: {
                text: "Wildfire Object ID Number",
                font: {
                    color: "white"
                }
            }
        },
        yaxis: {
            title: {
                text: "Fire Duration in Hours",
                font: {
                    color: "white",
                    size: 16
                }
            }
        }
    };

    Plotly.newPlot('bubble',BubData, layout); 

    // Text for bubble plot explanation:
    // The above chart reflects the distribution of wildfires so far in 2023,
    // with the hight of the marker connected to the duration of the wildfire
    // the radius of the marker connected to the size of the area affected by the fire
    // and the color connected to the recorded cause of the fire (either natural, human-caused, or undetermined).
}


function pullIDs(data) {
    let dataIndex = data.features;
    let returnIDs = [];
    for (let i=0; i<dataIndex.length; i++){
        let row = dataIndex[i];
        let holdID = row.properties.OBJECTID;
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            returnIDs.push(holdID);
        }    
    }
    console.log(returnIDs);
    return returnIDs;
}

function pullDuration(data) {
    let dataIndex = data.features;
    let starttimes = starttime(dataIndex);
    let endtimes = endtime(dataIndex);
    let returnTime = [];
    for (let i=0; i<starttimes.length; i++){
        let timeDiff = endtimes[i] - starttimes[i]; //should result in difference in milliseconds
        let diffNhours = timeDiff/3600000;  // should be difference in hours
        returnTime.push(diffNhours);
    }
    console.log(returnTime);
    console.log(Math.max(returnTime))
    return returnTime;
}

function starttime(data) {
    let startList = [];
    for (let i=0; i<data.length; i++){
        let row = data[i];
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            let start = data[i].properties.FireDiscoveryDateTime;
            let startTime = start.substring(0,18);
            let S = new Date(startTime);
            startList.push(S);
        }
    }
    return startList;
}

function endtime(data) {
    let endList = [];
    for (let i=0; i<data.length; i++){
        let row = data[i];
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            let end = data[i].properties.ContainmentDateTime;
            let endTime = end.substring(0,18);
            let E = new Date(endTime);
            endList.push(E);
        }
        
    }
    return endList;
}

function getSize(data) {
    let dataIndex = data.features;
    let acres = getAcres(dataIndex);
    console.log(acres);
    let maxacres = Math.max.apply(Math, acres);
    console.log(maxacres);
    let minacres = Math.min.apply(Math, acres);
    let returnSize = [];
    for (let i=0; i<acres.length; i++){
        let x = acres[i];
        let size = ((((x-minacres)*200)/(maxacres-minacres))+25);
        returnSize.push(size);
    }
    console.log(returnSize);

    return returnSize;
}

function getAcres(data) {
    let listAcres = [];
    console.log(data[0]);
    for (let i=0; i<data.length; i++){
        let row = data[i];
        let holdsize;
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;

        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {  
            let rowA1 = row.properties.DiscoveryAcres;
            let rowA2 = row.properties.IncidentSize;

            if (rowA2 == null){
                holdsize = rowA1;
                listAcres.push(holdsize);
            }
            else if (rowA1 == null) {
                holdsize = rowA2;
                listAcres.push(holdsize);
            }
            else {
                holdsize = rowA2;
                listAcres.push(holdsize);
            }
        }
        
    }
    console.log(listAcres);
    return listAcres;
}

function getColor(data) {
    let dataIndex = data.features;
    let returnColor = [];
    for (let i=0; i<dataIndex.length; i++){
        let row = dataIndex[i];
        let color;
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            let cause = row.properties.FireCause;
            if (cause == "Human"){
                color = "rgb(255,107,38)";
                returnColor.push(color);
            }
            else if (cause == "Natural"){
                color = "rgb(11,110,41)";
                returnColor.push(color);
            }
            else {
                color = "rgb(15,122,189)";
                returnColor.push(color);
            }
        }
        
    }
    
    return returnColor;
}

function getText(data, burn, times) {
    let dataIndex = data.features;
    let returnText = [];
    let counter = 0;
    for (let i=0; i<dataIndex.length; i++){
        let row = dataIndex[i];
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            let name = row.properties.IncidentName;
            let county = row.properties.POOCounty;
            let state = row.properties.POOState;
            let trState = state.substring(3,5);
            let coord = row.geometry.coordinates;
            let area = burn[counter];
            let time = times[counter];
            let cause = row.properties.FireCause;
            if ((cause == null) || (cause == "")) {
                cause = "Undetermined";
            }
            counter++;
            let textTest = "";
            textTest = name + "<br>" + county + " County, " + trState + "<br>Coordinates: " + coord + "<br>Burn Area (acres): " + area + "<br>Burn Duration (hours): " + time + "<br>Fire Cause: " + cause;
            returnText.push(textTest);
        }
    }
    return returnText;
}