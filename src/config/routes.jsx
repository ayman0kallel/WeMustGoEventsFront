import { Suspense, lazy } from "react";
import { useRoutes } from "react-router";
import App from "../App";
import { EventPage, Signin, Favourite, AdminPage } from "../containers";
import AddArticleForm from "../containers/addArticleForm/AddArticleForm";

const Signup = lazy(() => import("../containers/signup/Signup"))

const AppRoutes = () =>{
    const element = useRoutes([
        {
            path: "/",
            element: <App/>
        },
        {
            path: "/homepage",
            element: <App/>
        },
        {
            path: "/signup",
            element: <Signup/>
        },
        {
            path: "/signin",
            element: <Signin/>
        },
        {
            path: "/article/:eventId",
            element: <EventPage/>
        },
        {
            path: "/favourite",
            element: <Favourite/>
        },
        {
            path: "/admin",
            element: <AdminPage/>
        },
        {
            path: "/createEvent",
            element: <AddArticleForm/>
        },
    ]);
    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default AppRoutes;