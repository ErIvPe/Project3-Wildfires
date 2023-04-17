//setup fetch request to pull data from either url or json/csvfile
//fetch("./Starting_Data/WF.json").then(response => {return response.json();}).then(data => console.log(data));
//setup variable for data to be held in main code
//var dataset;

/* dropdown menus
{ChartType:{
    PieChart:{
        DataSelect:{
            Frequency:{
                ViewSelect:{
                    Cause:{
                        Optional_State:{
                            [List of States]:{
                                Optional_County:{
                                    [List of Counties]:{//show chart with county labels}
                                }
                            }
                        }
                    }
                    Nation:{//show chart with state labels}
                    State:{
                        Required_States:{
                            [List of States]:{//show chart with county labels}
                        }
                    }
                }
            }
            BurnSize:{
                DataParameters:{
                    TotalBurnSize:{
                        ViewSelect:{
                            Cause:{
                                Optional_State:{
                                    [List of States]:{
                                        Optional_County:{
                                            [List of Counties]:{//show chart with county labels}
                                        }
                                    }
                                }
                            }
                            Nation:{//show chart with state labels}
                            State:{
                                Required_States:{
                                    [List of States]:{//show chart with county labels}
                                }
                            }
                        }
                    }
                    AverageBurnSize:{
                        ViewSelect:{
                            Cause:{
                                Optional_State:{
                                    [List of States]:{
                                        Optional_County:{
                                            [List of Counties]:{//show chart with county labels}
                                        }
                                    }
                                }
                            }
                            Nation:{//show chart with state labels}
                            State:{
                                Required_States:{
                                    [List of States]:{//show chart with county labels}
                                }
                            }
                        }
                    }
                }
            }
            BurnDuration:{
                ViewSelect:{
                    Cause:{
                        Optional_State:{
                            [List of States]:{
                                Optional_County:{
                                    [List of Counties]:{//show chart with county labels}
                                }
                            }
                        }
                    }
                    Nation:{//show chart with state labels}
                    State:{
                        Required_States:{
                            [List of States]:{//show chart with county labels}
                        }
                    }
                }
            }
        }
    }
    BubbleChart:{}
    Table:{}
}
}

*/

//within the 'then's need to include the following
//log data into console for testing
//assign data to the dataset variable for general usage
//dataset = data;
//run initialization for standard page
//init(data);

//initialization function
//function init(data) {
// hardcode initial vairables for landing page unless we will inherit
//run setup functions for graphs
//setupPie(data, [filter variables]);
//setupBubble(data, [filter variables]);  
//setupTables(data, [filter variables]); 
//}

//on change of dropdowns initialize changes with getData function
//may need multiple of these for each dropdown if multiple
//if chart type dropdown is changed it should also run a function to update the dropdown selection of what view options are available
//d3.selectAll("#selDataset").on("change", getData);

//getData function that will call functions to display appropriate charts
//function getData(){
    //assign variable with new value stored in dropdown
    //may need multiple variables for each dropdown
    //let dropdownMenu = d3.select("#selDataset");
    //use if/if else/else section to identify which chart type is selected and which chart will be displayed
    //if (chartTypeDD == "Pie"){ //run setupPie function }
    //else if (chartTypeDD == "Bubble"){ //run setupBubble function }
    //else if (chartTypeDD == "Table"){ //run setupTables function }
    //each function should pass along the dataset variable and the DD_Filtering Variables as needed
//}

//Pie Function
//function setupPie(data, [filter variables]){
    //run function to determine primary filter's dataset; one for labels, one for focus of data (# of fires, burn size, duration of fire)
    //returnVar([filter variable - dataset selcetion], which function called it)
    //we want to be able to see distribution of fires by:
        //frequency; number of fires for nation by cause - filterable for state, further filterable for county
        //burn size; total burn size for nation by cause - filterable for state, further filterable for county
        //burn size; average burn size for nation by cause - filterable for state, further filterable for county
        //burn duration; average burn duration for nation by cause - filterable for state, further filterable for county
        //frequency; number of fires for nation by state
        //frequency; number of fires for state by county
        //burn size; total burn size for nation by state, 
        //burn size; total burn size for state by county, 
        //burn size; average burn size for nation by state, 
        //burn size; average burn size for state by county
        //burn duration; average burn duration for nation by state
        //burn duration; average burn duration for state by county
    
    
//}






//returnVar Function - look at what dataset is selcted for each function and return a set of variables needed for the creation of the charts
//function returnVar(data, [filter variable - dataset selcetion], which function called it){
    //ifstatements using the which function called variable to setup the returns
    //if (callFunct == "Pie"){ 
        //filter data 
        //use filter variables to determine what data is being used (state, county, cause)
        //if (dataTypeVar == "State"){ //set lables to be state }
        //else if (dataTypeVar == "County"){ //need to select state (layer select maybe on chart?), filter out data by that state, and set lables to counties in state we have data for }
        //else if (dataTypeVar == "Cause"){ //set lables to be cause }
        //return label information
        //}
    //else if (callFunct == "Bubble"){ //run setupBubble function }
    //else if (callFunct == "Table"){ //run setupTables function }
//}