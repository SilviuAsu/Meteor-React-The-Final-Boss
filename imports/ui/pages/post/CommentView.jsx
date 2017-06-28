import React from "react";
import {Meteor} from "meteor/meteor";
import route from '/imports/routing/router.js';
import {AutoForm, LongTextField} from "uniforms-unstyled";
import CommentSchema from "/imports/api/comments/schema";
import Comments from "/imports/api/comments/collection.js";
import {createContainer} from "meteor/react-meteor-data";
import moment from "moment";

class CommentView extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            comments: []
        }
    }

    componentDidMount() {
        Meteor.call('comment.list', route.current().params.postId, (err, res) => {
            this.setState({
                loading: false,
                comments: res
            })
        })
    }

    addComment(data) {
        Meteor.call('comment.add', this.props.postId, data, function (err, res) {
            if (err) {
                console.log('Register error', err);
            } else {
                console.log("Your comment have been submitted", res);
            }
        })
    }

    render() {
        const comments = this.props.comments;
        if (this.state.loading) {
            return <div>Waiting for the method</div>
        }
        return (
            <div>
                <div>
                    {
                        _.map(comments, (comment) => {
                            return (
                                <li key={comment._id}>
                                    <div>{comment.text}</div>
                                    <div>{moment(comment.createdAt).format('DD MMM YYYY')}</div>
                                </li>
                            );
                        })
                    }
                </div>
                <AutoForm schema={CommentSchema} onSubmit={this.addComment.bind(this)}>
                    <LongTextField name="text"/>
                    <button type="submit" className="btn btn-default">Add comment</button>
                </AutoForm>
            </div>
        )
    }
}

export default createContainer((props) => {
    Meteor.subscribe('Comments');
    const comments = Comments.find({postId: props.postId}, {sort: {createdAt: -1}}).fetch();
    return {
        comments,
        ...props
    };
}, CommentView);

