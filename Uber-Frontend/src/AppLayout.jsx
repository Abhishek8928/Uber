import { RouterProvider } from "react-router-dom";
import appRoute from "./router/appRoute.jsX";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/slice/user.slice";
import { useEffect } from "react";
import axiosInstances from "./config/axiosInstances";
function AppLayout() {
  const token = localStorage.getItem("token");

  const dispatchHandler = useDispatch();

  async function getProfileInfo() {
    try {
      const res = await axiosInstances.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {data} = res?.data;

      dispatchHandler(addUser(data));

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (token) {
      getProfileInfo();
    }
  }, [token]);

  return <RouterProvider router={appRoute} />;
}

export default AppLayout;
