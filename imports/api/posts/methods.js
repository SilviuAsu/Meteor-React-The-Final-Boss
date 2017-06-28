import {Meteor} from "meteor/meteor";
import Posts from "/imports/api/posts/collection";
import Security from '/imports/api/security.js';

Meteor.methods({
    'post.create' (data) {
        Security.checkLoggedIn(this.userId);
        if (!data) {
            throw new Meteor.Error('error', 'Make sure you have filled all the fields! ;)', 'Some details');
        } else {
            return Posts.insert(data);
        }
    },

    'post.get' (id) {
        Security.checkLoggedIn(this.userId);
        return Posts.findOne(id);

    },

    'post.remove' (_id) {
        Security.checkLoggedIn(this.userId);
        return Posts.remove(_id);
    },

    'post.edit' (_id, data) {
        Posts.update(_id, {
            $set: {
                title: data.title,
                description: data.description
            }
        });
    }

});