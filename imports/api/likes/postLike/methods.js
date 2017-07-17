import {Meteor} from "meteor/meteor";
import postLike from "/imports/api/likes/postLike/collection";
import Security from '/imports/api/security.js';

Meteor.methods({
    'post.like_unlike' (postId) {
        const findLike = postLike.findOne({postId: postId, userId: this.userId});
        Security.checkLoggedIn(this.userId);
        if (!findLike) {
            postLike.insert({postId: postId, createdAt: new Date(), userId: this.userId});
        } else {
            postLike.remove(findLike._id);
        }
    }
});