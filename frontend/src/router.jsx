import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
// import Login from './pages/Login';
import Layout from "./app/layout/Layout";
import NotFound from './pages/NotFound';

export const router = createBrowserRouter ([
    {
        element: <Layout />,
        children: [
            { path: "/", element: <Home />},
            // { path: "/login", element: <Login />},
            { path: "/*", element: <NotFound />}
        ],
    },
])