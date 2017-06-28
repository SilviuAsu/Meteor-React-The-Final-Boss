import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true
    },
    userId: {
        type: String,
        optional: true
    },
    postId: {
        type: String,
        optional: true,
    }
});