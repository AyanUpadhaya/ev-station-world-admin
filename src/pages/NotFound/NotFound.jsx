import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (

      <div className={`w-full h-screen flex flex-col justify-center items-center bg-primary`}>
        <div className="text-center space-y-3">
        <p className="text-8xl font-extrabold font-sans text-white">404</p> 
        <p className="text-5xl font-semibold font-sans text-white ">This page does not exist</p>
        <button className="bg-red-600 text-white text-2xl text-center px-8 py-4 cursor-pointer rounded-xl" onClick={()=>navigate('/')}>Go Home</button>
        </div>
      </div>

  );
};

export default NotFound;
