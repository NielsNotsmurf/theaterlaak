import React from "react";
import { useState } from "react";
import AccountService from "../Services/AccountService";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            UserName: "",
            password: "",
            confirmPassword: "",
            PhoneNumber: null,
            error: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    //aanpassen
    onSubmit = async (e) => {
        e.preventDefault();
        await AccountService.register(this.state.firstName, this.state.lastName, this.state.UserName, this.state.password, this.state.confirmPassword, this.state.PhoneNumber).then(() => {
            this.setState({ succes: "succesvol" });
        });
    };

    validateConfirmPassword = e => {
        let { name, value } = e.target;
        this.setState(prev => {
            const stateObj = { ...prev, [name]: "" };
            if (this.state.password && value !== this.state.password) {
                stateObj[name] = "Wachtwoorden komen niet overeen.";
            }
            return stateObj;
        });
    }

    //aanpassen
    render() {
        return (
            <>
                <div>
                    <h1>Registeren</h1>
                    <form onSubmit={this.onSubmit}>
                        <p alt="invoerveld Voornaam">Voornaam:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            type="text"
                            name="firstName"
                            value={this.state.firstName || ""}
                            onChange={this.handleChange}
                        />
                        <p alt="invoerveld Achternaam">Achternaam:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            type="text"
                            name="lastName"
                            value={this.state.lastName || ""}
                            onChange={this.handleChange}
                        />
                        <p alt="invoerveld email">Email:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            type="email"
                            name="UserName"
                            value={this.state.UserName || ""}
                            onChange={this.handleChange}
                        />
                        <p alt="invoerveld Wachtwoord">Wachtwoord:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            type="password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handleChange}
                        />
                        <p alt="invoerveld bevestig wachtwoord">bevestig uw wachtwoord:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            type="password"
                            name="password"
                            value={this.state.password || ""}
                            onChange={this.handleChange}
                        />
                        <p alt="invoerveld Telefoonnummer">Telefoonnummer (optioneel):</p>
                        <input
                            required={false}
                            message="Dit veld is optioneel"
                            type="number"
                            name="PhoneNumber"
                            value={this.state.PhoneNumber || ""}
                            onChange={this.handleChange}
                            onBlur={this.validateConfirmPassword}
                        />
                    </form>
                    <button type='submit' alt="Registreer Knop">Registreer</button>
                </div>
            </>
        );
    }
}


