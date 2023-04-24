# Project3-Wildfires

U.S. Wildfires 2023 Dashboard 

Purpose:

We seek to create a base model that can eventually be expanded upon that is able to visualize the distributions of wildfires and consolidate information relating to their root causes. This data could be utilized by governing agencies, first responders, and the general public to help identify if their location is at high risk of wildfires; by including the root causes it would provide an idea to these groups on what their risk factors are allowing for them to make better decisions on where to focus prevention efforts.

Our Process:

1. Data updates and CSV cleanup using Jupyter Notebook
2. More CSV cleanup, geojson creation and DB creation using SQL
3. Javascript file and visualization creation
4. Flask creation
5. Html integration

Interactive Visualizations: These visualizations are representations of all fire occurences since the start of 2023- April 16th, 2023 which was when the data was collected.

Bubble Chart
The Bubble Chart shows fire intensity, including frequency, duration, and area affected. The legend on the left can be used to filter the data shown by cause. Hovering over a data point will display relevant stats including the name assigned to the wildfire incident; the county and state of origin, as well as the coordinates; fire duration in hours; burn area of the fire; and fire cause. Additionally, by clicking and dragging your cursor over an area of the chart you can zoom into that area to get a better view of the data.
![newplot (1)](https://user-images.githubusercontent.com/119901186/234125268-25ee7583-aeb1-4a43-8ca7-07ad19044586.png)

Pie Chart
The Pie Chart shows a breakdown of the wildfire cause ratios. Using the legend you can toggle a cause on or off to affect the chart's view.

![newplot](https://user-images.githubusercontent.com/119901186/234125317-b4905de7-d4ce-4b2d-8866-8cc6cb6c51e2.png)

Heatmap:
This map allows you to see the location of all fires that have occurred in the time fram that we observed.
<img width="1393" alt="Screenshot 2023-04-23 at 9 14 44 PM" src="https://user-images.githubusercontent.com/119901186/234125344-9ebaed30-0667-4ec4-99d5-c64a090a2b0c.png">

Cluster Map:
This map allows you to interact with markers that represent each fire. Each marker says the fire name, location and the cause of the fire. The causes are either Natural, Human, or Undetermined/000.
<img width="690" alt="Screenshot 2023-04-23 at 9 07 42 PM" src="https://user-images.githubusercontent.com/119901186/234125358-bf4dd388-dc11-4b50-bc19-48b1f48245b7.png">
