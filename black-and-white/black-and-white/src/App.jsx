import './App.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import MainPage from './Components/MainPage/MainPage';
import Services from './Components/Services/Services';
import Consulting from './Components/Consulting/Consulting';
import Contact from './Components/Contact/Contact';
import Career from './Components/Career/Career';
import About from './Components/About/About';
import { Toaster } from 'react-hot-toast';
import Blogs from './Components/Blogs/Blogs';
import BlogsDetails from './Components/BlogsDetails/BlogsDetails';
import Privacy from './Components/Privacy/Privacy';
import { LogoExportProvier } from './context';







function App() {
  



  const router  =createBrowserRouter([
  
    {path:'', element:<Layout />, children: [

      
      {index:true , element: <MainPage />},
      {path:'/home', element:<MainPage />},
      {path:'/service', element:<Services />},
      {path:'/consulting', element:<Consulting />},
      {path:'/contact', element:<Contact />},
      {path:'/career', element:<Career />},
      {path:'/about', element:<About />},
      {path:'/blogs', element:<Blogs />},
      {path:'/blogsDetails/:id', element:<BlogsDetails />},
      {path:'/privacy', element:<Privacy />}
    
      


  ]},

  ])
  
  
  return <>
      
      <LogoExportProvier>

<RouterProvider  router = {router}   />

</LogoExportProvier>


  <Toaster
  position="top-right"
  reverseOrder={false}
/>
  </>
}

export default App;
