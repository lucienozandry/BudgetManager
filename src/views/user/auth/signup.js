import React from "react";
import { AuthContext } from "../../../App";
import { useAuthRedirect } from "../../../config/functions/authentication";
import backend from "../../../config/functions/backend";
import * as Session from "../../../config/functions/session";

const PASSWORD = {

    letter: false,
    capital: false,
    number: false,
    count: false,

    style: {
        uncomplete: "text-danger",
        complete: "text-secondary"
    },

    getMessage: function () {

        const { complete, uncomplete } = this.style;

        return <>
            Your password should contain at least :
            <ul>
                <li className={this.letter ? complete : uncomplete}>{this.letter && <i className="fas fa-check-circle"></i>} 1 letter</li>
                <li className={this.capital ? complete : uncomplete}>{this.capital && <i className="fas fa-check-circle"></i>} 1 capital letter </li>
                <li className={this.number ? complete : uncomplete}>{this.number && <i className="fas fa-check-circle"></i>} 1 number</li>
                <li className={this.count ? complete : uncomplete}>{this.count && <i className="fas fa-check-circle"></i>} 8 caracters </li>
            </ul>
        </>
    },

    setState: function (letter, capital, number, count) {
        this.letter = letter;
        this.capital = capital;
        this.number = number;
        this.count = count;
    }
}

export default function Signup() {
    const { state } = React.useContext(AuthContext);
    useAuthRedirect(state, false);

    if (!state) {
        return (
            <div className="container-md" style={{marginTop: "80px"}}>
                <SignupForm />
            </div>
        );
    }
}

const SignupForm = React.memo(function () {
    const { alterAuth } = React.useContext(AuthContext);

    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const alphabetReg = React.useMemo(() => /[a-z]{1,}/, []);
    const numberReg = React.useMemo(() => /[0-9]{1,}/, []);
    const capitalReg = React.useMemo(() => /[A-Z]{1,}/, []);

    const nameInput = React.useRef();
    const emailInput = React.useRef();

    let passwordIsValid = React.useMemo(() => false, []);

    PASSWORD.setState(alphabetReg.test(password), capitalReg.test(password), numberReg.test(password), password.length >= 8);

    if (PASSWORD.letter && PASSWORD.number && PASSWORD.capital && PASSWORD.count) {
        passwordIsValid = true;
    }

    const handleSubmit = React.useCallback(async function (e) {
        e.preventDefault();
        setLoading(true);

        const name = nameInput.current.value;
        const email = emailInput.current.value;

        if (passwordIsValid) {
            const response = await backend('/user/auth/signup', { name: name, email: email, password: password }, "post")
            if (response.errors) {
                setErrors(response.errors);
            } else {
                setErrors(null)
            }
            if (response.data?.authUser) {
                Session.set(response.data.token.value);
                alterAuth(true, response.data.authUser)
            }
        }

        setLoading(false);
    }, [alterAuth, password, passwordIsValid])

    const handlePassword = React.useCallback(function (e) {
        setPassword(e.target.value);
    }, [])

    return (
        <div className="row">
            <div className="col-md-6 col-sm-12" style={{ margin: "0px auto" }}>
                <div className="card">
                    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                        <div className="card-header">
                            <h4 className="card-title">Remplissez les informations suivantes</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${errors && errors.name && "is-invalid"}`}
                                    name="name"
                                    id="name"
                                    placeholder="Your name"
                                    style={{ textAlign: "center" }}
                                    ref={nameInput}
                                />
                                {errors && errors.name && <>
                                    <div className="invalid-feedback">{errors.name}</div>
                                </>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${errors && errors.email && "is-invalid"}`}
                                    name="email"
                                    id="email"
                                    placeholder="username@example.com"
                                    style={{ textAlign: "center" }}
                                    ref={emailInput}
                                />
                                {errors && errors.email && <>
                                    <div className="invalid-feedback">{errors.email}</div>
                                </>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className={`form-control ${errors && errors.password && "is-invalid"}`}
                                    name=""
                                    id=""
                                    aria-describedby="passwordHelpId"
                                    placeholder="Create a Password"
                                    style={{ textAlign: "center" }}
                                    value={password || ""}
                                    onChange={handlePassword}
                                />
                                {errors && errors.password && <>
                                    <div className="invalid-feedback">{errors.password}</div>
                                </>}
                                {password !== "" && <div id="passwordHelpId" className="form-text" style={{ textAlign: "start" }}>{PASSWORD.getMessage()}</div>}

                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit" disabled={loading || !passwordIsValid}>
                                {
                                    loading ? <>
                                        <span className="spinner-border spinner-border-sm"></span> signing in
                                    </> :
                                        "Sign Up"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
})
