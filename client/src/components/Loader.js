import React from 'react';
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";


function Loader() {
    let [loading, setLoading] = useState(true);
  
  return (
    <div style={{margin : "auto" ,width : "84vw", marginTop : "80px"}}>
       <div className="sweet-loading m-5 ">

      <PulseLoader
        color="grey"
        loading={loading}
        
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader
