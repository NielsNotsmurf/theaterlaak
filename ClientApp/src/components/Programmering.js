import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export class Programmering extends Component {
  render() {
    return (
      <div>
        <b><p style={{fontSize: 35, textAlign: 'center'}}>Januari</p></b>
        <Carousel responsive={responsive}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
          <div>Item 6</div>
          <div>Item 7</div>
          <div>Item 8</div>
        </Carousel>
        <b><p style={{fontSize: 35, textAlign: 'center'}}>Februari</p></b>
        <Carousel responsive={responsive}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
          <div>Item 6</div>
          <div>Item 7</div>
          <div>Item 8</div>
        </Carousel>
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
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default Programmering;
