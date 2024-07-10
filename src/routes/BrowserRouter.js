import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PlayEntry from "../components/PlayEntry";
import PlayList from "../components/PlayList";
import Login from "../components/Login";
import ValueSettings from "../components/ValuesSettings";
import { ProtectedRoute } from './Protected';
import Layout from '../components/Layout';
import Test from '../components/test';


const Routes = () => {
    const { isAuthenticated } = useAuth();
    const publicRoutes = [
        {
            path: "/",
            element: <Login />,
        },
        {


                    path: 'play-entry/',
                    element: <PlayEntry />,
        },
        {
            path: 'dev/',
            children: [
                {
                    path: 'test/',
                    element: <Test />,
                }
            ],
        }
    ];
    const privateRoutes = [
        {
            path: '*',
            element: <ProtectedRoute />,
            children: [

                {
                    path: 'play-list/',
                    element: <PlayList />,
                },
                {
                    path: "customize-values/",
                    element: <ValueSettings />,
                },
            ],

        }
    ];
    const notAuthRoutes = [
        {
            path:  '/',
            element: <Login />,
        },
    ];
    const router = createBrowserRouter([
        {
            Component: Layout,
            path: '/',
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
