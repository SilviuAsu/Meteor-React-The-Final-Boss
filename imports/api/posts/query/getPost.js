import { createQuery } from 'meteor/cultofcoders:grapher';

export default createQuery({
    Posts: {
        $filter({filters, params, options}) {
        filters._id = params._id
    },
        $options: {},
        title: 1,
        description: 1
    }
});