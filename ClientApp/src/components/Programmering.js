import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function getMaand(sum) {
  const today = new Date();
  const maandNamen = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "July", "Augustus", "September", "October", "November", "December"];
  if (today.getMonth()+sum > 11) {
    return maandNamen[today.getMonth()+sum-12]
  } else {
    return maandNamen[today.getMonth()+sum]
  } 
}



export class Programmering extends Component {
  render() {
    return (
      <div>
        <div className='fetchlistmaanden'>
          <b><p style={{fontSize: 35, textAlign: 'center'}}>{getMaand(0)}</p></b>
          <Carousel responsive={responsive}>
          {voorstellingen ? voorstellingen.map((voorstelling, index) => {
            return (
              <div key={index} style={{height: 200, width: 200, textAlign: 'center', backgroundColor: 'whitesmoke'}}>
                {voorstelling.titel}
                <img src={voorstelling.img} style={{height: 200, width: 200}}></img>
              </div>
            );
          }) : <div />}
          </Carousel>
          <b><p style={{fontSize: 35, textAlign: 'center'}}>{getMaand(1)}</p></b>
          <Carousel responsive={responsive}>
          {voorstellingen ? voorstellingen.map((voorstelling, index) => {
            return (
              <div key={index} style={{height: 200, width: 200, textAlign: 'center', backgroundColor: 'whitesmoke'}}>
                {voorstelling.titel}
                <img src={voorstelling.img} style={{height: 200, width: 200}}></img>
              </div>
            );
          }) : <div />}
          </Carousel>
          <b><p style={{fontSize: 35, textAlign: 'center'}}>{getMaand(2)}</p></b>
          <Carousel responsive={responsive}>
          {voorstellingen ? voorstellingen.map((voorstelling, index) => {
            return (
              <div key={index} style={{height: 200, width: 200, textAlign: 'center', backgroundColor: 'whitesmoke'}}>
                {voorstelling.titel}
                <img src={voorstelling.img} style={{height: 200, width: 200}}></img>
              </div>
            );
          }) : <div />}
          </Carousel>
        </div>
      </div>
    )
  }
}


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};
export default Programmering;


const voorstellingen = [
  {
    datum:"19-12-2022", 
    titel: "elvis",
    omschrijving: "elvis gaat zingen",
    img: "https://imgur.com/p6nUEDX.jpg",
    zaal:
    { 
      zaalId: "123453",
      eersterang: 
      [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      tweederang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      derderang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ]
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
    datum:"19-12-2022", 
    titel: "jan",
    omschrijving: "jan eet steen",
    img: "https://imgur.com/QJTWyqA.jpg",
    zaal:
    { 
      zaalId: "222222",
      eersterang: 
      [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      tweederang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      derderang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ]
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
    datum:"19-12-2022", 
    titel: "elvis",
    omschrijving: "elvis gaat zingen",
    img: "https://imgur.com/p6nUEDX.jpg",
    zaal:
    { 
      zaalId: "123453",
      eersterang: 
      [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      tweederang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      derderang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ]
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
    datum:"19-12-2022", 
    titel: "jan",
    omschrijving: "jan eet steen",
    img: "https://imgur.com/QJTWyqA.jpg",
    zaal:
    { 
      zaalId: "222222",
      eersterang: 
      [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      tweederang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ],
      derderang:  [
        {
          Rij: 1,
          Zitplaats: 1,
          Bezet: false,
        },
        {
          Rij: 1,
          Zitplaats: 2,
          Bezet: false 
        },
        {
          Rij: 1,
          Zitplaats: 3,
          Bezet: true 
        }
      ]
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