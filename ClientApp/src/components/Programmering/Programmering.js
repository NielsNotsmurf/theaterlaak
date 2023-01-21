import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MeerInfo } from './MeerInfo';
import { KoopTicket } from './koopTicket';
import momentService from '../Services/momentService';
import {formatDateTime} from '../Helpers/format';

export class Programmering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: {},
      type: "isloading",
      periodeMomenten: []
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

  async componentDidMount() {
    let fetch = await momentService.GetPeriodeMomenten();
    let maandmomenten = [];
    for (let maandIndex = 0; maandIndex < 3 ; maandIndex++) {
      maandmomenten.push([]);
      for (let momentIndex = 0; momentIndex < fetch.length; momentIndex++) { 
        if (new Date(fetch[momentIndex].startDateTime).getMonth() == new Date(new Date().setMonth(new Date().getMonth()+maandIndex)).getMonth()) {
          maandmomenten[maandIndex].push(fetch[momentIndex]); 
        }
      }
    }
    maandmomenten.forEach(maandmoment => {
      maandmoment.sort(function(b,a){
        return new Date(b.startDateTime) - new Date(a.startDateTime);
      });
    })
    this.setState({...this.state, periodeMomenten: maandmomenten, type: ""})
  }

  render() {
    switch(this.state.type) {
      case "isloading" :
        return <div>Voorstellingen worden geladen...</div>
      case "meerInfo" :
      return <MeerInfo callback={(e) => {this.setState({...this.state, type:e})}} moment={this.state.moment}/>;
      case "koopTicket" :
        return <KoopTicket  callback={(e) => {this.setState({...this.state, type:e})}} moment={this.state.moment}/>;
      case "" :
        return (
          <div>
            <div className='maanden'>
              {this.state.periodeMomenten ? this.state.periodeMomenten.map((momenten, index) => (
                <div key={index} className="maand">
                  <b><p style={{fontSize: 35}}>{this.getMaand(index)}</p></b>
                  <div style={{padding: 20}}>
                    <Carousel responsive={responsive} centerMode={true} showDots={true}>
                    {momenten ? momenten.map((moment, index) => {
                      return (
                        <div id="momentBox" key={index} style={{height: 370, width: 200, textAlign: 'center' }}>
                          <div style={{height: 300, width: 200, backgroundColor: 'white', boxShadow: '0px 0px 2px gray'}}>
                            <p alt="Voorstelling titel">{moment.voorstellingTitel}</p>
                          <img src={moment.voorstellingAfbeelding} style={{height: 150, width: 110}} alt="Foto voorstelling"></img>
                            <p alt="zaalnummer">{moment.zaalType}</p>
                            <p alt="datum voorstelling">{formatDateTime(new Date(moment.startDateTime))}</p>
                          </div>
                          <button id="meerButton" onClick={(a)=>this.onClickMeer(moment)} alt="Meer informatie button">Meer over {moment.voorstellingNaam}</button>
                        </div>
                      );
                    }) : <div />}
                    </Carousel>
                  </div>
                </div>
              )):<div/>}
            </div>
          </div>
        );
    }
  }
}
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1500, min: 800 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 800, min: 0 },
    items: 1
  }
};

export default Programmering;


