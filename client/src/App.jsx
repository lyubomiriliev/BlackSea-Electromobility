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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStationStore } from "./store/useStationStore";
import { useEffect } from "react";
import { fetchDataByala1, fetchDataByala2, fetchDataPrimorsko1, fetchDataPrimorsko2 } from "./utils/api";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Navbar />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
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

  const { setStationData } = useStationStore();

  const MINUTE_MS = 60000;

  useEffect(() => {
    const fetchDataForStations = async () => {
      try {
        const dataByala1 = await fetchDataByala1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3736');
        const dataByala2 = await fetchDataByala2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '2946');
        const dataPrimorsko1 = await fetchDataPrimorsko1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3805');
        const dataPrimorsko2 = await fetchDataPrimorsko2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '4380');

        setStationData({
          stationByala1: dataByala1,
          stationByala2: dataByala2,
          stationPrimorsko1: dataPrimorsko1,
          stationPrimorsko2: dataPrimorsko2,
        });
        console.log("ffs")
      } catch (error) {
        console.error("Error fetching data for stations:", error);
      }
    };

    const interval = setInterval(fetchDataForStations, MINUTE_MS);

    return () => clearInterval(interval);
  }, [setStationData]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
