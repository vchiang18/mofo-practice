import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PlayEntry from "../components/PlayEntry";
import PlayList from "../components/PlayList";
import Login from "../components/Login";
import { ProtectedRoute } from "./Protected";
import Layout from "../components/Layout";
import Settings from "../components/Settings";
import AmplifyLogin from "../components/AmplifyLogin";
// import Logout from "../components/AmplifyLogout";
// import Signup from "../components/Signup";

const Routes = () => {
  const { isAuthenticated } = useAuth();
  const publicRoutes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "play-entry/",
      element: <PlayEntry />,
    },
    {
      path: "dev/",
      children: [
        // {
        //   path: "signup/",
        //   element: <Signup />,
        // },
        {
          path: "login/",
          element: <AmplifyLogin />,
        },
        // {
        //   path: "logout/",
        //   element: <Logout />,
        // },
      ],
    },
  ];
  const privateRoutes = [
    {
      path: "*",
      element: <ProtectedRoute />,
      children: [
        {
          path: "play-entry/",
          element: <PlayEntry />,
        },
        {
          path: "play-list/",
          element: <PlayList />,
        },
        {
          path: "settings/",
          element: <Settings />,
        },
      ],
    },
  ];
  const notAuthRoutes = [
    {
      path: "/",
      element: <Login />,
    },
  ];
  const router = createBrowserRouter([
    {
      Component: Layout,
      path: "/",
      children: [
        ...publicRoutes,
        ...(!isAuthenticated ? notAuthRoutes : []),
        ...privateRoutes,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
