# WLE_Cardboard_Components
These are component in wonderland engine designed for integrating user inputs from mobile based VR (google cardboard and similar mobile headsets)  to Wonderland engine 

![cardboard_demo](https://user-images.githubusercontent.com/68344430/134125466-5bf326f9-b400-49ed-b076-17c87e0b4ef5.gif)


# cardboard_Control.js

This enables the user to look anywhere and move forward in the same direction by long pressing the click button  ( usually seen in top of headsets )


Components :

![card_board_controll](https://user-images.githubusercontent.com/68344430/134126310-9bbbe6aa-a594-4e26-a3c4-e4750878293c.JPG)


Speed             : How faster you want to move forward , default value is set to .02 meter/seconds \
Starting delay    : How much seconds should we wait after pressing the click button to start moving ( used when clickstart event is assigned to any other funtion)\
Cardboard_camera  : Use Vr camera for this parameter (eye left or eye right )

# Cardboard_double_click.js

(add this component over the object in which you want to do the funtion on, after double clicking ) 

This enables User to do a funtion on double click.
The default funtion is set to rotate the Object over time but you can change the function in Cardboard_double_click.js where it specifies *replace with your funtion* 

![Double_click](https://user-images.githubusercontent.com/68344430/134128243-b43e1062-8dbd-4e0c-8493-828bf24f09a5.JPG)

Components : 

Time gap    :the time gap between the first click and second click which is required to trigger the funtion


# set_boundary.js

Restrict players locomotion outside a rectangular space 

left_bound  : left boundary limit in meters 
right_bound : right boundary limit in meters 
front_bound : front boundary limit in meters 
top_bound   : top boundary limit in meters 
restrictY   : Tick to restrict Y axis of  player in player's height ( boolian :true / false )
height      : player's height in meters
