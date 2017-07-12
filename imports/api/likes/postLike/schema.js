/**
 * Created by Me on 11/07/2017.
 */
import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    postId: {
        type: String,
        optional: true
    },
    likedAt: {
        type: Date,
        optional: true
    },
    userId: {
        type: String,
        optional: true,
    }
});