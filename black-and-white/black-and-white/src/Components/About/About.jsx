import React, { useContext } from "react";
import "./About.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from './../Footer/Footer';
import 'animate.css'; 
import WOW from 'wowjs'; 
import { Helmet } from 'react-helmet';
import { logoContext } from "../../context";



export default function About() {

  const [getDetails, setGetDetails] = useState([]);
  const wow = new WOW.WOW();
  const {LogoLink} = useContext(logoContext);



  async function AboutDetails() {
  
    try {
     
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/about"
      );
      setGetDetails(data.data);

    } catch (error) {
      console.log("error", error)
    }
  
    
  }



  useEffect(() => {

    AboutDetails();
  
    wow.init();
   
  }, []);





  return (
    <>
      

      <Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|About"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>
    
      <div className="container m-auto about-content"  >
      <div className="text ">
      
            
            <h1 className="about-head  wow animate__animated  animate__fadeIn"  data-wow-duration="1.5s" data-wow-delay="0.5s"  style={{fontSize:`${getDetails.title_size}px`}}>{getDetails.title}</h1>

            
            <p className="about-paragraph wow animate__animated  animate__fadeIn" data-wow-duration="1.5s" data-wow-delay="1s"  dangerouslySetInnerHTML={{ __html: getDetails.body }} />
          
        </div>
     
      </div>
    
      {getDetails && Object.keys(getDetails).length > 0 &&  <Footer /> }
    </>
  );
}
