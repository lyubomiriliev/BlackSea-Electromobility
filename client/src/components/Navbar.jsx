import { Link, useLocation } from "react-router-dom"
import { whiteHome, whiteHome1, whiteMap, whiteMap1, whiteProfile, whiteProfile1, whiteStations, whiteStations1 } from "../assets"

const Navbar = () => {

    const location = useLocation();

    return (
        <div className="w-full h-24 bg-secondary shadow-sm fixed bottom-0 left-0">
            <div className="w-full h-full flex items-center justify-between px-5">
                <div className="flex flex-col items-center">
                    <Link to="/">
                        <img className={`w-8 justify-center align-middle mb-1  rounded-md duration-300 ${location.pathname === '/' ? 'hover: scale-125' : ''}`} src={location.pathname === "/" ? whiteHome1 : whiteHome} alt="Home" />
                        <p className="text-white text-xs font-body">Home</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link to="/stations">
                        <img className={`w-8 justify-center align-middle mb-1 ml-2  rounded-md duration-300 ${location.pathname === '/stations' ? 'hover: scale-125' : ''}`} src={location.pathname === "/stations" ? whiteStations1 : whiteStations} alt="stationsIcon" />
                        <p className="text-white text-xs font-body">Stations</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link to="/map">
                        <img className={`w-8 justify-center align-middle mb-1  rounded-md duration-300 ${location.pathname === '/map' ? 'hover: scale-125' : ''}`} src={location.pathname === "/map" ? whiteMap1 : whiteMap} alt="mainLogo" />
                        <p className="text-white text-xs ml-1 font-body">Map</p>

                    </Link>
                </div>
                <div className="flex flex-col items-center">
                    <Link to="/profile">
                        <img className={`w-8 justify-center align-middle mb-1 rounded-md duration-300 ${location.pathname === '/profile' ? 'hover: scale-125' : ''}`} src={location.pathname === "/profile" ? whiteProfile1 : whiteProfile} alt="QRcode" />
                        <p className="text-white text-xs mr-1 font-body">Profile</p>
                    </Link>
                </div>


            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar
