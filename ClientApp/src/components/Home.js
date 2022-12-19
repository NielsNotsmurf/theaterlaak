import React, { Component } from 'react';
import logoLaak from '../images/laak.jpeg';
import Photo1 from '../images/photo1.jpg';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className='flex-container'>
        <div className='flex-item-main'>
          <img src={logoLaak} alt='Theater Laak logo' />
          <button id='ProgrammeringBtn'>Programmering</button>
        </div>
        <div className='flex-item'>
          <img src={Photo1} alt='afbeelding van een theather' />
          <p>test</p>
        </div>
        <div className='flex-item'>
          <img src={Photo1} alt='afbeelding van een theather' />
          <p>test</p>
        </div>
      </div>
    );
  }
}
export default Home;
