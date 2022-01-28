// import the neccessary libraries
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

// configure express server
app.use(express.static("./"));
app.use(express.json());
const port = 3001;

// configure database connection
let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

// configure security parameters
const saltRounds = 10;

// get request at root
app.get("/", (request, response) => {
  response.sendFile("/index.html");
});

// insert new highscore
app.post("/highscore", (request, response) => {
	console.log("Inserting highscore: " + request.body.name + ", " + request.body.score);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: request.body.name, score: request.body.score};
    dbo.collection("highscores").insertOne(myobj, function(err, res) {
      if (err) throw err;

      console.log("Inserted: " + JSON.stringify(myobj))
      response.header("Access-Control-Allow-Origin", "*");
      response.json(myobj);
      db.close();
    });
  });
});

// my comments
app.post("/comment", (request, response) => {
	console.log("Inserting comment: " + request.body.Comment);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = request.body;
    dbo.collection("comments").insertOne(myobj, function(err, res) {
      if (err) throw err;

      console.log("Inserted: " + JSON.stringify(myobj))
      response.header("Access-Control-Allow-Origin", "*");
      response.json(myobj);
      db.close();
    });
  });
});

// get comments
app.get("/comments", (request, response) => {
	console.log("Finding comments... ");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("comments").find({}).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      response.header("Access-Control-Allow-Origin", "*");
      response.json({comments: result});
      db.close();
    });
  });
});

// delete comment
app.delete("/user", async (request, response) => {

  try{ //fanger fejl

  console.log("Deleting user: " + request.body.name);

  let passwordIsCorrect = await checkPassword(
    request.body.username,
    request.body.password
  );

  if(!passwordIsCorrect) {
    response.json({message: "Deletion Unuccessful"});
    console.log("Deletion failed")
  }

  let db = await MongoClient.connect(url);
  let dbo = db.db("mydb");
  let myquery = {username: request.body.username};
  let result = dbo.collection("users").deleteOne(myquery);
  
  console.log("Deleted: " + JSON.stringify(myquery));
  response.json({
    message: "Successfully deleted",
    user: myquery.username
  });
  db.close();
}
catch (err){ // stopper her
  console.log(err);
}
   
});

// get specific highscore
app.get("/highscore/:name", (request, response) => {
	console.log("Finding highscores... ");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("highscores")
    .find({name: request.params.name})
    .toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      //response.header("Access-Control-Allow-Origin", "*");
      response.json({highscores: result});
      db.close();
    });
  });
});

// get all highscores
app.get("/highscores", (request, response) => {
	console.log("Finding highscores... ");

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("highscores").find({}).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      response.header("Access-Control-Allow-Origin", "*");
      response.json({highscores: result});
      db.close();
    });
  });
});

// delete highscore
app.delete("/highscore", (request, response) => {
	console.log("Deleting highscore: " + request.body.name);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { name: request.body.name };
    dbo.collection("highscores").deleteOne(myquery, function(err, obj) {
      if (err) throw err;

      console.log("Deleted: " + JSON.stringify(myquery));
      response.header("Access-Control-Allow-Origin", "*");
      response.json(myquery);
      db.close();
    });
  });
});

// updating highscore
app.put("/highscore", (request, response) => {
	console.log("Updating highscore of " + request.body.name + " to " + request.body.score);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { name: request.body.name };
    var newvalues = { $set: {score: request.body.score } };
    dbo.collection("highscores").updateOne(myquery, newvalues, function(err, obj) {
      if (err) throw err;

      console.log("Updated score of: " + request.body.name + " to " + request.body.score)
      response.header("Access-Control-Allow-Origin", "*");
      response.json({name: request.body.name, score: request.body.score});
      db.close();
    });
  });
});

// new user signup
app.post("/user/signup", async (request, response) => {

  // hash the password
  let hash = await bcrypt.hash(
    request.body.password, saltRounds);

  console.log(
    "Inserting new user: " +
    request.body.username + ", " + hash
  );
    

  // connect to the database
  let db = await MongoClient.connect(url);

  let dbo = db.db("mydb");
  let myobj = {
        username: request.body.username, 
        hash: hash
  };

  // try to insert the new user
  try {
    let result = await dbo.collection("users").insertOne(myobj);
    console.log("Created user:", myobj)
    response.json(myobj);
  }
  catch (error){
    console.log("Username occupied:", myobj)
    response.json({message: "Username occupied"});
  }

  db.close();
});

// user login
app.post("/user/login", async (request, response) => {

  let passwordIsCorrect = await checkPassword(
    request.body.username,
    request.body.password
  );

  // normally return an authentication token here
  if(passwordIsCorrect) response.json({loginWasSuccessful: true});
  else response.json({loginWasSuccessful: false});
  
});

app.delete("/user", async (request, response) => {

  try{ //fanger fejl

  console.log("Deleting user: " + request.body.name);

  let passwordIsCorrect = await checkPassword(
    request.body.username,
    request.body.password
  );

  if(!passwordIsCorrect) {
    response.json({message: "Deletion Unuccessful"});
    console.log("Deletion failed")
  }

  let db = await MongoClient.connect(url);
  let dbo = db.db("mydb");
  let myquery = {username: request.body.username};
  let result = dbo.collection("users").deleteOne(myquery);
  
  console.log("Deleted: " + JSON.stringify(myquery));
  response.json({
    message: "Successfully deleted",
    user: myquery.username
  });
  db.close();
}
catch (err){ // stopper her
  console.log(err);
}
   
});

async function checkPassword(username, password) {


    let db = await MongoClient.connect(url);
    let dbo = db.db("mydb");

    let result = await dbo.collection("users")
    .find({username: username}).toArray();

    let isPasswordCorrect;
    if (result[0] != undefined)
    isPasswordCorrect = await bcrypt
    .compare(password, result[0].hash);
    else isPasswordCorrect = false;

    db.close();
    return isPasswordCorrect;
}


// start server
app.listen(port, () => console.log("Listening on port " + port));
