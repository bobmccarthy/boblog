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


var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'login': 'login',
		'register': 'register',
		'addPost': 'addPost',
		'logout': 'home',
		'details/:id': 'details',
		'settings': 'settings'
		

	},
	home: function() {

		ReactDOM.render(<ListComponent />, main);
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
