import {Meteor} from 'meteor/meteor';
import Comments from '/imports/api/comments/collection'; // no .js ? yep, works like that too!

Meteor.publish('Comments', function () {
    return Comments.find();
});