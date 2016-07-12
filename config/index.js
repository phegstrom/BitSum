var conf = require('./' + (process.env.NODE_ENV || 'development') + '.js');

module.exports = conf;