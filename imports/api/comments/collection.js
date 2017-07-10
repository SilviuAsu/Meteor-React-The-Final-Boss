import {Mongo} from 'meteor/mongo';
import CommentSchema from './schema';

const Comments = new Mongo.Collection('Comments');

Comments.attachSchema(CommentSchema);

export default Comments;
