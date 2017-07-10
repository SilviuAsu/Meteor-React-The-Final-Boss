import Comments from './collection.js';
import Users from '/imports/api/users/collection';

Comments.addLinks({
    post: { // user represents the link name, can be any name you wish
        type: 'one', // we would have used 'many' if we wanted to store multiple user ids
        collection: Users,
        field: 'postId' // optional, if not specified it will generate a specific field.
    }
});
