import React from "react";
import { useState } from "react";
import authService from '../../components/api-authorization/AuthorizeService'

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phonenumber: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    //aanpassen
    onSubmit = (e) => {
        e.preventDefault();
        authService.login(this.state.email, this.state.password).then(() => {

        });
        console.log(authService.getUser());
    };

    //aanpassen
    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <p alt="invoerveld email">Uw email-adres invoeren:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputMail'
                            type='email'
                            placeholder='Email'
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                        <p alt="invoerveld wachtwoord">Wachtwoord:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            type='Password'
                            placeholder='Wachtwoord'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            type='Password'
                            placeholder='Wachtwoord'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            type='Password'
                            placeholder='Wachtwoord'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            type='Password'
                            placeholder='Wachtwoord'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            type='Password'
                            placeholder='Wachtwoord'
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        />
                        <button type='submit' alt="login button">Login</button>
                    </form>
                </div>
            </>
        );
    }
}


