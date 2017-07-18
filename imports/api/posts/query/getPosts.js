import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    Posts: {
        $options: {sort: {createdAt: -1}},
        title: 1,
        description: 1,
        createdAt: 1,
        userId: 1,
        postLikesCount: 1,
        postLikes: 1
    }
});
