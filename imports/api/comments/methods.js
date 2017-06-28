import {Meteor} from "meteor/meteor";
import Comments from "/imports/api/comments/collection";
import Security from '/imports/api/security.js';

Meteor.methods({
    'comment.list' (postId) {
        Security.checkLoggedIn(this.userId);
        return Comments.find({postId: postId}).fetch();
    },
    'comment.add' (postId, data) {
        Security.checkLoggedIn(this.userId);
        if (!data) {
            throw new Meteor.Error('error', 'Make sure you have filled all the fields! ;)', 'Some details');
        } else {
            return Comments.insert({
                postId: postId,
                text: data.text
            });
        }
    },
    'comment.remove'(_id) {
        Security.checkLoggedIn(this.userId);
        return Comments.remove(_id);
    }
});