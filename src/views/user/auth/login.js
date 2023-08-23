import React from "react";
import backend from "../../../config/functions/backend";
import * as Session from "../../../config/functions/session";
import { AuthContext } from "../../../App";
import { useAuthRedirect } from "../../../config/functions/authentication";

export default function Login() {
    const { state } = React.useContext(AuthContext);

    useAuthRedirect(state, false);

    if (state === false) {
        return <>
            <div className="container-md" style={{marginTop: "80px"}}>
                <LoginForm />
            </div>
        </>
    }
}

const LoginForm = React.memo(() => {

    const { alterAuth } = React.useContext(AuthContext);

    const [errors, setErrors] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const inputEmail = React.useRef(null);
    const inputPassword = React.useRef(null);


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const email = inputEmail.current.value;
        const password = inputPassword.current.value;

        const payload = {
            email: email,
            password: password
        };



        const response = await backend('/user/auth/login', payload, "post");

        if (response.errors) {
            setErrors(response.errors);
        } else {
            setErrors(null);
            if (response.data.token) {
                Session.set(response.data.token.value);
                alterAuth(true, response.data.auth);
            } else {
                console.log(response.data)
            }
        }
        setLoading(false);
    }

    return <>
        <div className="row" >
            <div className="col-md-6 col-sm-12" style={{ margin: "0px auto" }}>
                <div className="card">
                    <form method="post" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                        <div className="card-header">
                            <h4>Vos informations de connexions</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="email" className={`form-control ${errors && errors.email && "is-invalid"} `}
                                    name="email" id="email" placeholder="john@doe.com" ref={inputEmail} style={{ textAlign: "center" }} />
                                {
                                    errors &&
                                    errors.email &&
                                    <p className="invalid-feedback">{errors.email}</p>
                                }
                            </div>
                            <div className="mb-3">
                                <input type="password" name="password" id="password" placeholder="Your password" ref={inputPassword}
                                    className={`form-control ${errors && errors.password && "is-invalid"}`} style={{ textAlign: "center" }} />
                                {
                                    errors &&
                                    errors.password &&
                                    <p className="invalid-feedback">{errors.password}</p>
                                }
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {
                                    loading ? <>
                                        <span className="spinner-border spinner-border-sm"></span> logging in
                                    </> :
                                        "Log In"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
});