import React from "react";
import { useState } from "react";
import AccountService from '../Services/AccountService';



export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      passwordHash: "",
      succes: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    await AccountService.login(this.state.UserName, this.state.passwordHash).then(() => {
      this.setState({ succes: "succesvol" });
    });
    // console.log(authService.getUser());
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

  //   render() {
  //     switch (this.state.succes) {
  //       case "":
  //         return (
  //           <>
  //             <div>
  //               <form onSubmit={this.onSubmit}>
  //                 <p alt="invoerveld UserName">Uw UserName invoeren:</p>
  //                 <input
  //                   required={true}
  //                   message="Dit veld is verplicht"
  //                   id='inputMail'
  //                   type='UserName'
  //                   placeholder='Email'
  //                   value={this.state.UserName}
  //                   onChange={this.handleChange}
  //                 />
  //                 <p alt="invoerveld wachtwoord">Wachtwoord:</p>
  //                 <input
  //                   required={true}
  //                   message="Dit veld is verplicht"
  //                   id='inputPassword'
  //                   type='Password'
  //                   placeholder='Wachtwoord'
  //                   value={this.state.passwordHash}
  //                   onChange={this.handleChange}
  //                 />
  //                 <button type='submit' alt="login button">Login</button>
  //               </form>
  //             </div>
  //           </>
  //         );
  //       case "succesvol":
  //         return (
  //           window.location.href = "../"
  //         );
  //     }
  //   }

  render() {
    return (
      <div>
        <h1>Inloggen</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            <p>UserName</p>
            <input 
            type="email" 
            alt="invoerveld UserName" 
            placeholder="Email"
            />
          </label>
          <label>
            <p>Wachtwoord</p>
            <input type="password" alt="invoerveld wachtwoord"
            placeholder="Wachtwoord"
            />
          </label>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
