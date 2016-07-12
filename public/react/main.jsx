var React = require('react');
var ReactDOM = require('react-dom');

var InputForm = require('./Components/inputForm.jsx');
var QueryList = require('./Components/queryList.jsx');


// main react file component, composed of the InputForm and the
// QueryList
//
// These components are imported above
var App = React.createClass({
	render: function(){
		return (
				<div>
					<div className="col s6">
						<InputForm />
					</div>
					<div className="col s6" id='query-list'>
						<QueryList />
					</div>
				</div>
			);
	}
});

ReactDOM.render(
  <App />,
  document.getElementById('react-container')
);