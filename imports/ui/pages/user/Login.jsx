import React from "react";
import {AutoForm, AutoField} from "uniforms-unstyled";
import route from '/imports/routing/router.js';
import SimpleSchema from "/imports/api/users/loginSchema.js";

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin(data) {
        const email = data.email;
        const password = data.password;

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                console.log('err in log in with password', err);
            } else {
                route.go('/post/list');
            }
        });
    }

    render() {
        return (
            <div>
                <AutoForm schema={SimpleSchema}
                          onSubmit={this.handleLogin.bind(this)}
                          placeholder
                >
                    <h2>Login Form</h2>
                    <AutoField name="email"/>
                    <AutoField name="password"/>
                    <button type="submit" className="btn btn-default">Login</button>
                </AutoForm>
            </div>
        );
    }
}