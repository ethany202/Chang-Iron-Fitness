import React, { useState } from 'react';
import { postLogin } from '../../api/api.ts';
import "./Login.css";

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitLogin = async () => {
        if (email.length > 0 && password.length > 0) {
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
            <div className="login-inputs">
                <form onSubmit={submitLogin}>
                    <input placeholder="Email" onChange={event => setEmail(event.target.value)} />
                    <input placeholder="Password" onChange={event => setPassword(event.target.value)} />
                </form>
            </div>
        </div>
    )

}