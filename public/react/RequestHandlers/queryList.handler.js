// Module that handles request to the database for past queries

module.exports = {

	getQueryList: function(cb) {
		$.ajax({
            type: 'GET',
            url: '/bitsum/queries', //API request endpoint
            //data: JSON.stringify({}),  //NEED THESE       
            contentType: 'application/json; charset=UTF-8', //NEED THESE
            success: function(queries) {
            	cb(null, queries);
            }.bind(this),
            error: function() {
            	cb('err');
            }
        });
	}

}