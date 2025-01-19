import React, { useState } from 'react';
import { postLogin } from '../../api/api.ts';
import "./LoginRegister.css";

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitLogin = async (event) => {
        event.preventDefault()
        if (email.length > 0 && password.length > 0) {
            console.log(email)
            console.log(password)
            const response = await postLogin({
                email: email,
                password: password
            })

            // Redirect if response.status === 200
            if (response.status === 200) {
                redirectToHome()
            }
        }
    }

    const redirectToHome = () => {
        window.location.href = "home"
    }

    return (
        <div className="login-page">
            <div className="credentials-inputs">
                <div className="credentials-background">
                    <h2 className="credentials-welcome">Welcome!</h2>
                    <form onSubmit={event => submitLogin(event)} className="credentials-form">
                        <input className="credentials-input" placeholder="Email" onChange={event => setEmail(event.target.value)} />
                        <input className="credentials-input" placeholder="Password" type="password" onChange={event => setPassword(event.target.value)} />
                        <a href="register" className="create-account">
                            <p className="">Create account</p>
                        </a>
                        <div className="credentials-btn-div">
                            <button className="credentials-button">
                                <p>LOGIN</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}