import React from "react";
import {Meteor} from "meteor/meteor";
import {AutoForm, LongTextField, TextField} from "uniforms-unstyled";
import PostCreateSchema from "./PostCreateSchema";
import route from '/imports/routing/router.js';

export default class PostsEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            post: null
        }
    }

    componentDidMount() {
        Meteor.call('post.get', route.current().params.postId, (err, post) => {
            this.setState({
                loading: false,
                post
            })
        })
    }

    handleRedirect() {
        route.go('/post/list');
    }

    handleEdit(data) {
        Meteor.call('post.edit', route.current().params.postId, data, (err, res) => {
            if (err) {
                console.log('Register error', err);
            } else {
                console.log("Your force is upgraded!");
            }
        })
    }

    render() {
        const {loading, post} = this.state;
        if (loading) {
            return <div>Waiting for the method</div>
        }

        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.handleRedirect.bind(this)}>Back to your
                    forces!
                </button>
                <AutoForm schema={PostCreateSchema} onSubmit={this.handleEdit.bind(this)} model={post}>

                    <h2>Change your force!</h2>

                    <TextField name="title"/>
                    <LongTextField name="description"/>

                    <button type="submit" className="btn btn-default">Save</button>
                </AutoForm>
            </div>
        )
    }
}

