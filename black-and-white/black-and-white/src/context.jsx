import axios from "axios";
import {createContext, useState } from "react";

export const logoContext = createContext();




export function LogoExportProvier ({children}) {

    const [LogoLink, setLogoLink] = useState([]);


   async function LogoEdit() {
  
        try {
          const { data } = await axios.get(
            "https://dashboard.blackandwhiteme.com/api/website_info"
          );
          setLogoLink(data.data);
        } catch (error) {
          console.log("error", error);
        }

    }

    

    return <logoContext.Provider value={{LogoLink,LogoEdit }}>


        {children}

    </logoContext.Provider>
    


}
