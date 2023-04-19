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

    //WORKING!!!! Add Title to chart and see if we can add some detailing to make it look nicer. Darker background, better colors, more depth, explode out the pieces
    //need to call funtions to setup appropriate variables
    //let newdata = cleanCauses(data);  //not necessary as I can use else in if-else to capture all not specified types as undetermined
    //call same function to get burnType
    let burnType = ["Undetermined","Human","Natural"]; //return two arrays of burnType and burnCount
    let burnCount = getCount(data);

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

    //let newData = cullData(data);
    //console.log(newData);

    let ids = pullIDs(data);
    let durations = pullDuration(data);
    let burnArea = getSize(data);
    let bubCol = getColor(data); // will need a function inside this call to replace nulls with undetermined
    let bubOp = [];
    //let popUP = getText(newData);

    for (let i=0; i<data.features.length; i++){
        bubOp.push(.4);
    }

    //need to call funtions to setup appropriate variables, which will drop rows with necessary data missing and correct blanks in cause to undiscovered/unknown

    let trace1 = {
        x: ids, //id numbers
        y: durations, // duration, will need to convert date/time info and do diference to display length
        //text: popUP, // on click string list // popup of data
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

/*function cullData(data) {
    for (let i=0; i<data.features.length; i++){
        let row = data.features[i];
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            delete row;
            continue;
        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
            delete row;
            continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            delete row;
            continue;
        }
    }
    return data;
}*/

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
    //let maxacres = Math.max(acres);
    console.log(maxacres);
    let minacres = Math.min.apply(Math, acres);
    let returnSize = [];
    for (let i=0; i<acres.length; i++){
        let x = acres[i];
        //console.log(acres[i]);
        let size = ((((x-minacres)*190)/(maxacres-minacres))+10);
        //console.log(size);
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
        //console.log(row);
        //console.log(row.properties.ContainmentDateTime);
        if ((row.properties.ContainmentDateTime == null) || (row.properties.ContainmentDateTime == "")){
            //console.log("containment date null.")
            continue;

        }
        else if ((row.properties.FireDiscoveryDateTime == null) || (row.properties.FireDiscoveryDateTime == "")){
           continue;
        }
        else if ((row.properties.IncidentSize == null) && (row.properties.DiscoveryAcres == null)){
            continue;
        }
        else {
            //console.log(row.properties.ContainmentDateTime);
            //console.log(row.properties.FireDiscoveryDateTime);
            //console.log(row.properties.IncidentSize);
            //console.log(row.properties.DiscoveryAcres);
                        
            let rowA1 = row.properties.DiscoveryAcres;
            //console.log(row.DiscoveryAcres);
            


            let rowA2 = row.properties.IncidentSize;
            //console.log(rowA2);
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

function getText(data) {
    let dataIndex = data.features;
    let returnText = [];
    for (let i=0; i<dataIndex.length; i++){
        let row = dataIndex[i];
    }
}