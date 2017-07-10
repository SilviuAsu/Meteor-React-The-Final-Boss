import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    Comments: {
        $filter({filters, options, params}) {
            _.extend(filters, params.filters);
            _.extend(options, params.options);
        },
        text: 1,
        createdAt: 1,
        postId: 1,
        userId: 1
    }
});