var nconf = require('nconf');

nconf.env('__'); // ??

var config = {
	DATABASE: process.env.NODE_ENV === 'production' ? 'mongodb://admin:florbal@ds029224.mongolab.com:31701/library' : 'mongodb://localhost:27017/library_database',
	PORT: process.env.PORT || 4712
};

nconf.defaults(config);

module.exports = nconf.get();
