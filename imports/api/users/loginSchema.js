import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    email: {
        label: "Email Address",
        type: String,
        uniforms: {
            placeholder: "Email..."
        }
    },
    password: {
        label: "Password",
        type: String,
        uniforms: {
            type: "password",
            placeholder: "Password..."
        }
    }
});