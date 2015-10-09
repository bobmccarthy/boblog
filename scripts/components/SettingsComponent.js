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
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onRegister}>
						<h3>Personal Info:</h3>
						{errorElement}
						<div className="row">
							<div className="input-field col s12 l6">
								<label>User Name</label>
								<input type="text" ref="name" className="validate" id="reg_name" defaultValue={Parse.User.current().get('username')}/>
								
							</div>
					
							<div className="input-field col s12 l6">
								<label>Email Address</label>
								<input type="text" ref="email" className="validate" id="email_address" defaultValue={Parse.User.current().get('email')}/>
								
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12 l6">
								<label>Password</label>
								<input type="password" ref="password" className="validate" id="password" defaultValue={Parse.User.current().get('password')}/>
								
							</div>
						
							<div className="input-field col s12 l6">
								<label>Your Pic URL</label>
								<input type="text" ref="photo"  id="photoP" defaultValue={Parse.User.current().get('photo')}/>
								
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<label>About <strong>{Parse.User.current().get('username')}</strong></label>
								<textarea type="text" ref="about"  id="about" defaultValue={Parse.User.current().get('about')}></textarea>
								
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<select className="browser-default" ref="category">
									<option value="" disabled selected>Background</option>
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
		var url='url("http://www.planwallpaper.com/static/images/colorful-triangles-background_yB0qTG6.jpg")';
		e.preventDefault();
		if (this.refs.category.value=='pallate'){
			var body = $('body');
			body.style.backgroundImage({Url: url});
		}
		var user = new Parse.User();
		user.signUp(
			{
				username: this.refs.name.value,
				password: this.refs.password.value,
				email: this.refs.email.value,
				photo: this.refs.photo.value,
				about: this.refs.about.value,
				numPosts: null
			},
			{
				success: (u) => {
					this.props.router.navigate('settings', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});