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

    addOrRemoveLike(postId) {
        Meteor.call('post.like_unlike', postId, (err, like) => {
            if (err) {
                return console.log(err);
            }
            this.getPosts();
        });

    }

    goPostCreate() {
        route.go('/post/create');
    }

    goPostEdit(id) {
        route.go('/post/:postId/edit', {postId: id});
    }

    goPostView(id) {
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

    isPostOwner(postUserId) {
        return Meteor.userId() === postUserId;
    }

    getLikeAction(postLike) {
        return postLike ? 'Unlike' : 'Like';
    }

    render() {
        const posts = this.state.posts;
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.goPostCreate.bind(this)}>Create your
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
                                    <button type="button" className="btn btn-default"
                                            onClick={this.addOrRemoveLike.bind(this, post._id)}>{this.getLikeAction.bind(this, post.postLikes)}</button>
                                    <div>
                                        {this.isPostOwner.bind(this, post.userId)
                                            ?
                                            (
                                                <div>
                                                    <button type="button" className="btn btn-default"
                                                            onClick={this.goPostEdit.bind(this, post._id)}>Edit
                                                    </button>
                                                    <button type="button" className="btn btn-default"
                                                            onClick={this.handleRemove.bind(this, post._id)}>Remove
                                                    </button>
                                                </div>
                                            )
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-default"
                                                onClick={this.goPostView.bind(this, post._id)}>View Post
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