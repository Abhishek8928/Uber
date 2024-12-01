import React, { useState } from "react";
import { LOGO_URL } from "../Utils/constant";
import CustomButton from "../component/CustomButton";
import InputWithLabel from "../component/InputWithLabel";
import { Link } from "react-router-dom";

function Signup() {
  const [role, setRole] = useState("user");

  function handleRoleChange(event) {
    setRole(event.target.value);
  }
  return (
    <>
      <div className=" p-6 h-screen w-full">
      <div className="flex justify-between items-center pb-8 ">
          <img src={LOGO_URL} alt="" className="w-12 " />
          <select
            value={role}
            onChange={handleRoleChange}
            className="bg-[#F3F3F3]  w-1/2 rounded p-1"
          >
            <option value="user">User</option>
            <option value="captain">Captain</option>
          </select>
        </div>
        <form action="">

          <div className="w-full flex gap-2">
            <div className="w-1/2">
              <InputWithLabel label="First Name " />
            </div>
            <div className="w-1/2">
              <InputWithLabel label="Last Name" />
            </div>
          </div>

          <InputWithLabel label="Email Address" />

          <InputWithLabel label="Password" />

          <CustomButton
            backgroundColor="black"
            textColor="white"
            buttonText="Create account"
          />
        </form>

        <Link
          className="text-sm py-4 font-semibold underline cursor-pointer block"
          to="/login"
        >
          Already have an account ?{" "}
        </Link>

        <p className="text-xs text-zinc-400 fixed left-0 bottom-10 px-6  text-wrap">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </>
  );
}

export default Signup;
