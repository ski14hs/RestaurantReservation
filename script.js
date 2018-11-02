// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================
var reservations = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations", function(req, res) {
  var chosen = req.params.newTable;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservations = req.body;

  // console.log(newReservations);

  reservations.push(newReservations);

  res.json(newReservations);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
