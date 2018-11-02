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
var reservations = [
  {
    resID: 01,
    name: "Yoda Yoda",
    party: 1,
    time: Date(2018, 11, 24, 9, 00),
    phone: 555-555-0000,
    table: 5
  },
  {
    resID: 02,
    name: "Luke Skywalker",
    party: 4,
    time: Date(2018, 11, 24, 10, 00),
    phone: 555-555-0001,
    table: 8
  },
  {
    resID: 03,
    name: "Han Solo",
    party: 2,
    time: Date(2018, 11, 24, 8, 00),
    phone: 555-555-0002,
    table: 9
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays a single character, or returns false
app.get("/api/reservations/:reservations", function(req, res) {
  var chosen = req.params.reservations;

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

  // Using a RegEx Pattern to remove spaces from newreservations
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservations);

  reservations.push(newReservations);

  res.json(newReservations);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
