var Pot = require('./models/pot');
var PlayersCollection = require('./collections/players');
var TicketsCollection = require('./collections/tickets');
var BallsCollection = require('./collections/balls');
var ResultsCollection = require('./collections/results');

window.AppData = {};

AppData.pot = new Pot();
AppData.players = new PlayersCollection();
AppData.results = new ResultsCollection();

// Balls and tickets list
var numbers = [];
for (var i = 1; i <= 50; i++) { numbers.push({id: i}); }
AppData.tickets = new TicketsCollection(numbers);
AppData.balls = new BallsCollection(numbers);

// Payouts for the 3 winners
AppData.payouts = [0.75, 0.15, 0.10];