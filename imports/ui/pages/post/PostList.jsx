import React from "react";
import {Meteor} from "meteor/meteor";
import route from "/imports/routing/router.js";
import moment from "moment";

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            likes: []
        };
        this.state = {val: "Like"}
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        Meteor.call('post.list', (err, posts) => {
            if (!err) {
                this.setState({
                    loading: false,
                    posts
                });
            }
        })
    }

    addAndRemoveLike(postId) {
        Meteor.call('post.like.unlike', postId, (err, like) => {
            if (err) {
                return console.log(err);
            }
            this.getPosts();
        });

    }

    handleRedirect() {
        route.go('/post/create');
    }

    handleRedirect1(id) {
        route.go('/post/:postId/edit', {postId: id});
    }

    handleRedirect2(id) {
        route.go('/post/:postId/view', {postId: id});
    }

    handleRemove(id) {
        Meteor.call('post.remove', id, (err, res) => {
            if (err) {
                console.log('Register error', err);
            } else {
                console.log("Your force is upgraded!");
            }
        })
    }

    render() {
        const posts = this.state.posts;
        const isLoggedIn = function (id) {
            if (Meteor.user()._id === id) {
                return true;
            } else {
                return false;
            }
        };
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.handleRedirect.bind(this)}>Create your
                    post!
                </button>
                <ul>
                    {
                        _.map(posts, (post) => {
                            return (
                                <li key={post._id}>

                                    <div>{post.title}</div>
                                    <div>{post.description}</div>
                                    <div>{moment(post.createdAt).format('DD MMM YYYY')}</div>
                                    <div>{post.userId}</div>
                                    <div>{post.postLikesCount}</div>
                                    {
                                        post.postLikes
                                            ?
                                            <button type="button" className="btn btn-default"
                                                    onClick={this.addAndRemoveLike.bind(this, post._id)}>Unlike</button>
                                            :
                                            <button type="button" className="btn btn-default"
                                                    onClick={this.addAndRemoveLike.bind(this, post._id)}>Like</button>
                                    }
                                    <div>
                                        {isLoggedIn(post.userId) ? (
                                            <div>
                                                <button type="button" className="btn btn-default"
                                                        onClick={this.handleRedirect1.bind(this, post._id)}>Edit
                                                </button>
                                                <button type="button" className="btn btn-default"
                                                        onClick={this.handleRemove.bind(this, post._id)}>Remove
                                                </button>
                                            </div>
                                        ) : ''}
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-default"
                                                onClick={this.handleRedirect2.bind(this, post._id)}>View Post
                                        </button>
                                    </div>

                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}