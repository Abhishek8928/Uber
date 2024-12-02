import axiosInstances from "../config/axiosInstances";
import { LOGIN_END_POINT, REGISTER_END_POINT } from "./constant";

export async function registerNewUser(
  selectedRole,
  payload,
  errHandler,
  navigateHandler
) {
  const END_POINT_URL = REGISTER_END_POINT + selectedRole;
  axiosInstances
    .post(END_POINT_URL, payload)
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigateHandler("/home");
      }
    })
    .catch((error) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.request?.statusText ||
        error?.message;
      errHandler({
        isValid: false,
        message: errMsg,
      });
    });
}

export async function loginUserOrCaptain(
  selectedRole,
  payload,
  errHandler, navigateHandler 
) {
  const END_POINT_URL = LOGIN_END_POINT + selectedRole;
  axiosInstances
    .post(END_POINT_URL, payload)
    .then((response) => {
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigateHandler("/home");
      }
    })
    .catch((error) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.request?.statusText ||
        error?.message;
      errHandler({
        isValid: false,
        message: errMsg,
      });
    });
}
