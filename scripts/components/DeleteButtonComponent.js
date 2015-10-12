var React = require('react');
module.exports = React.createClass({
	render: function() {
		return (

			<a id="deletePost" href="#" onClick={deletePost} className="waves-effect waves-light btn"><i className="material-icons left">thumb_down</i>Delete</a>
			
		);
	}
	
});