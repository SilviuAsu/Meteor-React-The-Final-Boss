import {Meteor} from "meteor/meteor";
import Posts from "/imports/api/posts/collection";
import Security from '/imports/api/security.js';
import postQuery from '/imports/api/posts/query/getPost';
import postsQuery from '/imports/api/posts/query/getPosts';

Meteor.methods({
    'post.create' (data) {
        Security.checkLoggedIn(this.userId);
        if (!data) {
            throw new Meteor.Error('error', 'Make sure you have filled all the fields! ;)', 'Some details');
        } else {
            return Posts.insert(data);
        }
    },

    'post.list' () {
        Security.checkLoggedIn(this.userId);
        return postsQuery.clone({}, {sort: {createdAt: -1}}).fetch();
    },
    'post.get' (id) {
        Security.checkLoggedIn(this.userId);
        // vezi metoda createQuery
        return postQuery.clone({_id: id}).fetchOne();
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