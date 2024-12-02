import React, { useState } from "react";
import { UBER_LOGO_URL } from "../Utils/constant";
import CustomButton from "../component/CustomButton";
import InputWithLabel from "../component/InputWithLabel";
import { Link, useNavigate } from "react-router-dom";
import {
  validateCaptainSignUpForm,
} from "../Utils/validate";
import { registerNewUser } from "../Utils/helper";

function CaptainSignup() {
  const navigateHandler = useNavigate();

  const [error, setError] = useState({
    isValid: true,
    message: "",
  });

  const [captainPayload, setCaptainPayload] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    vehicleInfo: {
      number: "",
      type: "",
      capacity: "",
      color: "",
    },
  });

  function onFormSubmitHandler(event) {
    setError({
      isValid: true,
      message: "",
    });
    event.preventDefault();

    // Validate captain payload
    const captainValidationError = validateCaptainSignUpForm(captainPayload);

    if (!captainValidationError?.isValid) {
      return setError(captainValidationError);  // Corrected the validation error assignment
    }

    // Register user after validation
    registerNewUser("captain", captainPayload, setError, navigateHandler);
  }

  return (
    <>
      <div className="p-6 h-screen w-full">
        <div className="flex justify-between items-center pb-8">
          <img src={UBER_LOGO_URL} alt="Logo" className="w-12" />
        </div>

        {/* Display error message if validation fails */}
        {!error?.isValid && (
          <small className="bg-red-200 font-semibold text-red-700 rounded py-1.5 px-4 mb-6 block">
            {error.message}
          </small>
        )}

        <form onSubmit={onFormSubmitHandler}>
          <div className="w-full flex gap-2">
            <div className="w-1/2">
              <InputWithLabel
                label="First Name"
                onChangeHandler={(e) =>
                  setCaptainPayload((prev) => ({
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
                  setCaptainPayload((prev) => ({
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
              setCaptainPayload((prev) => ({
                ...prev,
                emailId: e.target.value,
              }))
            }
          />

          <InputWithLabel
            label="Password"
            onChangeHandler={(e) =>
              setCaptainPayload((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          {/* Vehicle Info Section (for Captain only) */}
          <div className="w-full flex gap-2">
            <div className="w-1/2">
              <InputWithLabel
                label="Vehicle Number"
                onChangeHandler={(e) =>
                  setCaptainPayload((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      number: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="w-1/2">
              <InputWithLabel
                label="Color"
                onChangeHandler={(e) =>
                  setCaptainPayload((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      color: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-2">
            <div className="w-1/2">
              <InputWithLabel
                label="Capacity"
                type="number"
                onChangeHandler={(e) =>
                  setCaptainPayload((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      capacity: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold text-base block mb-2">
                Vehicle Type
              </label>
              <select
                onChange={(e) =>
                  setCaptainPayload((prev) => ({
                    ...prev,
                    vehicleInfo: {
                      ...prev.vehicleInfo,
                      type: e.target.value,
                    },
                  }))
                }
                className="bg-[#F3F3F3] w-full rounded p-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Captain (Auto)</option>
                <option value="bike">Captain (Bike)</option>
                <option value="car">Captain (Car)</option>
              </select>
            </div>
          </div>

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
          Already have an account?
        </Link>

        <p className="text-xs text-zinc-400 fixed left-0 bottom-10 px-6">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </>
  );
}

export default CaptainSignup;
