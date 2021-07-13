# Teams Clone App

A video calling web application which is a clone of the Microsoft Teams App made using WebRTC, PeerJS, Socket.io, NodeJS, ExpressJS. 


# Features
Teams Clone App is a fully functional prototype of MS Teams which allows users to join and communicate with each other in real time over chat and video call. This is a single-page resonsive web app with all the main components of a video conferencing call like video calling, communication through chat, sending invites to people. Kindly grant audio/video permissions when prompted. It works on a local network. The app offers the following features:
  1.  Start or join a video call with just your name/nickname or anonymously
  2.  Have group calls with upto 4 people
  3.  Invite more people to call by sending Email Invites or by sending the room link manually
  4.  Chat for informative messages from a bot as well as interacting with other members
  5.  Light and Dark modes
  6.  Easy Talk Mode for easy muting/unmuting, video on/off and leaving call
  7.  Participant list to display current users in call
  8.  Show/Hide Participants and Chat with a click
  9.  Mute/unmute yourself, switch your video on or off with a click
  10.  Simple, intuitive and elegant UI and a good UX
  
## Start A Call ##
Start a call simply by clicking on the app link. Enter your name or a nickname when prompted to and click on 'OK' or you may choose to leave the name field blank and join anonymously.

## Join a Call ##
If you have received an email invite, simple click on the link in the email which will directly take you to the room where your friend is waiting for you in the call!
You may also join by using the room link your friend sends you for the call. Simply paste it in your browser, enter your name and enjoy the call.

## Chat ##
You can use the chat to talk to other users in the call. These chat messages will have your name and date and time when they were sent. Click on the chat icon on the navigation bar to the left. You may hover over options to see which says 'Show Chat'. The chat will open up on the right of the screen if not already open. Type your message at the bottom where the placeholder suggests and press enter. You have just sent a message to all the people in the call! For viewing all messages, the chat has a scroll bar. The bot notifies all users in the room and conveys information like which user left or joined the call through differently formatted chat messages so that you can distinguish.

## Participant List ##
The participant list on the left shows all participants in the room identified by their usernames. If not already open, you may click at the participants symbol on the navigation bar. You may hover on the buttons in the nav bar on the left to see which button shows/hides the participant list.
  
  ## Mute/Unmute yourself ##
 You can mute or unmute yourself by clicking on the mic button in the center below the videos. If you are muted, the button turns red. This a main meeting control. It can be hidden by pausing Easy Talk Mode.
 
 ## Switch your video On/Off ##
 You can on or off your video by clicking on the video/camera button in the center below the videos. If your video is off, the button turns red. This a main meeting control. It can be hidden by pausing Easy Talk Mode.
 
 ## Leave Call ##
 You can leave the call by clicking on the Leave button with a slash line on the phone. You will be prompted to make sure if you are ready to leave. Click 'OK' to leave otherwise click 'CANCEL' and you will still be in the call. This a main meeting control. It can be hidden by pausing Easy Talk Mode.
 
  ## Easy Talk Mode ##
  The Easy Talk Mode allows users to hide the main controls panel consisting of the mute/unmute, video on/off and leave call options. This helps users to focus on the screen and interact through the chat in a long meeting without the fear of accidentally clicking on these options and unmuting, switching your video on or leaving call. In a way, pausing the Easy Talk Mode provides safety from accidentally unmuting, switching your video on and getting through a meeting without the fear of doing so. This can be toggled using the circular play or pause button in the navigation bar on the left.
  
  ## Light or Dark Mode ##
 You can pick whatever colour suits you best - soothing blues in the light mode or bold blues in the dark mode. All the buttons and display items will change colours according to your picked theme. You can toggle between these modes by clicking on the circular button at the top in the navigation bar to the left. A sun indicates you are using light mode while a moon indicates dark mode.
 
 ## Invite More People ##
 You can copy the room link to your clipboard and then forward it your friends by clicking the user plus button in the navigation bar on the left. Otherwise you can also send email invites to your friends by providing their Gmail adresses when prompted on clicking the mail button in the nav bar. Upto 4 people can join the call. 
  
 # Demo 
[Here](https://hidden-plateau-48120.herokuapp.com/) is a link for the live demo of the web app.

# Building the Application

## Agile Methodology ##
Built in a month with each sprint one week long, the application was built following the priniciples of Agile Methodology. A weekly review is given below:
#### Week 1 ####
Refreshing web development basics, getting familiar with NodeJS, ExpressJS, intitial Research work, deciding on APIs and libraries to use, ended with a plan and design for the project
#### Week 2 ####
Implemented basic functionality to let two people connect and communicate through video call, added mute/unmute, switching video on/off, leave call feature, ended with an app with main meeting controls and basic UI
#### Week 3 ####
Added additional features like displaying participants in call, sending invites through email, EasyTalk Mode, etc. ended with a web app with additional features
#### Week 4 ####
Implementing chat option, improving UI, final changes and deploying the app, ended with a fully functional prototype will all basic features in the Microsoft Teams App


