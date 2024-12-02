import React, { useState } from "react";
import { UBER_LOGO_URL } from "../Utils/constant";
import CustomButton from "../component/CustomButton";
import InputWithLabel from "../component/InputWithLabel";
import { Link, useNavigate } from "react-router-dom";
import { validateSignUpForm } from "../Utils/validate";
import { registerNewUser } from "../Utils/helper";

function UserSignup() {
  const navigateHandler = useNavigate();

  const [error, setError] = useState({
    isValid: true,
    message: "",
  });

  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  function onFormSubmitHandler(event) {
    setError({
      isValid: true,
      message: "",
    });
    event.preventDefault();

    console.log(payload);

    const validationError = validateSignUpForm(payload);

    if (!validationError?.isValid) {
      return setError(validationError);
    }

    // Outsourced function to make an API request and register a new user
    registerNewUser("user", payload, setError, navigateHandler);
  }

  return (
    <>
      <div className=" p-6 h-screen w-full">
        <div className="flex justify-between items-center pb-8 ">
          <img src={UBER_LOGO_URL} alt="" className="w-12 " />
        </div>

        {!error?.isValid && (
          <small className="bg-red-200 font-semibold text-red-700 rounded py-1.5 px-4 mb-6 block">
            {error.message}
          </small>
        )}
        <form onSubmit={onFormSubmitHandler}>
          <div className="w-full flex gap-2">
            <div className="w-1/2">
              <InputWithLabel
                label="First Name "
                onChangeHandler={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-1/2">
              <InputWithLabel
                label="Last Name"
                onChangeHandler={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <InputWithLabel
            label="Email Address"
            onChangeHandler={(e) =>
              setPayload((prev) => ({ ...prev, emailId: e.target.value }))
            }
          />

          <InputWithLabel
            label="Password"
            onChangeHandler={(e) =>
              setPayload((prev) => ({ ...prev, password: e.target.value }))
            }
          />

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

export default UserSignup;
