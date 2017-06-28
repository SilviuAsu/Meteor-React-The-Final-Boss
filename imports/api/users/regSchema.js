import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    email: {
        label: "Email Address",
        type: String,
        min: 5,
        uniforms: {
            placeholder: "Email..."
        }
    },
    password: {
        label: "Password",
        type: String,
        min: 3,
        uniforms: {
            type: "password",
            placeholder: "Password..."
        }

    },
    confirmPassword: {
        type: String,
        label: "Retype pass",
        min: 3,
        uniforms: {
            type: "password",
            placeholder: "Second Password..."
        },
        custom() {
            if (this.value !== this.field('password').value) {
                return "passwordMismatch";
            }
        }
    }
});