import {Mongo} from 'meteor/mongo';
import PostSchema from './schema';

const postLike = new Mongo.Collection('postLike');

postLike.attachSchema(PostSchema);

export default postLike;