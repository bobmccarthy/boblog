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
var PostFormComponent = require('./components/PostFormComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');


var nav = document.getElementById('nav');
var main = document.getElementById('main');


var Router = Backbone.Router.extend({
	routes: {
		'(/:id)': 'home',
		'login': 'login',
		'register': 'register',
		'addPost': 'addPost',
		'logout': 'home'
		

	},
	home: function(id) {
		ReactDOM.render(<ListComponent router={r} postId={id}/>, main);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, main)
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, main)
	},
	addPost: function() {
		ReactDOM.render(<PostFormComponent />, main)
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavComponent router={r} />,
	nav
);
