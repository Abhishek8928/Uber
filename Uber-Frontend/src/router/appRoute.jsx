import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Index from "../Pages/Index";
import CaptainSignup from "../Pages/CaptainSignup";
import UserSignup from "../Pages/UserSignup";





const APP_ROUTING_CONFIG = [
    {
        path:'/',
        element:<Index />,
    },
    {
        path:'/home',
        element:<Home />,
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/user/register',
        element:<UserSignup/>
    }
    ,{
        path:'/captain/register',
        element:<CaptainSignup />
    }
]

const appRouter = createBrowserRouter(APP_ROUTING_CONFIG);


export default appRouter;


