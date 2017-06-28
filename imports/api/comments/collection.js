import {Mongo} from 'meteor/mongo';
import PostSchema from './schema';

const Comments = new Mongo.Collection('Comments');

Comments.attachSchema(PostSchema);

export default Comments;
