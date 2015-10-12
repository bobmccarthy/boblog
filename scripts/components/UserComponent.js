var React = require('react');

var $ = require ('jquery');
var UserModel = require('../models/UserModel');
var PostModel = require('../models/PostModel');

var query = new Parse.Query(UserModel);
var query2 = new Parse.Query(PostModel);

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			user: null,
			posts: [],
			error: null 
		};
	},
	componentWillMount: function() {
		var that=this;
		query.equalTo('username', ''+this.props.user+'')
		.first({
			success: (result) => {
        		this.setState({
					user: result
				});
   			},
    		error: (error) => {
       	 		console.log('didnt find it');
       	 		this.setState({
					error: err.message
				})
    		}
		});
		query2.equalTo('user', ''+this.props.user+'');
		query2.find({
				success: (result) => {
				console.log(result);
        		that.setState({
					posts: result
				});
   			},
    		error: (error) => {
       	 		console.log('didnt find it');
       	 		that.setState({
					error: err.message
				})
    		}
		});
			
			
		
	},
	render: function() {
		var errorElement=null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		console.log(this.state.posts);
		var postElements = this.state.posts
		.map(function(post) {
		return (

			<div className="post">
				<div><h2><a href={'#details/'+post.id}>{post.get('title')}</a></h2></div>
				<div className="date">{post.get('date')}</div>
				
				<div>{post.get('body')}</div>
				<div><img className="postPic" src={post.get('picUrl')} /></div>
				
				<div>Posted By <a href={'#user/'+post.get('user')}>{post.get('user')}</a>, in the category: {post.get('category')}</div>
				<a className="waves-effect waves-light btn"><i className="material-icons left">thumb_up</i>{post.get('likes')} Likes</a>
			</div>
			);
		}).reverse();



		var content = <img className="loading" src="http://4vector.com/thumb_data/v4l-133092.jpg"/>
		if(this.state.user) {
			content = (
				<div>
					<div className="profPage postFormBack">
						<div className="row col s12">
							<img src={this.state.user.get('photo')} className="profPic"/>
						</div>
						<div className="row col s12">
							<div><h2>Hi, I am {this.state.user.get('username')}.</h2></div>
						</div>
						<div className="row col s12">
							<div>{this.state.user.get('about')}</div>
						</div>
						<div className="row col s12">
							<div>{this.state.user.get('email')}</div>
						</div>
					</div>
					
				</div>

			)
		}
		return (
			
				<div className="row">
					<div className="col s8">
						{postElements}
					</div>
					<div className="col s4 content">
						{content}
						
					</div>
				</div>
			
		);
	}

});


