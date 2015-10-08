var React = require('react');
var PostModel = require('../models/PostModel');

module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onAddPost}>
						<h1>New Post</h1>
						{errorElement}
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="title" className="validate" placeholder="Title"/>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea id="textarea1" ref="body" className="materialize-textarea" placeholder="Type post details here..."></textarea>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<input type="text" ref="image" placeholder="Image URL"/>
							</div>
							<div className="input-field col s6">
								<select className="browser-default" ref="category">
									<option value="" disabled selected>Category</option>
									<option value="funny">Funny</option>
									<option value="personal">Personal</option>
									<option value="political">Political</option>
									<option value="sad">Sad but Uplifting</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Add Post</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onAddPost: function(e) {
		e.preventDefault();
		console.log(Parse.User.current().getUsername());
		
		var x = new Date().toDateString();
		var newPost = new PostModel({
			title: this.refs.title.value,
			body: this.refs.body.value,
			image: this.refs.image.value,
			category: this.refs.category.value,
			picUrl: this.refs.image.value,
			user: Parse.User.current().getUsername(),
			userPic: Parse.User.current().get('photo'),
			date: x,
			likes: null
		});

		newPost.save();
		this.props.router.navigate('', {trigger: true});
	
	}
});