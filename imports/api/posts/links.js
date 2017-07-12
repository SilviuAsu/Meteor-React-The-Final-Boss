import Posts from './collection.js';
import likePost from '/imports/api/likes/postLike/collection.js';
import Users from '/imports/api/users/collection';

Posts.addLinks({
    user: { // user represents the link name, can be any name you wish
        type: 'one', // we would have used 'many' if we wanted to store multiple user ids
        collection: Users,
        field: 'userId' // optional, if not specified it will generate a specific field.
    },
    postLikesCount: {
        resolve(postId) {
            return likePost.find({postId: postId._id}).count();
        }
    }
});
