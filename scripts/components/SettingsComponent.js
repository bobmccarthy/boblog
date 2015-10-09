var React = require('react');
var $ = require ('jquery');

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
			<div className="container postFormBack">
				<div className="row">
					<form className="col s12" onSubmit={this.onRegister}>
						<h3>Personal Info:</h3>
						{errorElement}
						<div className="row">
							<div className="input-field col s12 l6">
								<div>User Name</div>
								<input type="text" ref="name" className="validate" id="reg_name" defaultValue={Parse.User.current().get('username')}/>
								
							</div>
					
							<div className="input-field col s12 l6">
								<div>Email Address</div>
								<input type="text" ref="email" className="validate" id="email_address" defaultValue={Parse.User.current().get('email')}/>
								
							</div>
						</div>
						<div className="row">
							
						
							<div className="input-field col s12">
								<div>Your Pic URL</div>
								<input type="text" ref="photo"  id="photoP" defaultValue={Parse.User.current().get('photo')}/>
								
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<div>About <strong>{Parse.User.current().get('username')}</strong></div>
								<textarea type="text" ref="about"  id="about" defaultValue={Parse.User.current().get('about')}></textarea>
								
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<select className="browser-default" ref="category">
									<option value="">Background</option>
									<option value="pallate">Pallate</option>
									<option value="black">Black Wood</option>
									<option value="horizon">Horizon Bubble</option>
									<option value="swirl">Blue Swirl</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="col s6">
								<button className="waves-effect waves-light btn">Save Changes</button>
							</div>
							
						</div>
					</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		
		var user = Parse.User.current();
		user.save({
			about: this.refs.about.value,
			username: this.refs.name.value,
			email: this.refs.email.value,
			photo: this.refs.photo.value,
			background: this.refs.category.value
		},
		{
			success: (u) => {
				this.props.router.navigate('', {trigger: true});
			},
			error: (u, error) => {
				this.setState({
					error: error.message
				});
			}
		});
		console.log('changed');
	}

});