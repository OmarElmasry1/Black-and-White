
import React, { useContext } from "react";
import './Career.css'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Hourglass } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import axios from "axios";
import 'animate.css'; 
import WOW from 'wowjs'; 
import Footer from './../Footer/Footer';
import { Helmet } from "react-helmet";
import { logoContext } from "../../context";



export default function Career() {
  let user = {
    name: "",  
    phone: "",
    email: "",
    current_location: "",
    current_position: "",
    company: "",
    job_title: "",
    work_experience: "",
    skills: "",
    event_experience: "",
    cv: null,
  };


  const [SuccessMsg, setSuccessMsg] = useState(null);
  const [ErrorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [CareerTitle, setCareerTitle] = useState([]);
  const wow = new WOW.WOW();
  const {LogoLink} = useContext(logoContext);


  async function careerForm(values, { resetForm }) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // Append all form values to formData
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const { data } = await axios.post(
        "https://dashboard.blackandwhiteme.com/api/career",
        formData
      );
  
      if (data.status === true) {

  
        setSuccessMsg(data.msg);
  
        resetForm({ value: "" });
        const inputFile = document.getElementById('cv');
        if (inputFile) {
          inputFile.type = 'text';
          inputFile.type = 'file';
        }
        setTimeout(() => {
          setSuccessMsg(false);
        }, 0);
      } else if (data.status === false) {
        setErrorMsg(data.msg);
        setTimeout(() => {
          setErrorMsg(false);
        }, 0);
      }

    } catch (error) {
      console.log("error", error);
    }
  
    setIsLoading(false);
  }



  const formikObj = useFormik({
    initialValues: user,

    onSubmit: careerForm,

    validate: function (values) {
      const errors = {};

      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "Contact Number is Invalid";
      }

      if (
        (values.email.includes("@") && values.email.includes(".")) === false
      ) {
        errors.email = "Email must be include @ and .";
      }

      if (values.current_location === "") {
        errors.current_location = "Current Location Is Empty";
      }

      if (values.current_position === "") {
        errors.current_position = "Current Position Is Empty";
      }

      if (values.company === "") {
        errors.company = "Company Is Empty";
      }

      if (values.job_title === "") {
        errors.job_title = "Job Title Is Empty";
      }

      if (values.work_experience === "") {
        errors.work_experience = "Work Experience Is Empty";
      }

      if (values.skills === "") {
        errors.skills = "Skills Is Empty";
      }
      if (values.cv === "") {
        errors.cv = "CV Form Is Empty";
      }

      return errors;
    },
  });


  async function GetCareerTitle() {

    try {
      const{data} = await axios.get("https://dashboard.blackandwhiteme.com/api/careerPage")

      setCareerTitle(data.data);
    } catch (error) {
      console.log("error", error);
    }
  }



  useEffect(() => {
    wow.init();
    GetCareerTitle();
  }, []);
  

  return (
    <>
    
    <Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Career"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>

    
      {SuccessMsg ? toast.success(SuccessMsg) : ""} ;
      {ErrorMsg ? toast.error(ErrorMsg) : ""} ;

     <div className="container d-flex justify-content-center align-items-center career-page wow animate__animated  animate__fadeIn" data-wow-duration="1.5s" data-wow-delay="0.25s">
      <form  onSubmit={formikObj.handleSubmit} className="mt-5 career-form">
      <h1 className="career-head" style={{fontSize: `${CareerTitle.title_size}px`}}>{CareerTitle.title}</h1>
        <div className="mb-3 mt-5">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.name}
            type="text"
            id="name"
            className="form-control"
            placeholder="Full Name"
          />
          {formikObj.errors.name && formikObj.touched.name ? (
            <div className="alert alert-danger">{formikObj.errors.name}</div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3 ">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.phone}
            type="tel"
            id="phone"
            className="form-control"
            placeholder="Phone Number"
          />
          {formikObj.errors.phone && formikObj.touched.phone ? (
            <div className="alert text-white">{formikObj.errors.phone}</div>
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
            placeholder="Email Adress"
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <div className="alert text-white">{formikObj.errors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.current_location}
            type="text"
            id="current_location"
            className="form-control"
            placeholder="Current Location"
          />
          {formikObj.errors.current_location &&
          formikObj.touched.current_location ? (
            <div className="alert text-white">
              {formikObj.errors.current_location}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.current_position}
            type="text"
            id="current_position"
            className="form-control"
            placeholder="Current Position"
          />
          {formikObj.errors.current_position &&
          formikObj.touched.current_position ? (
            <div className="alert text-white">
              {formikObj.errors.current_position}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.company}
            type="text"
            id="company"
            className="form-control"
            placeholder="Your Company"
          />
          {formikObj.errors.company && formikObj.touched.company ? (
            <div className="alert text-white">{formikObj.errors.company}</div>
          ) : (
            ""
          )}
        </div>
        <h4 className="career-minor-head">Position Applied For:</h4>
        <div className="mb-3">
          <input
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.job_title}
            type="text"
            id="job_title"
            className="form-control"
            placeholder="Job Title"
          />
          {formikObj.errors.job_title && formikObj.touched.job_title ? (
            <div className="alert text-white">
              {formikObj.errors.job_title}
            </div>
          ) : (
            ""
          )}
        </div>
        <h4 className="career-minor-head">Work Experience:</h4>
        <p className="work">
          Please outline your relevant work experience, including previous
          positions held, duration, and responsibilities.
        </p>
        <div className="mb-3">
          <textarea
            id="work_experience"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.work_experience}
            type="text"
            className="form-control"
            rows="4"
          ></textarea>
          {formikObj.errors.work_experience &&
          formikObj.touched.work_experience ? (
            <div className="alert text-white">
              {formikObj.errors.work_experience}
            </div>
          ) : (
            ""
          )}
        </div>
        <h4 className="career-minor-head">Skills and Expertise:</h4>
        <p className="work">
          Please list your key skills and areas of expertise that are relevant
          to the position you are applying for.
        </p>
        <div className="mb-3">
          <textarea
            id="skills"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.skills}
            type="text"
            className="form-control"
            rows="4"
          ></textarea>
          {formikObj.errors.skills && formikObj.touched.skills ? (
            <div className="alert text-white">{formikObj.errors.skills}</div>
          ) : (
            ""
          )}
        </div>
        <h4 className="career-minor-head">
          Event Experience (If applicable):
        </h4>
        <p className="work">
          Have you worked in the event industry before? If yes, please provide
          details of your event-related experience.
        </p>
        <div className="mb-3">
          <textarea
            id="event_experience"
            onBlur={formikObj.handleBlur}
            onChange={formikObj.handleChange}
            value={formikObj.values.event_experience}
            type="text"
            className="form-control"
            rows="4"
          ></textarea>
          {formikObj.errors.event_experience &&
          formikObj.touched.event_experience ? (
            <div className="alert text-white">
              {formikObj.errors.event_experience}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-5">
            <input
              type="file"
              name="cv"
              onChange={(event) => {
                formikObj.setFieldValue('cv', event.currentTarget.files[0]);
              }}

              onBlur={formikObj.handleBlur}
              className="form-control form-control-lg"
              placeholder="CV File"
              id="cv"
            />
            {formikObj.errors.cv && formikObj.touched.cv ? (
              <div className="alert text-white">{formikObj.errors.cv}</div>
            ) : (
              ""
            )}
          </div>

        <p className="work">
          By submitting this form, you confirm that the information provided
          is accurate and complete to the best of your knowledge.
        </p>
        <p className="work">
          *Note:* All submitted information will be treated confidentially and
          used solely for the purpose of evaluating your application.
        </p>
        <button type="submit" className="inp contact-btn mb-5">
          {isLoading ? (
            <Hourglass
              visible={true}
              height="30"
              width="30"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClassName=""
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
  )


  }