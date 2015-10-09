var React = require('react');
var PostModel = require('../models/PostModel');
var query = new Parse.Query(PostModel);

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         post: null,
	         error:null
	    };
	},
	componentWillMount: function() {
		
		query.get(this.props.postId).then(
			(post) => {
				this.setState({
					post: post
				});
			},
			(err) => {
				this.setState({
					error: err.message
				})
			}
		)
	},
	render: function() {
		var content = <img className="loading" src="http://4vector.com/thumb_data/v4l-133092.jpg"/>
		if(this.state.post) {
			content = (
				
					<div className="post">
						<img src={this.state.post.get('userPic')} alt="" className="circle responsive-img userPic"/>
						<div><h2>{this.state.post.get('title')}</h2></div>
						<div className="date">{this.state.post.get('date')}</div>
						
						<div>{this.state.post.get('body')}</div>
						<div><img className="postPic" src={this.state.post.get('picUrl')} /></div>
						
						<div>Posted By {this.state.post.get('user')}, in the category: {this.state.post.get('category')}</div>
						<a className="waves-effect waves-light btn"><i className="material-icons left">thumb_up</i>{this.state.post.get('likes')} Likes</a>
					</div>
				
			)
		}
		return(
			<div className="container">
				{content}
			</div>
		)		
	}
});