import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PlayEntry from "../components/PlayEntry";
import PlayList from "../components/PlayList";
import Login from "../components/Login";
import ValueSettings from "../components/ValuesSettings";
import { ProtectedRoute } from './Protected';
import Layout from '../components/Layout';


const Routes = () => {
    const { isAuthenticated } = useAuth();
    const publicRoutes = [
        {
            path: '/',
            element: <PlayEntry />,
        },
        {
            path: '/play-list',
            element: <PlayList />,
        },
        {
            path:  '/login',
            element: <Login />,
        },
        {
            path: "/customize-values",
            element: <ValueSettings />,
        },
    ];
    const privateRoutes = [
        {
            path: '*',
            element: <ProtectedRoute />,
            children: [
// put any routes that should be protected through login and liscense check here
            ],

        }
    ];
    const notAuthRoutes = [
        // eventually login and signup should go here as defaultes for the non auth redirect
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
