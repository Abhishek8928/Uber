import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import AppLayout from "../AppLayout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";





const APP_ROUTING_CONFIG = [
    {
        path:'/',
        element:<AppLayout />,
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
        path:'/Signup',
        element:<Signup/>
    }
]

const appRouter = createBrowserRouter(APP_ROUTING_CONFIG);


export default appRouter;


