import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Create from "./pages/Create";
import Update from "./pages/Update";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
const UnAuthRoute = ({ Component }) => {
  const isAuthenticated = localStorage.getItem("token");

  return !isAuthenticated ? <Component /> : <Navigate to="/" />;
};
const routes = [
  { path: "/", element: <AuthRoute Component={Home} /> },
  { path: "/login", element: <UnAuthRoute Component={Login} /> },
  { path: "/register", element: <UnAuthRoute Component={Register} /> },
  { path: "/create", element: <AuthRoute Component={Create} /> },
  { path: "/update/:id", element: <AuthRoute Component={Update} /> },
];

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <div>Sayfa bulunamadı</div>,
      children: routes,
    },
  ]);
  return <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>;
}

export default App;
