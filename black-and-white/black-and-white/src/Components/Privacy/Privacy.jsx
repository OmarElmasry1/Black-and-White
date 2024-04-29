import React, { useContext } from "react";
import "./Privacy.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './../Footer/Footer';
import { Helmet } from "react-helmet";
import { logoContext } from "../../context";


export default function Privacy() {

  const [getPrivacy, setGetPrivacy] = useState([]);
  const {LogoLink} = useContext(logoContext);
 
  async function PrivacyDetails() {
    try {
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/privacy"
      );

      setGetPrivacy(data.data);
    } catch (error) {
      console.log("error", error);
    }
  
  }

  useEffect(() => {
    AOS.init();
    PrivacyDetails();
   
  }, []);

  


  return (
    <>

<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Privacy"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>


      <div className="container  m-auto  privacy-content ">
        <div className="text">
          <h1 className="privacy-head"  data-aos="fade-zoom-in"
        data-aos-easing="ease-out"
        data-aos-delay="400"
        data-aos-duration="1200"
        data-aos-offset="0"  style={{fontSize:`${getPrivacy.title_size}px`}}>{getPrivacy.title}</h1>
          <p className="privacy-paragraph" data-aos="fade-zoom-in"
                  data-aos-easing="ease-out"
                    data-aos-delay="800"
                    data-aos-duration="1200"
                    data-aos-offset="0"   dangerouslySetInnerHTML={{ __html: getPrivacy.description }} />
        </div>
      </div>
      {getPrivacy && Object.keys(getPrivacy).length > 0 && <Footer />}
    </>
  );
}
