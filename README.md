# Fullstack Demo
This is a worked example for the IT-subjects in highschool, which shows how to implement a simple fullstack application. It uses HTML and Javascript for the frontend. The backend consists of a NodeJS server with ExpressJS, which connects to a local MongoDB database. This example is relevant for teaching concepts such as:

- The HTTP protocol
- Multi-tier Architecture
- The Javascript "fetch" method
- MongoDB, ExpressJS and NodeJS
- Javascript Object Notation (JSON)
- Find, Insert, Update and Delete
- Password hashing


## Prerequisites
### MongoDB
To use this demo, you will need access to a MongoDB database. By default, this demo will try to connect to a local MongoDB database on the computer. Alternative, a remote MongoDB database can be used, just change the URL in the server.js file. 
Please refer to the [MongoDB manual](https://docs.mongodb.com/manual), for more information on how to install and use MongoDB.

### NodeJS
To run the server, you will need NodeJS. If you have NodeJS installed, then navigate to the project folder via command prompt. Then type "npm install" and hit enter, to install the dependencies. Then type "node server.js" and hit enter to run the server. Finally to open the app, open up your browser and enter "localhost:3001" into the address-bar.
Please refer to the [NodeJS manual](https://nodejs.dev/learn), for more information on how to install and use MongoDB.

## Notes
Remember to configure the username to be unique, so users cannot have the same username.
This can be done by connecting to the database via MongoDB Compass with the following string:
- mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
