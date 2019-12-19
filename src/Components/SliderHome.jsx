import React, { Component } from "react";
import Slider from 'react-slick';
// React-Slick from :
// https://react-slick.neostack.com/docs/get-started/
// React-Slick docs :
// https://react-slick.neostack.com/docs/example/auto-play

import img01 from '../Assets/img/StarWars.jpg';
import img02 from '../Assets/img/Frozen2.jpg';
import img03 from '../Assets/img/Jumanji_Next_Level.jpg';
import img04 from '../Assets/img/FordFerrari.jpg';
import img05 from '../Assets/img/Hotel_DeLuna.jpg';
import img06 from '../Assets/img/Detective_K_Secret_of_theLivingDead.jpg';
import img07 from '../Assets/img/Rumah_Kentang.jpg';
import img08 from '../Assets/img/Habibie_Ainun3.jpg';
import img09 from '../Assets/img/The_Battleship_Island.jpg';
import "./StyleCSS/component_styles.css";


class SliderHome extends Component {
  state = { };

  render() {

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 8000,
      autoplaySpeed: 500,
      cssEase: "linear"
    };

    return (

      <div className="container-fluid">
      {/* attribute className must be added, so that pictures show up */}
        <div className="component-slider-01">
          <p><h2> Popular Movies of this month </h2></p>
        </div>
        
        <Slider {...settings}>
          <div>
            {/* <h3>1</h3> */}
            <img src={img01} alt="sliderhome-img-1" />
          </div>
          <div>
            {/* <h3>2</h3> */}
            <img src={img02} alt="sliderhome-img-2" />
          </div>
          <div>
            {/* <h3>3</h3> */}
            <img src={img03} alt="sliderhome-img-3" />
          </div>
          <div>
            {/* <h3>4</h3> */}
            <img src={img04} alt="sliderhome-img-4" />
          </div>
          <div>
            {/* <h3>5</h3> */}
            <img src={img05} alt="sliderhome-img-5" />
          </div>
          <div>
            {/* <h3>6</h3> */}
            <img src={img06} alt="sliderhome-img-6" />
          </div>
          <div>
            {/* <h3>7</h3> */}
            <img src={img07} alt="sliderhome-img-7" />
          </div>
          <div>
            {/* <h3>8</h3> */}
            <img src={img08} alt="sliderhome-img-8" />
          </div>
          <div>
            {/* <h3>9</h3> */}
            <img src={img09} alt="sliderhome-img-9" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default SliderHome;
