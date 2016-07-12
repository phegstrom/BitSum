var express = require('express');
var router = express.Router();
var Query = require('../models/Query');
var io;

// Handles a GET request to the /bitsum endpoint
// expects two numbers in the query string: a, b
router.get('/', function(req, res, next) {
	var num1 = req.query.a;
	var num2 = req.query.b;

	var numBits = calculateBitSum(num1*num2);

	// Determine number of past queries made to the server
	Query.count({}, function (err, count) {

		// create new query document to save to DB
		var myQuery = new Query({
								bitsum: numBits,
								A: num1,
								B: num2,
								used: count+1
							});
		myQuery.save(function(err, doc) {
			// web sockets, emit signal to front end with the newly created json object
			io.emit('calcPerformed', doc);
			res.send(doc);
		});
	});		

});

// Route to delete all Query instances in the DB
router.get('/delete', function(req, res, next) {
	Query.remove({}, function (err, resp) {
		// web sockets, emit signal
		io.emit('historyCleared');
		res.redirect('/');
	})
});

// Return an array of queries to the front-end
router.get('/queries', function(req, res, next) {
	Query.find({}, null, {sort: {used: -1}},function (err, queries) {
		res.send(queries);
	});
});

// Function to calculate the number of 1s in the binary representation
// for the given number
function calculateBitSum(num) {
	var count = 0;
	while (num != 0) {
		count += num % 2;
		num = Math.floor(num/2);
	}
	return count;
}


module.exports = router;

// web sockets initialization, allows the 'main' file, ./bin/www to 
// share the socket object with this route file
module.exports.giveSocket = function(ioSocket) {
	io = ioSocket;
}