import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true
    },
    userId: {
        type: String,
        optional: true,
    },
    views: {
        type: SimpleSchema.Integer,
        defaultValue: 0
    }
});