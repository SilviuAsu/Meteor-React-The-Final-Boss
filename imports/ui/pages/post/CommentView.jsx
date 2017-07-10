import React from "react";
import {Meteor} from "meteor/meteor";
import route from '/imports/routing/router.js';
import {AutoForm, LongTextField} from "uniforms-unstyled";
import CommentSchema from "/imports/api/comments/schema";
import moment from "moment";

export default class CommentView extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            comments: []
        };
    }

    componentDidMount() {
        this.getComments();
    }

    getComments() {
        Meteor.call('comment.list', route.current().params.postId, (err, comments) => {
            if (!err) {
                this.setState({
                    loading: false,
                    comments
                });
            }
        })
    }

    addComment(data) {
        Meteor.call('comment.add', this.props.postId, data, (err, res) => {
            if (err) {
                console.log('Register error', err);
            } else {
                this.getComments();
                console.log("Your comment have been submitted", res);
            }
        })
    }

    removeComment(id) {
        Meteor.call('comment.remove', id, (err, res) => {
            if (err) {
                console.log('Register error', err);
            } else {
                this.getComments();
                console.log("Your comment have been removed", res);
            }
        })
    }

    render() {
        const comments = this.state.comments;
        const isLoggedIn = function (id) {
            if (Meteor.user()._id === id) {
                return true;
            } else {
                return false;
            }
        };
        if (this.state.loading) {
            return <div>Waiting for the method</div>
        }
        return (
            <div>
                <ul>
                    {
                        _.map(comments, (comment) => {
                            return (
                                <li key={comment._id}>
                                    <div>{comment.text}</div>
                                    <div>{comment.postId}</div>
                                    <div>{moment(comment.createdAt).format('DD MMM YYYY')}</div>
                                    <div>
                                        {isLoggedIn(comment.userId) ? (
                                            <div>
                                                <button type="button" className="btn btn-default"
                                                        onClick={this.removeComment.bind(this, comment._id)}>Remove
                                                </button>
                                            </div>
                                        ) : ''}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <AutoForm schema={CommentSchema} onSubmit={this.addComment.bind(this)}>
                    <LongTextField name="text"/>
                    <button type="submit" className="btn btn-default">Add comment</button>
                </AutoForm>
            </div>
        )
    }
}