import React, { useContext } from "react";
import "./Blogs.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from 'react-helmet';
import { logoContext } from "../../context";

export default function Blogs() {
  const [BlogsEdit, setBlogsEdit] = useState([]);
  const [BlogTitle, setBlogTitle] = useState([]);
  const {LogoLink} = useContext(logoContext);

  async function RecieveBlogs() {
    try {
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/blogs"
      );
      setBlogsEdit(data.data);
    } catch (error) {
     
    }
  }

  async function RecieveBlogTitle() {
    try {
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/blogPage"
      );
      setBlogTitle(data.data);
    } catch (error) {
    
    }
  }

  useEffect(function () {
    RecieveBlogTitle();
    RecieveBlogs();
    AOS.init();
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <>

<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Blogs"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>



     <h1
            className="blog-head"
            data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-delay="400"
            data-aos-duration="1200"
            data-aos-offset="0"
            style={{ fontSize: `${BlogTitle.title_size}px` }}
          >
            {BlogTitle.title}
          </h1>

      <div className="container blog-page  "  data-aos="fade-zoom-in"
            data-aos-easing="ease-out"
            data-aos-delay="600"
            data-aos-duration="1200"
            data-aos-offset="0">
        <div className="row">
         

          {BlogsEdit.map((blog, idx) => {
            return (
              <div key={idx} className="col-md-3 mt-5 ">
                <div
                  className="all-box text-start box mt-2 h-100 "
                
                >
                <Link onClick={handleClick} to={`/blogsDetails/${blog.id}`}>
                  <img className="w-100" src={blog.image} alt="blog" />
                  <h4 className="text-white mt-3">{blog.title}</h4>
                  <p
                    className="text-white description mt-2"
                    dangerouslySetInnerHTML={{
                      __html: blog.description.slice(0, 105),
                    }}
                  />
                </Link>
                  <div className="link-edit center-btn">
                    <Link onClick={handleClick} to={`/blogsDetails/${blog.id}`}>
                      <span>Read More</span>
                      <i className="fa-solid fa-angle-right font-logo "></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {BlogsEdit.length > 0 && <Footer />}
    </>
  );
}
