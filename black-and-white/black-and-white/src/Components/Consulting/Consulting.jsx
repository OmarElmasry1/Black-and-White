import React, { useContext } from "react";
import "./Consulting.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Hourglass } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import Footer from "./../Footer/Footer";
import 'animate.css'; 
import WOW from 'wowjs'; 
import { Helmet } from "react-helmet";
import { logoContext } from "../../context";

export default function Consulting() {
  let user = {
    name: "",
    contact_number: "",
    email: "",
    business_name: "",
    website: "",
    purpose: "",
    challenges: "",
  };



  const [SuccessMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ConsultTitle, setConsultTitle] = useState([]);
  const wow = new WOW.WOW();
  const {LogoLink} = useContext(logoContext);


  async function SendConsulting(values, { resetForm }) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://dashboard.blackandwhiteme.com/api/consulting",
        values
      );

      if (data.status === true) {
        console.log(values);

        setSuccessMsg(data.msg);
        resetForm({ value: "" });
        setTimeout(() => {
          setSuccessMsg(false);
        },0);
      }
    } catch (error) {
      console.log("error", error);
    }

    setIsLoading(false);
  }


 


  const formikObj = useFormik({
    initialValues: user,

    onSubmit: SendConsulting,

    validate: function (values) {
      const errors = {};

      if (!values.contact_number.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.contact_number = "Contact Number is Invalid";
      }

      if (
        (values.email.includes("@") && values.email.includes(".")) === false
      ) {
        errors.email = "Email must be include @ and .";
      }

      if (values.business_name === "") {
        errors.business_name = "Business Name Is Empty";
      }

      if (values.purpose === "") {
        errors.purpose = "Purpose Of Consultation  Is Empty";
      }

      if (values.challenges === "") {
        errors.challenges = "Challenges Is Empty";
      }

      return errors;
    },
  });


  async function GetConsultTitle() {

    try {
      const{data} = await axios.get("https://dashboard.blackandwhiteme.com/api/consultingPage")

      setConsultTitle(data.data);
    } catch (error) {
      console.log("error", error);
    }
  }


  useEffect(() => {
    wow.init();
    
    GetConsultTitle();
  
  }, []);
  
 

  return (
    <>

<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Consulting"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>

{SuccessMsg ? toast.success(SuccessMsg) : ""} ;


          <div className="container d-flex justify-content-center align-items-center consulting-page  wow animate__animated  animate__fadeIn" data-wow-duration="1.5s" data-wow-delay="0.25s">
            
            <form onSubmit={formikObj.handleSubmit} className=" consult-form">
            <h1 className="consult-head" style={{fontSize: `${ConsultTitle.title_size}px`}}>{ConsultTitle.title}</h1>
              <h5 className="consult-minor-head">
                Please fill out the following details to reserve your marketing
                consultation session:
              </h5>
              <div className="mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.name}
                  type="text"
                  id="name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                />
                {formikObj.errors.name && formikObj.touched.name ? (
                  <div className="alert text-white">
                    {formikObj.errors.name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.contact_number}
                  type="tel"
                  id="contact_number"
                  className="form-control"
                  placeholder="Contact Number"
                />
                {formikObj.errors.contact_number &&
                formikObj.touched.contact_number ? (
                  <div className="alert text-white">
                    {formikObj.errors.contact_number}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.email}
                  type="email"
                  id="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Email Adress"
                />
                {formikObj.errors.email && formikObj.touched.email ? (
                  <div className="alert text-white">
                    {formikObj.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.business_name}
                  type="text"
                  id="business_name"
                  className="form-control"
                  placeholder="Business Name"
                />
                {formikObj.errors.business_name &&
                formikObj.touched.business_name ? (
                  <div className="alert text-white">
                    {formikObj.errors.business_name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.website}
                  type="text"
                  id="website"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Website / Business Page (If applicable)"
                />
                {formikObj.errors.website && formikObj.touched.website ? (
                  <div className="alert text-white">
                    {formikObj.errors.website}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h5 className="consult-minor-head">Purpose of Consultation: </h5>
              <div className="mb-3 ">
                <textarea
                  id="purpose"
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.purpose}
                  type="text"
                  className="form-control"
                  rows="4"
                ></textarea>
                {formikObj.errors.purpose && formikObj.touched.purpose ? (
                  <div className="alert text-white">
                    {formikObj.errors.purpose}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <h5 className="consult-minor-head">
                Briefly describe the specific challenges or areas you would like
                to discuss during the session:
              </h5>
              <div className="mb-3 ">
                <textarea
                  id="challenges"
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.challenges}
                  type="text"
                  className="form-control"
                  rows="4"
                ></textarea>
                {formikObj.errors.challenges && formikObj.touched.challenges ? (
                  <div className="aalert text-white">
                    {formikObj.errors.challenges}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <button
                type="submit"
                disabled={
                  formikObj.isValid === false || formikObj.dirty === false
                }
                className=" contact-btn mb-5"
              >
                {isLoading ? (
                  <Hourglass
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["black", "black"]}
                  />
                ) : (
                  "Submit"
                )}
              </button>
       
            </form>
          </div>
      <Footer />
    </>
  );
}
