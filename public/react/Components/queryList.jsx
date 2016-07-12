var React = require('react');
var ReactDOM = require('react-dom');
var requestHandler = require('../RequestHandlers/queryList.handler.js');


var QueryList = React.createClass({

	getInitialState: function() {
		return {queries: []};
	},

    componentDidMount: function() {     

        // handle socket communication for live updates
        var socket = io.connect('http://localhost:3000/');
        socket.on('calcPerformed', function(res) {
            var myQueries = this.state.queries;
            myQueries.unshift(res);
            this.setState({queries: myQueries});
        }.bind(this));

        socket.on('historyCleared', function() {
            this.setState({queries: []});
        }.bind(this));        

        // gets initial data from the server to populate list
        requestHandler.getQueryList(function(err, res) {
			if (err) {
				this.setState({queries: []});
			}
			this.setState({queries: res});
		}.bind(this));
    },

	render: function(){
		return 	(<ul className='collection'>
				{this.state.queries.map(function(query, key) {
					var timeString = createDateString(query.time);
					return (
						<li key={key} className="collection-item avatar">
							<i className="circle">{query.used}</i>
							<span className="title">BitSum: {query.bitsum}</span>
							<p>Number A: {query.A}</p>
							<p>Number B: {query.B}</p>
							<p>Date: {timeString}</p>
						</li>
					);
				}.bind(this))}
				</ul>
				);
	}
});

// helper function to put date in readable format
function createDateString(isoDateString) {
	var toRet = new Date(isoDateString);
	return toRet.toString();
}

module.exports = QueryList;