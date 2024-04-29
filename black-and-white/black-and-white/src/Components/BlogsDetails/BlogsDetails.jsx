import React, { useContext } from "react";
import "./BlogsDetails.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "./../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';
import { logoContext } from "../../context";

export default function BlogsDetails() {
  const { id } = useParams();
  const [BlogsDetailEdit, setBlogsDetailEdit] = useState([]);
  const {LogoLink} = useContext(logoContext);

  useEffect(() => {
    const RecieveBlogsDetails = async () => {
      try {
        const formData = new FormData();
        formData.append("blog_id", id);

        const response = await axios.post(
          "https://dashboard.blackandwhiteme.com/api/blog",
          formData
        );
        setBlogsDetailEdit(response.data.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    AOS.init();

    RecieveBlogsDetails();
  }, []);

  return (
    <>


<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|BlogsDetails"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>

      <div className="container w-75 py-5 blogs-details">
        <img
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-delay="400"
          data-aos-duration="800"
          data-aos-offset="0"
          className="w-100 blog-img"
          src={BlogsDetailEdit.image}
          alt="blog"
        />
        <h4
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-delay="900"
          data-aos-duration="1200"
          data-aos-offset="0"
          className="text-white mt-4"
        >
          {BlogsDetailEdit.title}{" "}
        </h4>
        <p
          data-aos="fade-zoom-in"
          data-aos-easing="ease-out"
          data-aos-delay="1200"
          data-aos-duration="1200"
          data-aos-offset="0"
          className="text-white description mt-4"
          dangerouslySetInnerHTML={{ __html: BlogsDetailEdit.description }}
        />
      </div>
      {BlogsDetailEdit && Object.keys(BlogsDetailEdit).length > 0 && <Footer />}
    </>
  );
}
