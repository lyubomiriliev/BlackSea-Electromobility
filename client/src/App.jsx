import Header from "./components/Header";
import Home from "./pages/Home";


import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Stations from "./pages/Stations";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import AuthGuard from "./components/guards/AuthGuard";
import ForgotPassword from "./components/ForgotPassword";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Navbar />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthGuard><Home /></AuthGuard>
      },
      {
        path: "/stations",
        element: <AuthGuard><Stations /></AuthGuard>
      },
      {
        path: "/map",
        element: <AuthGuard><Map /></AuthGuard>
      },
      {
        path: "/profile",
        element: <AuthGuard><Profile /></AuthGuard>
      },
    ]

  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/register",
    element: <Register />
  }
])
function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
