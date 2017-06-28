import {Mongo} from 'meteor/mongo';
import PostSchema from './schema';

const Posts = new Mongo.Collection('Posts');

Posts.attachSchema(PostSchema);

export default Posts;
