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
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onLogin}>
						<h1>Login</h1>
						{errorElement}
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="name" className="validate" id="name" />
								<label htmlFor="name">Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input type="password" ref="password" className="validate" id="password" />
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Login</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onLogin: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		Parse.User.logIn(
			this.refs.name.value,
			this.refs.password.value,
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