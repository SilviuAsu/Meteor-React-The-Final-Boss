import React from "react";
import {AutoForm, AutoField} from "uniforms-unstyled";
import route from "/imports/routing/router.js";
import SimpleSchema from "/imports/api/users/regSchema.js";

export default class Register extends React.Component {
    constructor() {
        super();
    }

    handleRegister(data) {
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        Meteor.call('user.register', email, password, confirmPassword, (err, res)=>{
            if (err) {
                console.log('Register error', err);
            } else {
                route.go('/post/create');
            }
        })
    }

    render() {
        return (
            <div>
                <AutoForm schema={SimpleSchema}
                          onSubmit={this.handleRegister.bind(this)}
                          placeholder
                >
                    <h2>Join the force!:P</h2>
                    <AutoField name="email"/>
                    <AutoField name="password"/>
                    <AutoField name="confirmPassword"/>
                    <button type="submit" className="btn btn-default">Register</button>
                </AutoForm>
            </div>
        );
    }
}