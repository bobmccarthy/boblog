var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = React.createClass({
	componentWillMount: function() {

		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	componentDidMount: function(){
		$( document ).ready(function(){
			$('.button-collapse').sideNav({edge: 'right',closeOnClick: true})
		})
	},
	render: function() {
		var currentPage = Backbone.history.getFragment();
		
		var links = [
			<li key="home" className={currentPage === '' ? 'active' : ''}><a href="#"><img className="img" src="https://lh4.ggpht.com/o9dJVjLhcIeZ7SiKrNP3iVUysynDtp7G27iPvQPus4fMoxS5M1dycsq2CJR0yeq5pNA=w300" /></a></li>
		];

		if(Parse.User.current()) {
			console.log(Parse.User.current().get('username'));
			
			var namesky=(<a href="#" className="brand-logo center">{Parse.User.current().get('username')}, that is you!</a>)
			links.push(<li key="settings" className={currentPage === 'settings' 	? 'active' : ''}><a href="#settings"><img className="img" src="http://www.clipartbest.com/cliparts/Rid/j76/Ridj766i9.png" /></a></li>)
			links.push(<li key="addPost" className={currentPage === 'addPost' 	? 'active' : ''}><a href="#addPost"><img className="img" src="http://www.clker.com/cliparts/w/w/q/8/l/l/orange-plus-hi.png" /></a></li>)
			links.push(<li key="logout"><a href="#logout" onClick={this.onLogout}><img className="img" src="http://www.cliparthut.com/clip-arts/181/logout-icon-181922.png" /></a></li>)
		}
		else {
			links.push(<li key="login" className={currentPage === 'login' 		? 'active' : ''}><a href="#login">Login</a></li>);
			links.push(<li key="register" className={currentPage === 'register' 	? 'active' : ''}><a href="#register">Register</a></li>);
		}


		return (
			
				<div className="nav-wrapper">
					{namesky}
					<a href="#" className="brand-logo left b">B</a>
					<img className="logo left" className="log" src="http://images.clipartpanda.com/log-clip-art-log.svg"/>
					
					<a href="#" data-activates="mobile-demo" className="button-collapse right"><i className="material-icons">menu</i></a>
					
					<ul className="right hide-on-med-and-down">
						
						{links}
						
					</ul>
					<ul className="side-nav" id="mobile-demo">
						
						{links}
						
					</ul>
				</div>
			
		);

		
	},
	onLogout: function(e) {
		console.log('logout');
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('logout', {trigger: true})
	}
})