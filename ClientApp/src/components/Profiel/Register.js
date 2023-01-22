import React from "react";
import AccountService from "../Services/AccountService";
import PasswordChecklist from "react-password-checklist"
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            UserName: "",
            password: "",
            confirmPassword: "",
            PhoneNumber: 0,
            error: "",
            succes: "",
            passwordShown: false,
            confirmPasswordShown: false,
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
            this.props.navigate("/login");
        });
    };

    togglePasswordVisiblity = () => {
        this.setState({ passwordShown: !this.state.passwordShown,
        confirmPasswordShown: !this.state.confirmPasswordShown
        });
      };
    // componentDidMount() {
    //     loadCaptchaEnginge(6);
    // }

    // doSubmit = () => {
    //     let user_captcha = document.getElementById('user_captcha_input').value;

    //     if (validateCaptcha(user_captcha)==true) {
    //         alert('Captcha is correct');
    //         loadCaptchaEnginge(6);
    //         document.getElementById('user_captcha_input').value = '';
    //     }
    //     else {
    //         alert('Captcha is incorrect');
    //         document.getElementById('user_captcha_input').value = '';
    //     }
    // }

    //aanpassen
    render() {
        switch (this.state.succes) {
            default:
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
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                                <p alt="invoerveld Achternaam">Achternaam:</p>
                                <input
                                    required={true}
                                    message="Dit veld is verplicht"
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                                <p alt="invoerveld email">Email:</p>
                                <input
                                    required={true}
                                    message="Dit veld is verplicht"
                                    type="email"
                                    pattern="[a-z0-9._%+-]+@?(live|gmail|yahoo|hotmail)+\.[a-z]{2,3}$"
                                    name="UserName"
                                    autoComplete="new-username"
                                    value={this.state.UserName}
                                    onChange={this.handleChange}
                                />
                                <p alt="invoerveld Wachtwoord">Wachtwoord:</p>
                                <input
                                    required={true}
                                    message="Dit veld is verplicht"
                                    // type="password"
                                    type={this.state.passwordShown ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <p alt="invoerveld bevestig wachtwoord">bevestig uw wachtwoord:</p>
                                <input
                                    required={true}
                                    message="Dit veld is verplicht"
                                    // type="password"
                                    type={this.state.confirmPasswordShown ? "text" : "password"}
                                    name="confirmPassword"
                                    autoComplete="confirm-password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                />
                                <p alt="invoerveld Telefoonnummer">Telefoonnummer (optioneel):</p>
                                <input
                                    required={false}
                                    message="Dit veld is optioneel"
                                    type="text"
                                    name="PhoneNumber"
                                    placeholder="+31612345678"
                                    value={this.state.PhoneNumber}
                                    onChange={this.handleChange}
                                />
                                {/* <div className="form-group">
                                    <div className="col mt-3">
                                        <LoadCanvasTemplate />
                                    </div>
                                    <div className="col mt-3">
                                        <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
                                    </div>
                                    <div className="col mt-3">
                                        <div><button className="btn btn-primary" onClick={() => this.doSubmit()}>Submit</button></div>
                                    </div>
                                </div> */}
                                <PasswordChecklist
                                    rules={["capital", "lowercase", "specialChar", "minLength", "match"]}
                                    minLength={7}
                                    value={this.state.password}
                                    valueAgain={this.state.confirmPassword}
                                    messages={{
                                        minLength: "uw wachtwoord moet minimaal 7 karakters lang zijn.",
                                        specialChar: "uw wachtwoord moet een speciaal karakter bevatten.",
                                        number: "uw wachtwoord moet een nummer bevatten.",
                                        capital: "uw wachtwoord moet een hoofdletter bevatten.",
                                        match: "uw wachtwoorden komen niet overeen.",
                                        lowercase: "uw wachtwoord moet een kleine letter bevatten."
                                    }}
                                />
                                <br></br>
                                <button type='submit' alt="Registreer">Registreer</button>
                            </form>
                            <button onClick={this.togglePasswordVisiblity} alt="toon wachtwoord">Toon wachtwoord</button>
                        </div>
                    </>
                );
            case "succesvol":
                return (
                    <>
                        <div>
                            <p>U bent succesvol geregistreerd. U wordt doorverwezen naar de login pagina.</p>
                        </div>
                    </>
                )
        }
    }
}

