import Posts from './collection.js';
import postLikes from '/imports/api/likes/postLike/collection.js';
import Users from '/imports/api/users/collection';

Posts.addLinks({
    user: { // user represents the link name, can be any name you wish
        type: 'one', // we would have used 'many' if we wanted to store multiple user ids
        collection: Users,
        field: 'userId' // optional, if not specified it will generate a specific field.
    },
    postLikesCount: {
        resolve(post) {
            return postLikes.find({postId: post._id}).count();
        }
    },
    postLikes: {
        resolve(post) {
            return postLikes.findOne({postId: post._id, userId: Meteor.userId()});
        }
    }
});
