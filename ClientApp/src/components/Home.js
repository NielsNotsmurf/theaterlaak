import React, { Component } from 'react';
import logoLaak from '../images/laak.jpeg';
import elvis from '../images/elvis.jpeg';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <div className='flex-item-main'>
          <img src={logoLaak} alt='Theater Laak logo' />
          {/* <button id='ProgrammeringBtn' alt='Programmering knop'>Programmering</button> */}
        </div>
        <div className='flex-item-main-agenda'>
          <label>Agenda</label>
        </div>
        <div className='voorstellingCard'>
          <img src={elvis} alt='afbeelding van elvis presley' />
          <p>Zaterdag 14 januari 2023 | 18:00</p>
          <h4>Elvis</h4>
          <button id='ticketsBtn' alt='tickets bestellen knop'>Tickets bestellen</button>
        </div>
      </div>
    );
  }
}
export default Home;
