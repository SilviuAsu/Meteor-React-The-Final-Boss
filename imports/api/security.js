import { Roles } from 'meteor/alanning:roles';

export default class Security {
    static checkLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('not-authorized', 'You are not authorized');
        }
    }

    // add other business logic checks here that you use throughout the app
    // something like: isUserAllowedToSeeDocument()
    // always keep decoupling your code if this class gets huge.
}