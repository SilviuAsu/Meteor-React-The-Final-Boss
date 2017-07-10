import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    Posts: {
        title: 1,
        description: 1,
        createdAt: 1,
        userId: 1
    }
});
