'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require ('jquery');
window.$ = require('jquery');
window.jQuery = $;


Parse.initialize('D8YIsuFK4NAiWa9A1QzIqnnJaoUp2LRqHBZqUFY8', 'zCY2YO1jeKWbEuIjU2zLaY7hVw1jmZp7pRrcNQ8D');

var NavComponent = require('./components/NavComponent');
var ListComponent = require('./components/ListComponent');
var SingleComponent = require('./components/SingleComponent');
var PostFormComponent = require('./components/PostFormComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');
var SettingsComponent = require('./components/SettingsComponent');


var nav = document.getElementById('nav');
var main = document.getElementById('main');

$(document).ready(function(){

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'register': 'register',
			'addPost': 'addPost',
			'details/:id': 'details',
			'settings': 'settings',
			'logout': 'home'
			

		},
		home: function() {
			ReactDOM.render(<ListComponent />, main);
			if (Parse.User.current()){
				var url;
				console.log(Parse.User.current().get('background'));
				if (Parse.User.current().get('background')=='pallate'){
					url= 'url("http://www.planwallpaper.com/static/images/colorful-triangles-background_yB0qTG6.jpg")';
				}
				else if (Parse.User.current().get('background')=='horizon'){
					url= 'url("http://4vector.com/i/free-vector-beautiful-trend-background-05-vector_015375_beautiful_trend_background_05_vector.jpg")';
				}
				else if (Parse.User.current().get('background')=='black'){
					url= 'url("http://www.planwallpaper.com/static/images/6790904-free-background-wallpaper.jpg")';
				}
				else if (Parse.User.current().get('background')=='swirl'){
					url= 'url("http://www.clothedinscarlet.org/wp-content/uploads/2014/04/BlueSwirl_background.jpg")';
				}
				var body = document.getElementById('body');
				body.style.backgroundImage= url;
			}else{
				var body = document.getElementById('body');
				body.style.backgroundImage= '';
			}
		},
		login: function() {
			ReactDOM.render(<LoginComponent router={r} />, main)
		},
		register: function() {
			ReactDOM.render(<RegisterComponent router={r} />, main)
		},
		addPost: function() {
			ReactDOM.render(<PostFormComponent />, main)
		},
		details: function(id){
			
			ReactDOM.render(<SingleComponent postId={id}/>, main)
		},
		settings: function(){
			ReactDOM.render(<SettingsComponent router={r} />, main)
		}
	});

	var r = new Router();
	Backbone.history.start();

	ReactDOM.render(
		<NavComponent router={r} />,
		nav
	);
	
})