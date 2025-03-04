import React, { useState } from 'react';
import { postRegister } from '../../api/api.ts';
import "./LoginRegister.css";

export default function Register() {

    const [userFirstName, setUserFirstName] = useState<string>("")
    const [userLastName, setUserLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")

    const submitRegister = async (event) => {
        event.preventDefault()
        if (email.length > 0 && password.length > 0 && password == passwordConfirm) {
            const response = await postRegister({
                userFirstName: userFirstName,
                userLastName: userLastName,
                email: email,
                password: password
            })

            // Redirect if response.status === 200
            if (response.status === 201) {
                redirectToHome()
            }
        }
    }

    const redirectToHome = () => {
        window.location.href = "home"
    }

    return (
        <div className="register-page">
            <div className="credentials-inputs">
                <div className="credentials-background">
                    <h2 className="credentials-welcome">Registration</h2>
                    <form onSubmit={event => submitRegister(event)} className="credentials-form">
                        <div className="credentials-names">
                            <input className="credentials-input" placeholder="First Name" onChange={event => setUserFirstName(event.target.value)} />
                            <input className="credentials-input" placeholder="Last Name" onChange={event => setUserLastName(event.target.value)} />
                        </div>
                        <input className="credentials-input" placeholder="Email" onChange={event => setEmail(event.target.value)} />
                        <input className="credentials-input" placeholder="Password" type="password" onChange={event => setPassword(event.target.value)} />
                        <input className="credentials-input" placeholder="Confirm Password" type="password" onChange={event => setPasswordConfirm(event.target.value)} />
                        <a href="login" className="create-account">
                            <p className="">Already have an account?</p>
                        </a>
                        <div className="credentials-btn-div">
                            <button className="credentials-button">
                                <p>REGISTER</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}