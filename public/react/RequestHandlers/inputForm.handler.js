// Module that handles requests to the server for the input form

module.exports = {

	performCalculation: function(a, b, cb) {
		$.ajax({
            type: 'GET',
            url: '/bitsum?a='+a+'&b='+b, //API request endpoint
            contentType: 'application/json; charset=UTF-8',
            success: function(charge) {
            	cb(null, charge);
            }.bind(this),
            error: function() {
            	cb('err');
            }
        });
	},

      clearDatabase: function(cb) {
            $.ajax({
            type: 'GET',
            url: '/bitsum/delete', //API request endpoint
            contentType: 'application/json; charset=UTF-8',
            success: function() {
                  cb(null);
            }.bind(this),
            error: function() {
                  cb('err');
            }
        });
      },      

}