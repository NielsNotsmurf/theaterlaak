import React from "react";
import AccountService from "../Services/AccountService";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import applicationUserService from '../Services/applicationUserService';
import { getLocalUser } from '../Helpers/storageHelper';
import SnackbarManager from "../Componenten/Snackbar/SnackbarManager";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserName: "",
            password: "",
            succes: "",
            token: "",
            captcha: "",
            passwordShown: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (validateCaptcha(this.state.captcha) === true) {
            this.setState({ ...this.state, captchaSuccess: true });
            try {
                await AccountService.login(this.state.UserName, this.state.password);

                this.props.updateContextState({ user: await applicationUserService.getUserById(getLocalUser().id), roles: getLocalUser().roles })
                SnackbarManager.showInfo("U bent ingelogd");
                this.props.navigate("/");

            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Captcha is onjuist');
        }

    };

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value });
    };

    togglePasswordVisiblity = () => {
        this.setState({ passwordShown: !this.state.passwordShown });
    };

    // componentDidMount() {
    //   this._subscription = authService.subscribe(() => this.populateState());
    //   this.populateState();
    // }

    // componentWillUnmount() {
    //   authService.unsubscribe(this._subscription);
    // }

    // async populateState() {
    //   const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    //   if (user) {
    //     this.setState({
    //       isAuthenticated,
    //       from_email: user && user.name
    //     });
    //   } else {
    //     this.setState({ ...this.state, from_email: "" });
    //   }
    // }

    componentDidMount() {
        loadCaptchaEnginge(6);
        //   this._subscription = authService.subscribe(() => this.populateState());
        //   this.populateState();
    }

    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <p alt="invoerveld email">Uw email invoeren:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputMail'
                            type='email'
                            placeholder='Email'
                            name='UserName'
                            value={this.state.UserName}
                            onChange={this.handleChange}
                        ></input>
                        <p alt="invoerveld wachtwoord">Wachtwoord:</p>
                        <input
                            required={true}
                            message="Dit veld is verplicht"
                            id='inputPassword'
                            // type='Password'
                            type={this.state.passwordShown ? "text" : "Password"}
                            placeholder='Wachtwoord'
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        {/* <button type='submit' alt="login button">Login</button> */}
                    </form>
                    <div className="form-group">
                        <div className="col mt-3">
                            <LoadCanvasTemplate />
                        </div>
                        <div className="col mt-3">
                            <input placeholder="Enter Captcha Value" id="user_captcha_input" name="captcha" type="text" onChange={this.handleChange}></input>
                        </div>
                        <div className="col mt-3">
                            <div>
                                <button type="submit" className="btn btn-primary" alt="login knop" onClick={this.onSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.togglePasswordVisiblity}>Toon wachtwoord</button>
                </div>
            </>
        )
    }
}