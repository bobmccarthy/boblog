var React = require('react');

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
						<h1>Register Here</h1>
						{errorElement}
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="name" className="validate" id="reg_name" />
								<label htmlFor="reg_name">User Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="email" className="validate" id="email_address" />
								<label htmlFor="email_address">Email Address</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="password" ref="password" className="validate" id="password" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="photo"  id="photoP" />
								<label htmlFor="photoP">Your Pic URL</label>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Register</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		console.log(this.refs.name.value)
		console.log(this.refs.password.value)
		console.log(this.refs.email.value)
		e.preventDefault();
		var user = new Parse.User();
		user.signUp(
			{
				username: this.refs.name.value,
				password: this.refs.password.value,
				email: this.refs.email.value,
				photo: this.refs.photo.value,
				about: '',
				numPosts: null
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
			}
		);
	}
});