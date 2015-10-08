var React = require('react');
var PostModel = require('../models/PostModel');
var query = new Parse.Query(PostModel);

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         posts: [] 
	    };
	},
	componentWillMount: function() {
		console.log('yay!');
		if (this.props.postId){
			
			query.get(this.props.postId).then(
				(postModelFromServer) => {
					this.setState({
						posts: postModelFromServer
					});
				},
				(err) => {
					this.setState({
						error: err.message
					})
				}
			);
		}else{
			query
			.find().then(
				(posts) => {
					this.setState({posts: posts});
				},
				(err) => {
					console.log(err);
				}
			);
		}
		

	},
	render: function() {
		var that = this;
		var postElements = this.state.posts
		.map(function(post) {
		return (

			<div className="post">
				<img src={post.get('userPic')} alt="" className="circle responsive-img userPic"/>
				<div><h2><a href={'#/'+post.id}>{post.get('title')}</a></h2></div>
				<div className="date">{post.get('date')}</div>
				
				<div>{post.get('body')}</div>
				<div><img className="postPic" src={post.get('picUrl')} /></div>
				
				<div>Posted By {post.get('user')}, in the category: {post.get('category')}</div>
				<a className="waves-effect waves-light btn"><i className="material-icons left">thumb_up</i>{post.get('likes')} Likes</a>
			</div>
			);
		}).reverse();

		return (
			<div className="container">
				{postElements}
			</div>
		);
	}
	
});