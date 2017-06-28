import React from "react";
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";
import route from '/imports/routing/router.js';
import CommentView from "./CommentView";
import moment from "moment";

export default class PostsView extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            post: []
        }
    }

    componentDidMount() {
        Meteor.call('post.get', route.current().params.postId, (err, res) => {
            this.setState({
                loading: false,
                post: res
            })
        })
    }

    handleRedirect() {
        route.go('/post/list');
    }

    render() {
        const title = this.state.post.title;
        const description = this.state.post.description;
        if (this.state.loading) {
            return <div>Waiting for the method</div>
        }
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.handleRedirect.bind(this)}>Back to your
                    forces!
                </button>
                <h1>Main force is: {title}</h1>
                <h2>Force description: {description}</h2>
                <CommentView postId={route.current().params.postId}/>
            </div>
        )
    }
}

