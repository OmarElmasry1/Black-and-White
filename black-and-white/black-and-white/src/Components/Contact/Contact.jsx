import React from 'react'
import './Contact.css'
import axios from 'axios'
import  {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import { Hourglass } from 'react-loader-spinner';
import {toast} from 'react-hot-toast';
import Footer from './../Footer/Footer';
import 'animate.css'; 
import WOW from 'wowjs'; 
import 'wowjs/css/libs/animate.css';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import { logoContext } from '../../context';

export default function Contact() {
 

  let user = {

    email: "",
    phone: "",
    subject:"",
    message:""

  }

const [SuccessMsg, setSuccessMsg] = useState(null);
const [ErrorMsg, setErrorMsg] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [ContactTitle, setContactTitle] = useState([]);
const wow = new WOW.WOW();
const {LogoLink} = useContext(logoContext);






async function SendContact(values ,{resetForm}) {

  setIsLoading(true);
try {
  
  const{data} = await axios.post("https://dashboard.blackandwhiteme.com/api/contact",values)

  if(data.status === true) {
    console.log(values);

    setSuccessMsg(data.msg);
    resetForm({value:""});
    setTimeout(()=> {
        setSuccessMsg(null);
    },2000)
  } else if(data.status === false) {
    setErrorMsg(data.msg);
    resetForm({value:""});
    setTimeout(()=> {
        setErrorMsg(null);
    },2000)
  }

} catch (error) {

  console.log("error", error);
}

setIsLoading(false);

}




const formikObj = useFormik({

  initialValues:  user,

  onSubmit: SendContact ,

validate : function (values) {



  const errors = {};

  if ( (values.email.includes('@') && values.email.includes('.')  ) === false ) {
    errors.email = 'Email must be include @ and .'
  }

  if ( ! values.phone.match(/^(02)?01[0125][0-9]{8}$/ )) {
    errors.phone = 'Contact Number is Invalid'
  }

 if(values.message === "") {
  errors.message = 'Message Is Empty'
 }


  return errors
}
 });



 async function GetContactTitle() {

  try {
    const{data} = await axios.get("https://dashboard.blackandwhiteme.com/api/contactPage")

    setContactTitle(data.data);
  } catch (error) {
    console.log("error", error);
  }
}



const scrollToTop = () => {

  window.scrollTo(0, 0);
};



 useEffect(() => {
  scrollToTop();
  wow.init();
  GetContactTitle();

}, []);




  
  return <>


<Helmet>

<title>Black & White</title>
<meta name="description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential."/>
<meta name="keywords" content="Marketing, Consulting"/>
<meta property="og:title" content="Black & White|Contact"/>
<meta property="og:description" content="Marketing & Consulting Agency - We are passionate about the art of brand building. Let us help you amplify your impact and unlock your brand's full potential"/>
<meta property="og:image" content={LogoLink.logo}/>
<meta property="og:url" content="https://blackandwhiteme.com"/>

</Helmet>


  
   <div className="container contact-page" >
  <div className="row">

 

 

  

<form onSubmit={formikObj.handleSubmit} className='contact-form wow animate__animated  animate__fadeIn' data-wow-duration="1.5s" data-wow-delay="0.5s">
<h1 className="contact-head" style={{fontSize: `${ContactTitle.title_size}px`}}>{ContactTitle.title}</h1>
  
  <div className="mb-3 ">
 <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type='email' id='email' className="form-control" aria-describedby="emailHelp" placeholder='Email' />
    {formikObj.errors.email && formikObj.touched.email ? <div className='alert text-white'>{formikObj.errors.email}</div> : ''}
  </div>


  <div className="mb-3 "> 
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type='tel' id='phone' className="form-control"  placeholder='Contact Number' />
    {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert text-white'>{formikObj.errors.phone}</div> : ''}

  </div>

  
  <div className="mb-3 ">
    
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.subject} type='text' id='subject' className="form-control"  placeholder='Subject' />
    {formikObj.errors.subject && formikObj.touched.subject ? <div className='alert text-white'>{formikObj.errors.subject}</div> : ''}
    
  </div>


  <div className="mb-3 ">
  <textarea id='message'  onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.message} type='text' className="form-control"  rows="4" placeholder='Message' ></textarea>
    {formikObj.errors.message && formikObj.touched.message ? <div className='alert text-white'>{formikObj.errors.message}</div> : ''}
</div>

{ContactTitle && Object.keys(ContactTitle).length > 0  && <button type="submit"  disabled={!formikObj.isValid || !formikObj.dirty} className=" contact-btn">
    
    
    {isLoading? (<Hourglass
  visible={true}
  height="30"
  width="30"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['black', 'black']}
  />) : "Submit"}
    
    
    
    
    </button> }
  

    {SuccessMsg ?  toast.success(SuccessMsg) : ""} ;
    {ErrorMsg ?  toast.error(ErrorMsg) : ""} ;

</form>

</div>
</div> 
 
 {ContactTitle && Object.keys(ContactTitle).length > 0  && <Footer />}
  </>
}

