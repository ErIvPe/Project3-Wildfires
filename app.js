//setup constant for data pull from data source
fetch("cleanedWF_ChartTrim.geojson").then(response => {return response.json();}).then(data => console.log(data));

//setup to read data
//d3.json(url).then(function(data) {
    //log data for testing; remove in final.
    //console.log(data);
    //assign data to dataset variable for other usage
    //dataset = data;
    //Run function to setup dropdown menus
    //Dropdown for chart type can be hard coded [Pie, Bubble]; Dropdown for Dataset selection can also be hardcoded [All Data, By State, By County, By Cause (pie only)];
    //secondary dropdown menus should be generated as list of states and list of counties to filter down data to something specific
    //setupDD(data);
    //Run init function to setup a general view to start with
    //init(data);
//  });
/*
d3.selectAll("#selDataset").on("change", getData);  

function setupDD(data) {
  let sampleID = Object.values(data.names);
  let dselect = d3.select("select");
  //for loop iterate through sampleID and create new option value
  for (i = 0; i < (sampleID.length - 1); i++)
    dselect.append("option").attr("value", sampleID[i]).text(sampleID[i]);
}

// Default Layout
function  init(data) {
  let id = '940';
  let run = 'init';
  setupBar(data, id, run);
  setupBubble(data, id, run);
  runDemo(data, id, run);
};

// pull data from dataset based on drop down selection
function getData() {
    let dropdownMenu = d3.select("#selDataset");
    let newID = dropdownMenu.property("value");
    let run = "update";

    setupBar(dataset, newID, run);
    setupBubble(dataset, newID, run);
    runDemo(dataset, newID, run);
}

function setupBar(data, id, run){
  let data_id = Object.values(data.samples);
  let sample_values = [];
  let otu_ids_temp = [];
  let otu_labels = [];
  let otu_ids = []; 
  let sample_ten = data_id.find(item => item.id === id);

  if (sample_ten.length < 10){
    for (i = 0; i < (sample_ten.length); i++) {
      sample_values.push(sample_ten.sample_values[i]);
      otu_ids_temp.push(sample_ten.otu_ids[i]);
      otu_labels.push(sample_ten.otu_labels[i]);
    }
  }
  else {
    for (i = 0; i < 10; i++) {
      sample_values.push(sample_ten.sample_values[i]);
      otu_ids_temp.push(sample_ten.otu_ids[i]);
      otu_labels.push(sample_ten.otu_labels[i]);
    }
  }
      
  for (i = 0; i < (otu_ids_temp.length); i++) {
    let holdID = otu_ids_temp[i];
    let newID = ("OTU " + String(holdID));
    otu_ids.push(newID);
  }

  sample_values.reverse();
  otu_ids.reverse();
  otu_labels.reverse();
  
  let trace1 = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    name: id,
    type: "bar",
    orientation: "h"
    };
    
  let traceData = [trace1];

  let layout = {
    height: 600,
    width: 800
    };      
  
  if (run == "init"){
    Plotly.newPlot("bar", traceData, layout);
  }
  else if (run == "update"){
    Plotly.newPlot("bar", traceData, layout);
  }
}

function setupBubble(data, id, run){
  let data_id = Object.values(data.samples);
  let sample_values;
  let otu_ids;
  let otu_labels; 
  let bubCol = [];
  let bubOp = [];
  let sampleRow = data_id.find(item => item.id === id);
  sample_values = Object.values(sampleRow.sample_values);
  otu_labels = Object.values(sampleRow.otu_labels);
  otu_ids = Object.values(sampleRow.otu_ids);

  for (i = 0; i < (otu_ids.length - 1); i++) {
    let idVal = otu_ids[i];
    let CR = Math.round((Math.abs(4000-idVal))/16);
    let CB = (Math.round(idVal%100))+((Math.floor((idVal/100)%10))*10)+(Math.ceil(i/2));
    let CG = Math.round((Math.sqrt(idVal))*4);
    bubCol.push("rgb("+CR+", "+CG+", "+CB+")");
  }

  for (i = 0; i < (otu_ids.length - 1); i++) {
    bubOp.push(0.6);
  }

  let trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: bubCol,
      opacity: bubOp
    }
  };

  let BubData = [trace1];

  let layout = {
    showlegend: false,
    height: 650,
    width: 1300,
    xaxis: {
      title: {
        text: "OTU ID"
      }
    }

  };

  if (run == "init"){
    Plotly.newPlot('bubble',BubData, layout);
  }
  else if (run == "update"){
    Plotly.newPlot('bubble',BubData, layout);
  }
} 

function runDemo(data, id, run){
  let metadata = Object.values(data.metadata);
  let demo_pnl = d3.select(".panel-body");
  let sampleMeta = metadata.find(item => item.id == id);
  let mdRow = Object.entries(sampleMeta).map(pair => pair.flat());
  if (run == "init"){
      for (i = 0; i < (mdRow.length - 1); i++) {
        //pull all key:value pairs and append them to lists
        KVpair = mdRow[i];
        demo_pnl.append("li").text(KVpair[0] + ": " + KVpair[1]);
      }
  }
  else if (run == "update"){
    demo_pnl.selectAll("li").remove();
        for (i = 0; i < (mdRow.length - 1); i++) {
          //pull all key:value pairs and append them to lists
          KVpair = mdRow[i];
          demo_pnl.append("li").text(KVpair[0] + ": " + KVpair[1]);
        }
  }
}*/