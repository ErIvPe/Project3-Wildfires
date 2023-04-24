
axios.get('/api/fire_class')
  .then(function (response) {
    console.log(response);
    const data = response.data;
    //console.log(data);
    
    /*panel_data = {features: { properties: {fire_class: ""}}};
    panel_output = ""
    panel_ouput += "<br>";
        for (let panel of Object.keys(state_fire_class[selectedState])) {
            result += fire_class + ": " + state_fire_class[selectedState][fire_class] + " fire(s)<br>";
        }
    
    document.getElementById("panel").innerHTML = panel_data;
    const panel = document.getElementById("panel");
    panel.innerHTML = panel_data.features.properties.fire_class;*/
 
    // Div variable
    let fbsDiv = document.getElementById("fbs");

    // Get data and count for states, counties, and fire class
    let state_counties = {};
    let state_fire_class = {};
    for(let i = 0; i < data.features.length; i++) {
        let state = data.features[i].properties.fire_state;
        let county = data.features[i].properties.county;
        if(!(state in state_counties)) {
            state_counties[state] = {};
        }
        if(!(county in state_counties[state])) {
            state_counties[state][county] = 1;
        } else {
            state_counties[state][county] += 1;
        }
        if(!(state in state_fire_class)) {
            state_fire_class[state] = {
                'Class A': 0,
                'Class B': 0,
                'Class C': 0,
                'Class D': 0,
                'Class E': 0,
                'Class F': 0,
                'Class G': 0
            };
        }
        state_fire_class[state][data.features[i].properties.fire_class] += 1;
    }
    console.log(state_counties);
    console.log(state_fire_class);

    // Create the dropdown
    let dropdown = document.createElement('select');
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select a state';
    dropdown.add(defaultOption);
    
    // Add an option for each state
    let stateOptions = Object.keys(state_counties).sort((a, b) => {
        a = a.replace("US-", "");
        b = b.replace("US-", "");
        return a.localeCompare(b);
    });

    for (let state of stateOptions) {
        let option = document.createElement('option');
        option.value = state;
        option.text = state.replace("US-", "");
        dropdown.add(option);  
    }

 
    
    // Add event listener to the dropdown to display county and fire class data
    dropdown.addEventListener('change', function() {
        let selectedState = dropdown.value;
        let counties = state_counties[selectedState];
        
        let result = "";
        let countyList = Object.entries(counties).sort((a, b) => a[0].localeCompare(b[0]));
        for (let [county, fireCount] of countyList) {
            result += county + ": " + fireCount + " fire(s)<br>";
        }
        result += "<br>";
        for (let fire_class of Object.keys(state_fire_class[selectedState])) {
            result += fire_class + ": " + state_fire_class[selectedState][fire_class] + " fire(s)<br>";
        } 

        
        document.getElementById("fbs-results").innerHTML = result;
        
    });

    dropdown.classList.add("fbs-dropdown");
    // Add the dropdown to the div
    fbsDiv.appendChild(dropdown);



    })

    .catch(function(error){
        console.log(error)
    });
    
    
    
    


    
    
    
    



