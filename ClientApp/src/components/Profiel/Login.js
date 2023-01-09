import React from "react";
import { useState } from "react";

export function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} alt="email invoerveld"/>
                </label>
                <label>
                    <p>Wachtwoord</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} alt="wachtwoord invoerveld"/>
                </label>
                <div>
                    <button type="submit" alt="Login button">Submit</button>
                </div>
            </form>
        </div>
    );
}