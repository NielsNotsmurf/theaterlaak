import e from "cors";
import React from "react";
import AccountService from "../Services/AccountService";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      password: "",
      succes: "",
      token: "",
      captchaSuccess: false,
      passwordShown: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.doSubmit();
    }
    catch (error) {
      console.log(error);
    }
    try { 
      await AccountService.login(this.state.UserName, this.state.password).then(() => {
        this.setState({ succes: "succesvol" });
      });
      this.props.navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  togglePasswordVisiblity = (e) => {
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

  doSubmit = () => {
    let user_captcha = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha)==false) {
        alert('Captcha is incorrect');
        document.getElementById('user_captcha_input').value = '';
    }
    else {
        alert('Captcha is correct');
        this.setState({ captchaSuccess: true });
    }
  }

  render() {
    switch (this.state.succes) {
      default:
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
                <div className="form-group">
                  <div className="col mt-3">
                      <LoadCanvasTemplate />
                  </div>
                  <div className="col mt-3">
                      <div><input placeholder="Enter Captcha Value" id="user_captcha_input" name="user_captcha_input" type="text"></input></div>
                  </div>
                  <div className="col mt-3">
                      <div><button class="btn btn-primary" onClick={() => this.doSubmit()}>Login</button></div>
                  </div>
                </div>
              </form>
              <button onClick={this.togglePasswordVisiblity}>Toon wachtwoord</button>
            </div>
          </>
        );
      case "succesvol":
        return (
          <>
            <div>
              <p>U bent succesvol ingelogd. U wordt doorverwezen naar de homepagina.</p>
            </div>
          </>
        )
    }
  }
}
