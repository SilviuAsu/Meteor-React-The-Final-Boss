import {Meteor} from 'meteor/meteor';
import Posts from '/imports/api/posts/collection'; // no .js ? yep, works like that too!

Meteor.publish('Posts', function () {
    return Posts.find();
});