var React = require('react');
var ReactDOM = require('react-dom');


var requestHandler = require('../RequestHandlers/inputForm.handler.js');

var InputForm = React.createClass({

	_handleSubmit: function(e) {
		e.preventDefault();
        var a = document.getElementById('numA').value;
        var b = document.getElementById('numB').value;
        if (validInput(a,b)) {
			requestHandler.performCalculation(a, b, function (err, res){
				if (err) {
					alert('Error creating charge');
					return;
				}
		        document.getElementById('numA').value = '';
		        document.getElementById('numB').value = '';
			});
        }   

	},

	_clearHistory: function() {
		requestHandler.clearDatabase(function (err){
			if (err) {
				alert('Error clearing history');
				return;
			}
		}.bind(this));
	},

	render: function(){
		return (

				<form role='form' id='compute-form' action='/bitsum' method='get' onSubmit={this._handleSubmit}>
					<div className='input-field col s6'>
						<input className='form-control' type='text' id='numA' name='a'></input>
						<label htmlFor='numA' id='numA-label'> First Number </label>
					</div>
					<div className='input-field col s6'>
						<input className='form-control' type='text' id='numB' name='b'></input>
						<label htmlFor='numB'> Second Number </label>
					</div>
					<div className='center-align'>
						<button className='waves-effect btn waves-light' type='submit'> Calculate </button>				
					</div>
					<br/>
					<div className="center-align">						
						<a className='waves-effect btn waves-light' onClick={this._clearHistory}> Clear History</a>
					</div>
				</form>

		);
	}
});

// handles form validation
function validInput(a, b) {
	if (a == '' || b == '') {
		alert('Please enter two integers')
		return false;
	}
	if (a < 0 || a > 100000000 || b < 0 || b > 100000000) {
		alert ('Integers must be between 0 and 100,000,000')
		return false;
	}
	if (a != parseInt(a,10) || b != parseInt(b,10)) {
		alert ('Inputs must be integers');
		return false;
	}
	return true;
}

module.exports = InputForm;