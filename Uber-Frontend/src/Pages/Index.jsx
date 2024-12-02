

import React from 'react'
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className=" w-full h-screen ">
      <img
        className="w-full h-screen  object-cover"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/c5310f182519763.652f3606b64b0.jpg"
        alt=""
      />

      <div className="bg-white p-8  w-full fixed bottom-0 ">
        <h2 className="font-semibold text-2xl">Getting Started With Uber</h2>

        <Link to="/home" className="w-full bg-black text-center  text-white font-semibold block rounded py-2 mt-8">
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Index;