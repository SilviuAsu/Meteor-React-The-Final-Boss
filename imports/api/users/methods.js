import {Meteor} from "meteor/meteor";
import Users from "/imports/api/users/collection";

Meteor.methods({
    'user.register' (email, password, confirmPassword) {
        return Accounts.createUser({email: email, password: password, confirmPassword: confirmPassword});
    },
});