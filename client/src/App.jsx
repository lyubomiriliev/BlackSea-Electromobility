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
        element: <Home />
      },
      {
        path: "/stations",
        element: <Stations />
      },
      {
        path: "/map",
        element: <Map />
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ]

  },
  {
    path: "/login",
    element: <Login />
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
