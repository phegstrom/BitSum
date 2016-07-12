var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionName = "queriesCollection";

var QuerySchema = new Schema({
	time: {type: Date, default: Date.now},
    bitsum: Number,
	A: Number,
    B: Number,
    used: Number
}, {collection: collectionName});

module.exports = mongoose.model('Query', QuerySchema);