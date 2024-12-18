import React, { useState } from "react";
import { UBER_LOGO_URL } from "../Utils/constant";
import CustomButton from "../component/CustomButton";
import InputWithLabel from "../component/InputWithLabel";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../Utils/validate";
import { loginUserOrCaptain } from "../Utils/helper";

function Login() {
  const navigateHandler = useNavigate();

  const [selectedRole, setSelectedRole] = useState("user");
  const [payload, setPayload] = useState({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState({
    isValid: true,
    message: "",
  });

  function onFormSubmitHandler(event) {
    setError({
      isValid: true,
      message: "",
    });

    event.preventDefault();

    const validationError = validateLoginForm(payload);

    if (!validationError?.isValid) {
      return setError(validationError);
    }

    loginUserOrCaptain(selectedRole, payload, setError, navigateHandler);
  }

  return (
    <>
      <div className=" p-6 h-screen w-full">
        <div className="flex justify-between items-center pb-8 ">
          <img src={UBER_LOGO_URL} alt="" className="w-12 " />
          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
            className="bg-[#F3F3F3]  w-1/2 rounded p-1.5 text-sm "
          >
            <option value="user">User</option>
            <option value="captain">Captain</option>
          </select>
        </div>

        {!error?.isValid && (
          <small className="bg-red-200 font-semibold text-red-700 rounded py-1.5 px-4 mb-6 block">
            {error.message}
          </small>
        )}

        <form onSubmit={onFormSubmitHandler}>
          <InputWithLabel
            label="What's your email address? "
            placeholder="example@gmail.com"
            onChangeHandler={(e) =>
              setPayload((prev) => ({ ...prev, emailId: e.target.value }))
            }
          />
          <InputWithLabel
            label="Password"
            placeholder="Enter your password"
            onChangeHandler={(e) =>
              setPayload((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <CustomButton
            backgroundColor="black"
            textColor="white"
            buttonText="Login"
          />
        </form>
        <Link
          className="text-sm py-4 font-semibold cursor-pointer block underline"
          to="/signup"
        >
          Do not have an account ?{" "}
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

export default Login;
