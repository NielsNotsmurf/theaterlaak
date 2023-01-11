import React from "react";
import { useState } from "react";
import authService from '../../components/api-authorization/AuthorizeService'


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      succes: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await authService.signIn(this.state.email, this.state.password).then(() => {
      this.setState({ succes: "succesvol" });
    });
    console.log(authService.getUser());
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
    if (user) {
      this.setState({
        isAuthenticated,
        from_email: user && user.name
      });
    } else {
      this.setState({ ...this.state, from_email: "" });
    }
  }

  render() {
    switch (this.state.succes) {
      case "":
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
                <button type='submit' alt="login button">Login</button>
              </form>
            </div>
          </>
        );
      case "succesvol":
        return (
          window.location.href = "../"
        );
    }
  }
}
