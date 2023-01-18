import React from "react";
import AccountService from "../Services/AccountService";




export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      password: "",
      succes: "",
      token: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
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
          <>
            <div>
              <p>U bent succesvol ingelogd. U wordt doorverwezen naar de homepagina.</p>
            </div>
          </>
        )
    }
  }
}
