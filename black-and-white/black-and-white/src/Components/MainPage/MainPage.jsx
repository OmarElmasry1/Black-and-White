import React, { useContext } from "react";
import "./MainPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'animate.css'; 
import WOW from 'wowjs'; 
import Navbar from './../Navbar/Navbar';
import {Helmet} from "react-helmet";
import { logoContext } from "../../context";



export default function MainPage() {

  const {LogoLink} = useContext(logoContext);
  const [VideoLink, setVideoLink] = useState([]);
  const wow = new WOW.WOW();


 
 async function MainPageEdit() {

  try {
    const { data } = await axios.get(
      "https://dashboard.blackandwhiteme.com/api/website_info" 
      
    );
    setVideoLink(data.data);
   
  } catch (error) {
    console.log("error", error);
  }
    }

  
  
    const scrollToTop = () => {

      window.scrollTo(0, 0);
    };

    const handleClick = () => {
  
      scrollToTop();
    };




 
useEffect(() => {
  wow.init();
  
    MainPageEdit();

}, []);

const isMobile = window.innerWidth <= 768;


  return (
    <>
<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Home"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>

  <Navbar />

      <section id="hero">
        <video autoPlay muted loop playsInline className="video">
          {isMobile ? (
            <source
            src="https://dashboard.blackandwhiteme.com/dashboard/assets/videos/mobile1.mp4"
            type="video/mp4"
          />
          ): (
            <source
            src="https://dashboard.blackandwhiteme.com/dashboard/assets/videos/mobile2.mp4"
            type="video/mp4"
          />
          )}
        </video>


    <div className="consult-button wow animate__animated  animate__fadeIn h-100 d-flex align-items-end justify-content-center pb-5 " data-wow-duration="3s" data-wow-delay="5s" >
          <Link className="btn-c" to="/consulting"  onClick={handleClick}>Get Consulting</Link>
        </div>

  </section>
    

 

      {/* <div className="consulting">
        <p className="consult-head">Get Consulting </p>

        <div className="consult-button">
          <Link className="btn-c" onClick={handleClick}>For Consulting</Link>
        </div>

      </div> */}

      {/* <section id="supporters" className="section-with-bg">

<div className="container supporter-sec" data-aos="fade-up">


  <div className="row no-gutters supporters-wrap clearfix" data-aos="zoom-in" data-aos-delay="100">

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/1.png")} alt="" title=""/>
      
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/2.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/3.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/4.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/5.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/6.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/7.png")} alt="" title=""/>
      </div>
    </div>

    <div className="col-lg-3 col-md-4 col-xs-6">
      <div className="supporter-logo">
      <img src={require("../../images/8.png")} alt="" title=""/>
      </div>
    </div>

  </div>
  </div>


</section> */}
    </>
  );
}
