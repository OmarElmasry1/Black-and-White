import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";
import { logoContext } from "../../context";




export default function NavbarCustome() {
 
  const {LogoLink, LogoEdit} = useContext(logoContext);
 
  //   const [LogoLink, setLogoLink] = useState([]);
   
  //  async function NavbarEdit() {
  
  //   try {
  //     const { data } = await axios.get(
  //       "https://dashboard.blackandwhiteme.com/api/website_info"
  //     );
  //     setLogoLink(data.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }

  const hideNavbar = () => {
 
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler && window.innerWidth < 992) {
      navbarToggler.click();
    }
  };

   
  useEffect(() => {
    LogoEdit();
  }, []);


  return (
    <>


      <header id="header" className="d-flex align-items-center">
        <nav
          id="header"
          className="navbar navbar-expand-lg navbar-dark bg-transparent"
        >
          <div className="container">
            <NavLink className="navbar-brand logo" to="/home">
              <img
                src={LogoLink.logo}
                alt=""
                title=""
              />
            </NavLink>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
           
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav ms-auto ii">
                <li>
                  <NavLink className="nav-link " onClick={hideNavbar}  to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/about">
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/service">
                    Services
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/consulting">
                    Consulting
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/blogs">
                    Blogs
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/career">
                    Career
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " onClick={hideNavbar} to="/contact">
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>  




    </>
  );
}
