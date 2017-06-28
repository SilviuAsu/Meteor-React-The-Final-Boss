import React from "react";
import {Meteor} from 'meteor/meteor'
import {AutoForm, LongTextField, TextField} from "uniforms-unstyled";
import PostCreateSchema from "./PostCreateSchema";
import route from "/imports/routing/router.js";

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    handlePost(data) {
        Meteor.call('post.create', data, function (err, res) {
            if (err) {
                console.log('Register error', err);
            } else {
                console.log("Your post have been submitted", res);
            }
        })
    }

    handleRedirect() {
        route.go('/post/list');
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-default" onClick={this.handleRedirect.bind(this)}>View all
                    posts!
                </button>
                <AutoForm schema={PostCreateSchema}
                          onSubmit={this.handlePost.bind(this)}
                          placeholder
                >
                    <h2>Post your force!</h2>
                    <TextField name="title"/>
                    <LongTextField name="description"/>
                    <button type="submit" className="btn btn-default">Post</button>

                </AutoForm>
            </div>
        );
    }
}