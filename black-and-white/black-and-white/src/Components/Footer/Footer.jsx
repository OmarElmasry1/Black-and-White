import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { logoContext } from "../../context";


export default function Footer() {

   
  const {LogoLink, LogoEdit} = useContext(logoContext);

  // const [SocialLink, setSocialLink] = useState([]);

  // async function SocialLinks() {
  //   try {
  //     const { data } = await axios.get(
  //       "https://dashboard.blackandwhiteme.com/api/website_info"
  //     );
  //     console.log(data);
  //     setSocialLink(data.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  useEffect(() => {
    LogoEdit();
  }, []);



    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
     <footer id="footer">
  <div className="footer-top">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 footer-info">
          <img
            className="footer-logo"
            src={LogoLink.logo}
            alt="TheEvent"
          />
          <p>
            We are passionate about the art and science of brand building.
            Let us help you amplify your impact and unlock your brand's full potential.
          </p>
        </div>

        <div className="col-lg-6 col-md-6 footer-links">
          <h4>Useful Links</h4>
          <div className="row">
            <div className="col-md-6">
              <ul>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/home" onClick={scrollToTop}>Home</Link>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/about" onClick={scrollToTop}>About us</Link>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/service" onClick={scrollToTop}>Services</Link>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/consulting" onClick={scrollToTop}>Consulting</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul>
                {/* <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/blogs" onClick={scrollToTop}>Blogs</Link>
                </li> */}
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/career" onClick={scrollToTop}>Career</Link>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/contact" onClick={scrollToTop}>Contact Us</Link>
                </li>
                <li>
                  <i className="fa-solid fa-angle-right"></i>
                  <Link to="/privacy" onClick={scrollToTop}>Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 footer-contact">
          <h4>Contact Us</h4>
          <p>

            <strong>Email:</strong> {LogoLink.email}
            <br />
          </p>

          <div className="social-links">
            <Link
              to={LogoLink.facebook}
              className="facebook"
              target="_blank"
            >
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link
              to={LogoLink.instagram}
              className="instagram"
              target="_blank"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link
              to={LogoLink.linkedin}
              className="inkedin"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
            <Link
              to={LogoLink.linkedin}
              className="threads"
              target="_blank"
            >
              <i class="fa-brands fa-threads"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="copyright">
    &copy; Copyright <strong>B&W</strong>. All Rights Reserved
  </div>
</footer>
    </>
  );
}
