axios.get('/api/cleanedWF')
  .then(function(response) {
    const data = response.data
    //console.log(data)
    initChart(data);
  })
  .catch(function(error) {
    console.log(error);
  });


  function  initChart(data) {
    let run = 'init';
    setupPie(data);
    setupBubble(data);
  };

function setupPie(data){

    let burnType = ["Undetermined","Human","Natural"]; 
    let burnCount = getCount(data);

    var data = [{
        values: burnCount, // causes data
        labels: burnType, // list of causes
        type: "pie",
        textfont: {
            color: "white"
        }
    }];

    var layout = {
        height: 500,
        width: 600,
        paper_bgcolor: "black",
        legend: {
            font: {
                color: "white"
            }
        }
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

    //separate one trace into 3 to allow for legend to be added to allow data toggle

    let ids1 = [];
    let ids2 = [];
    let ids3 = [];
    let dur1 = [];
    let dur2 = [];
    let dur3 = [];
    let ara1 = [];
    let ara2 = [];
    let ara3 = [];
    let col1 = [];
    let col2 = [];
    let col3 = [];
    let opa1 = [];
    let opa2 = [];
    let opa3 = [];
    let pop1 = [];
    let pop2 = [];
    let pop3 = [];

    for (let i=0; i<bubCol.length; i++) {
        if (bubCol[i] == "rgb(255,107,38)") {
            //human
            ids1.push(ids[i]);
            dur1.push(durations[i]);
            ara1.push(burnArea[i]);
            col1.push(bubCol[i]);
            opa1.push(bubOp[i]);
            pop1.push(popUP[i]);

        }
        else if (bubCol[i] == "rgb(11,110,41)") {
            //natural
            ids2.push(ids[i]);
            dur2.push(durations[i]);
            ara2.push(burnArea[i]);
            col2.push(bubCol[i]);
            opa2.push(bubOp[i]);
            pop2.push(popUP[i]);
        }
        else if (bubCol[i] == "rgb(15,122,189)") {
            //undetermined
            ids3.push(ids[i]);
            dur3.push(durations[i]);
            ara3.push(burnArea[i]);
            col3.push(bubCol[i]);
            opa3.push(bubOp[i]);
            pop3.push(popUP[i]);
        }
    }

    let trace1 = {
        name: "Human",
        x: ids1, 
        y: dur1,
        showlegend: true, 
        text: pop1, 
        hoverinfo: "text", 
        mode: 'markers',
        marker: {
          size: ara1,  
          color: col1,        
          opacity: opa1        
        }
      };

    let trace2 = {
        name: "Natural",
        x: ids2, 
        y: dur2,
        showlegend: true, 
        text: pop2,
        hoverinfo: "text", 
        mode: 'markers',
        marker: {
          size: ara2,  
          color: col2,        
          opacity: opa2        
        }
      };
    
      let trace3 = {
        name: "Undetermined",
        x: ids3, 
        y: dur3,
        showlegend: true, 
        text: pop3, 
        hoverinfo: "text", 
        mode: 'markers',
        marker: {
          size: ara3,  
          color: col3,        
          opacity: opa3        
        }
      };
    
      let BubData = [trace1, trace2, trace3];
    
      let layout = {
        showlegend: true,
        hovermode: 'closest',
        height: 800,
        width: 1300,
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
                text: "Fire Duration in Hours <br>",
                font: {
                    color: "white",
                    size: 16
                }
            }
        },
        legend: {
            x: 1,
            y: 0.5,
            font: {
                color: "white"
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
        //remove known typo outliers:
        if (diffNhours > 7000){
            continue;
        }
        returnTime.push(diffNhours);
    }

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
    let maxacres = Math.max.apply(Math, acres);
    let minacres = Math.min.apply(Math, acres);
    let returnSize = [];
    for (let i=0; i<acres.length; i++){
        let x = acres[i];
        let size = ((((x-minacres)*200)/(maxacres-minacres))+25);
        returnSize.push(size);
    }

    return returnSize;
}

function getAcres(data) {
    let listAcres = [];
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