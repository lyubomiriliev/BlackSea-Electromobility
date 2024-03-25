import { Link, useLocation } from "react-router-dom"
import { whiteHome, whiteHome1, whiteMap, whiteMap1, whiteProfile, whiteProfile1, whiteStations, whiteStations1 } from "../assets"

const Navbar = () => {

    const location = useLocation();

    return (
        <div className="w-full h-16 bg-secondary shadow-sm fixed bottom-0 left-0 ">
            <div className="w-full h-full flex items-center justify-between px-5">
                <Link to="/">
                    <img className={`w-10 ml-5 rounded-md duration-300 ${location.pathname === '/' ? 'hover: scale-125' : ''}`} src={location.pathname === "/" ? whiteHome1 : whiteHome} alt="Home" />
                </Link>
                <Link to="/stations">
                    <img className={`w-10 rounded-md duration-300 ${location.pathname === '/stations' ? 'hover: scale-125' : ''}`} src={location.pathname === "/stations" ? whiteStations1 : whiteStations} alt="stationsIcon" />
                </Link>
                <Link to="/map">
                    <img className={`w-10 rounded-md duration-300 ${location.pathname === '/map' ? 'hover: scale-125' : ''}`} src={location.pathname === "/map" ? whiteMap1 : whiteMap} alt="mainLogo" />
                </Link>
                <Link to="/profile">
                    <img className={`w-10 mr-5 rounded-md duration-300 ${location.pathname === '/profile' ? 'hover: scale-125' : ''}`} src={location.pathname === "/profile" ? whiteProfile1 : whiteProfile} alt="QRcode" />
                </Link>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar
