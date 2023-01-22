import { Component } from 'react';
import { send } from 'emailjs-com';
import '../styles/contact.css';
import logoLaak from '../../images/laak.jpeg';
import { getLocalUser } from '../Helpers/storageHelper';

export class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_name: '',
      from_email: '',
      to_name: 'TheaterLaak Contact',
      message: '',
      reply_to: 'theaterlaakhhs@gmail.com',
      succes: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.message.length < 50) {
      alert("Het bericht moet minimaal 50 tekens bevatten" );
    } else {
      send(
        'service_340sddt',
        'template_06pij8x',
        this.state,
        'K1WEyrm-Zn9CbldYw'
      )
        .then((response) => {
          this.setState({ ...this.state, message: "", succes: "succesvol" });
        })
        .catch((err) => {
          alert("Invoer onjuist [TIP: Controleer of uw email-adres klopt" );
        });
    }
  };

  handleChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  componentDidMount() {
    let storedUser = getLocalUser();
    if (storedUser != null)
      this.setState({ ...this.state, from_email: storedUser.email});
  }

  render() {
    switch(this.state.succes) {
      case "":
        return(
          <>
          <div className='flex-item-main'>
            <img src={logoLaak} alt='Theater Laak logo' />
          </div>
          <div className='Contact'>
            <form onSubmit={this.onSubmit}>
              <p alt="invoerveld email">Uw email-adres invoeren:</p>
              <input
                id='inputName'
                type='text'
                name='from_name'
                placeholder='Uw Naam...'
                value={this.state.from_name}
                onChange={this.handleChange}
              />
              <input
                required
                id='inputMail'
                type='email'
                name='from_email'
                placeholder='Uw email-adres...'
                value={this.state.from_email}
                onChange={this.handleChange}
              />
              <p alt="invoerveld vraag/probleemstelling">Uw vraag en/of proleemstelling:</p>
              <textarea
                id='inputMessage'
                type='text'
                name='message'
                placeholder='Uw bericht...'
                value={this.state.message}
                onChange={this.handleChange}
              />
              <button type='submit' alt="button versturen">Versturen</button>
            </form>
          </div>
          </>
          );
      case "succesvol" :
        return(
          <>
            <p>Bericht is succesvol verzonden!</p>
            <p>Bedankt voor het contact opnemen met de klantenservice van Theaterlaak.</p>
          </>
        );
    }
    
  }
}

export default Contact;