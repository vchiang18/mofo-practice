import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PlayEntry from "../components/PlayEntry";
import PlayList from "../components/PlayList";
import Login from "../components/Login";
import ValueSettings from "../components/ValuesSettings";
import { ProtectedRoute } from "./Protected";
import Layout from "../components/Layout";
import Counter from "../components/Counter";
import BodyPosition from "../components/BodyPosition";
import FieldPosition from "../components/FieldPosition";
import QBGrid from "../components/QBGrid";

const Routes = () => {
  const { isAuthenticated } = useAuth();
  const publicRoutes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "dev/",
      children: [
        {
          path: "counter",
          element: <Counter />,
        },
        {
          path: "bodyposition",
          element: <BodyPosition />,
        },
        {
          path: "fieldposition",
          element: <FieldPosition />,
        },
        {
          path: "qb",
          element: <QBGrid />,
        },
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
          path: "customize-values/",
          element: <ValueSettings />,
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
