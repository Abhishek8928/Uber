import React, { useEffect, useRef, useState } from "react";
import { UBER_LOGO_URL } from "../Utils/constant";
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'

function Home() {

  const [userRideLocation, setUserRideLocation] = useState({
    pickup:"",
    destination:""
  })

  const [openSearchPanel , setOpenSearchPanel] = useState(false);
  const suggestionPanel = useRef();

  function onSubmitHandler(event){
    event.preventDefault();
  }


  useGSAP(function(){

    if(openSearchPanel){
      gsap.to(suggestionPanel?.current,{
        height:"70%"
      })
    }else{
      gsap.to(suggestionPanel?.current,{
        height:"0%"
      })
    }
    
  },[openSearchPanel])



  return (
    <>
      <div className="wrapper w-full h-screen relative">
        <div className="absolute top-5 left-5">
          <img className="w-14" src={UBER_LOGO_URL} alt="" />
        </div>

        <div className="w-full h-screen ">
          <img
            className="h-screen object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />

          <div className="absolute flex flex-col justify-end bottom-0 h-full">
            <div className="w-full h-[30%] relative p-5 bg-white ">
              <div className="flex justify-between items-center">

              <h4 className="font-bold text-lg">Find A trip</h4>

              {openSearchPanel && <i onClick={() => setOpenSearchPanel(false)} className="ri-arrow-down-wide-line"></i>}
              </div>

             <div className="absolute left-8  top-[45%] flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-black"></div>
             <div className="line h-12 w-[1.8px]  bg-gray-900"></div>
             <div className="w-2 h-2 rounded-full bg-black"></div>
             </div>

              <form onSubmit={onSubmitHandler}>
                <input
                  type="text"
                  onChange={(e)=>{
                    setUserRideLocation(prev => ({...prev , pickup:e.target.value}))
                  }}

                  onClick={()=> setOpenSearchPanel(true)}
                  placeholder="Add a pick-up location"
                  className=" bg-[#F3F3F3] mt-4 placeholder:text-base placeholder:text-[#5E5E5E] focus:outline-none   py-3 text-sm px-8  w-full  rounded-lg "
                />
                <input
                  type="text"
                  onChange={(e)=>{
                    setUserRideLocation(prev => ({...prev , destination:e.target.value}))
                  }}
                  placeholder="Enter your destination"
                  className=" bg-[#F3F3F3] mt-4 placeholder:text-base placeholder:text-[#5E5E5E] focus:outline-none   py-3 text-sm px-8  w-full  rounded-lg "
                />
              </form>
            </div>

            <div ref={suggestionPanel} className="w-full  bg-red-700 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
