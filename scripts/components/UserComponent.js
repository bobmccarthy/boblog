var React = require('react');
var $ = require ('jquery');
var UserModel = require('../models/UserModel');
var query = new Parse.Query(UserModel);

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			user: null,
			error: null 
		};
	},
	componentWillMount: function() {
		query.get(this.props.user).then(
			(user) => {
				console.log('made it');
				this.setState({
					user: user
				});
			},
			(err) => {
				this.setState({
					error: err.message
				})
			}
		)
	},
	render: function() {
		var errorElement=null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		var content = <img className="loading" src="http://4vector.com/thumb_data/v4l-133092.jpg"/>
		if(this.state.user) {
			content = (
				<div>
					<div className="row col s12">
						<img src={this.state.user.get('photo')}/>
					</div>
					<div className="row col s12">
						<div><h2>{this.state.user.get('username')}</h2></div>
					</div>
					<div className="row col s12">
						<div>{this.state.user.get('email')}</div>
					</div>
					<div className="row col s12">
						<div>Posted By {this.state.user.get('about')}, in the category: {this.state.post.get('category')}</div>
					</div>
				</div>
			)
		}
		return (
			<div className="container">
				{content}
			</div>
		);
	}

});


