
from flask import Flask, jsonify, render_template, request, redirect
import json
#import os

# Initialize an instance of Flask
app=Flask(__name__)




# Root/Home url
@app.route('/')
def index():
    with open('wildfire_db.geojson') as f:
        geojson1 = json.load(f)
    with open('wildfire_db1.geojson') as f:
        geojson2 = json.load(f)
    with open('cleanedWF_ChartTrim.geojson') as f:
        geojson3 = json.load(f)
    return render_template('index.html', geojson1=json.dumps(geojson1), geojson2=json.dumps(geojson2), geojson3=json.dumps(geojson3))
    

@app.route('/map')
def map():
    return render_template("map.html")
    


# Route that returns the wildfire_db.geojson
@app.route('/api/wildfires')
def get_wildfires():
    with open('wildfire_db.geojson') as f:
        data = json.load(f)
    return jsonify(data)


# Route that returns the fire_class data
@app.route('/api/fire_class') 
def get_fire_class():
    with open('wildfire_db.geojson') as f:
        data = json.load(f)
        for feature in data["features"]:
            acres = feature["properties"]["acres"]
            fire_class = ""
            if acres < 0.25:
                fire_class = "Class A"
            elif acres < 10:
                fire_class = "Class B"
            elif acres < 100:
                fire_class = "Class C"
            elif acres < 300:
                fire_class = "Class D"
            elif acres < 1000:
                fire_class = "Class E"
            elif acres < 5000:
                fire_class = "Class F"
            elif acres < 100000:
                fire_class = "Class G"
            feature["properties"]["fire_class"] = fire_class
    return jsonify(data)


# Route that returns the wildfire_db1.geojson data
@app.route('/api/db1')
def get_db1():
    with open('wildfire_db1.geojson') as f:
        data = json.load(f)
    return jsonify(data)



# Route that returns the cleanedWF_ChartTrim.geojson data
@app.route('/api/cleanedWF')
def get_cleanedWF():
    with open('cleanedWF_ChartTrim.geojson') as f:
        data = json.load(f)
    return jsonify(data)




if __name__ == '__main__':
    app.run(debug=True)