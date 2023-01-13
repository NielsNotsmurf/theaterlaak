import React from "react";
import AccountService from '../Services/AccountService';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      password: "",
      succes: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await AccountService.login(this.state.UserName, this.state.password).then(() => {
      this.setState({ succes: "succesvol" });
    });
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
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

  render() {
    switch (this.state.succes) {
      case "":
        return (
          <>
            <div>
              <form onSubmit={this.onSubmit}>
                <p alt="invoerveld UserName">Uw UserName invoeren:</p>
                <input
                  required={true}
                  message="Dit veld is verplicht"
                  id='inputMail'
                  type='UserName'
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
                  type='Password'
                  placeholder='Wachtwoord'
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <button type='submit' alt="login button">Login</button>
              </form>
            </div>
          </>
        );
      case "succesvol":
        return (
          window.location.href = "/"
        );
    }
  }
}
