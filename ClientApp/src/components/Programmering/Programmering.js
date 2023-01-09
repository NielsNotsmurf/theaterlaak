import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MeerInfo } from './MeerInfo';
import { KoopTicket } from './koopTicket';

export class Programmering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: {},
      type: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  getMaand(sum) {
    const today = new Date();
    const maandNamen = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "July", "Augustus", "September", "October", "November", "December"];
    if (today.getMonth()+sum > 11) {
      return maandNamen[today.getMonth()+sum-12]
    } else {
      return maandNamen[today.getMonth()+sum]
    } 
  }
  onClickBestellen(moment) {
    this.setState({...this.state, moment: moment, type: "koopTicket"})
  }
  onClickMeer(moment) {
    this.setState({...this.state, moment: moment, type: "meerInfo"})
  }
  renderSwitch() {
    switch(this.state.type) {
      case "meerInfo" :
      return <MeerInfo callback={(e) => {this.setState({...this.state, type:e})}} moment={this.state.moment}/>;
      case "koopTicket" :
        return <KoopTicket moment={this.state.moment}/>;
      case "" :
      return <></>;
    }
  }
  render() {
    return (
      <div>
        <div id="topfield">
          {this.renderSwitch()}
        </div>
        <div className='maanden'>
          {maandMomenten ? maandMomenten.map((momenten, index) => (
            <div key={index} className="maand">
              <b><p style={{fontSize: 35}}>{this.getMaand(index)}</p></b>
              <div style={{padding: 20}}>
                <Carousel responsive={responsive} centerMode={true} showDots={true}>
                {momenten ? momenten.map((moment, index) => {
                  return (
                    <div key={index} style={{height: 370, width: 320, textAlign: 'center' }}>
                      <div style={{height: 300, width: 320, backgroundColor: 'white', boxShadow: '0px 0px 2px gray'}}>
                        <p alt="Voorstelling titel">{moment.voorstelling.titel}</p>
                        <img src={moment.voorstelling.img} style={{height: 180, width: 320}} alt="Foto voorstelling"></img>
                        <p alt="datum voorstelling">{moment.dateTime}</p>
                        <p alt="zaalnummer">{moment.zaal.zaalNr}</p>
                      </div>
                      <button id="meerButton" onClick={(a)=>this.onClickMeer(moment)} alt="Meer informatie button">Meer over {moment.voorstelling.titel}</button>
                    </div>
                  );
                }) : <div />}
                </Carousel>
              </div>
            </div>
          )):<div/>}
        </div>
      </div>
    )
  }
}
const responsive = {
  superLargeDesktop: {breakpoint: { max: 4000, min: 3000 }, items: 3},
  desktop: {breakpoint: { max: 3000, min: 1024 }, items: 2},
  tablet: {breakpoint: { max: 1024, min: 464 }, items: 1},
  mobile: {breakpoint: { max: 464, min: 0 }, items: 1}
};
//examplefetch
const maandMomenten =
[ 
  [
    {
      id: 1,
      dateTime:"19-12-2022 01:30:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 2,
      dateTime:"19-12-2022 02:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 3,
      dateTime:"19-12-2022 02:30:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 4,
      dateTime:"19-12-2022 02:30:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 5,
      dateTime:"19-12-2022 02:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    }
  ],
  [
    {
      id: 6,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 7,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 8,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 9,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 10,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    }
  ],
  [
    {
      id: 11,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 12,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 13,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 14,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Elvis",
        omschrijving: "elvis gaat zingen",
        img: "https://imgur.com/p6nUEDX.jpg",
      },
     zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    },
    {
      id: 15,
      dateTime:"19-12-2022 03:00:00", 
      voorstelling:{
        titel: "Jantje",
        omschrijving: "Jantje eet steen",
        img: "https://imgur.com/QJTWyqA.jpg",
      },
      zaal:
      { 
        zaalNr: "zaal 4",
        aantalstoelen1: 120,
        aantalstoelen2: 120,
        aantalstoelen3:20
      },
      betrokene: [
        {
          beschrijving:"Swerelds bestverkopende rock artiest! Elvis!",
          img: "https://imgur.com/5wQJZJ7.jpeg",
          geboortedatum: "10/10/2002"
        }
      ]
    }
  ]
]
export default Programmering;


