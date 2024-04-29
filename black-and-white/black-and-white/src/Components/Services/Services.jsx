import React, { useContext, useEffect, useState } from "react";
import "./Services.css";
import axios from "axios";
import Footer from "./../Footer/Footer";
import "animate.css";
import WOW from "wowjs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { logoContext } from "../../context";

export default function Services() {
  const [AllCategories, setAllCategories] = useState([]);
  const [TitleServ, setTitleServ] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const wow = new WOW.WOW();
  const {LogoLink} = useContext(logoContext);

  async function getSservice() {
    try {
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/services"
      );

      setAllCategories(data.data);
    } catch (error) {}
  }

  async function serviceTitle() {
    try {
      const { data } = await axios.get(
        "https://dashboard.blackandwhiteme.com/api/servicePage"
      );

      setTitleServ(data.data);
    } catch (error) {}
  }

  useEffect(function () {
    getSservice();
    serviceTitle();
    wow.init();
  }, []);

  const toggleReadMore = (categoryId) => {
    setExpandedCategory((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
  };

  return (
    <>

<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Services"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>

      <h1
        className="service-head wow animate__animated  animate__fadeIn"
        data-wow-duration="1.5s"
        data-wow-delay="0.5s"
        style={{ fontSize: `${TitleServ.title_size}px` }}
      >
        {TitleServ.title}
      </h1>
      <div
        className="container d-flex justify-content-center align-items-center service-page wow animate__animated  animate__fadeIn "
        data-wow-duration="1.5s"
        data-wow-delay="1s"
      >
        <div className="row">
          {AllCategories.map(function (category, idx) {
            const isExpanded = expandedCategory === category.id;

            return (
              <div
                key={idx}
                className={`col-md-3 box   ${isExpanded ? "expanded" : ""}`}
              >
                <div
                  className="text-start p-2  service-box "
                  style={{ height: isExpanded ? "auto" : "265px" }}
                >
                  <img
                    className="brand-img"
                    src={category.image}
                    alt="imageee"
                  ></img>
                  <h3 className="minor-head2">{category.title}</h3>
                  <p className="minor-p">
                    {isExpanded
                      ? category.description
                      : category.description.slice(0, 105)}
                  </p>

                  <Link
                    className=" text-decoration-none  text-white alink "
                    onClick={() => toggleReadMore(category.id)}
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                    <i className="fa-solid fa-angle-right font-logo "></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {AllCategories.length > 0 && <Footer />}
    </>
  );
}
