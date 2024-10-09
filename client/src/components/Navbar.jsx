import { Link, useLocation } from "react-router-dom"
import { whiteHome, whiteHome1, whiteMap, whiteMap1, whiteProfile, whiteProfile1, whiteStations, whiteStations1 } from "../assets"

const Navbar = () => {

    const location = useLocation();

    return (
        <div className="w-full h-24 bg-secondary border-t-[1px] border-gray-300 shadow-sm fixed bottom-0 left-0">
            <div className="w-full h-full flex items-center justify-between px-6">
                    <Link to="/" className="flex flex-col items-center mb-2">
                        <img className={`w-6 justify-center align-middle mb-1 rounded-md duration-300 ${location.pathname === '/' ? 'hover: scale-125' : ''}`} src={location.pathname === "/" ? whiteHome1 : whiteHome} alt="Home" />
                        <p className="text-white text-xs font-body">Home</p>
                    </Link>
                    <Link to="/stations" className="flex flex-col items-center mb-2">
                        <img className={`w-6 justify-center align-middle mb-1 rounded-md duration-300 ${location.pathname === '/stations' ? 'hover: scale-125' : ''}`} src={location.pathname === "/stations" ? whiteStations1 : whiteStations} alt="stationsIcon" />
                        <p className="text-white text-xs font-body">Stations</p>
                    </Link>
                    <Link to="/map" className="flex flex-col items-center mb-2" >
                        <img className={`w-6 justify-center align-middle mb-1 rounded-md duration-300 ${location.pathname === '/map' ? 'hover: scale-125' : ''}`} src={location.pathname === "/map" ? whiteMap1 : whiteMap} alt="mainLogo" />
                        <p className="text-white text-xs ml-1 font-body">Map</p>

                    </Link>
                    <Link to="/profile" className="flex flex-col items-center mb-2" >
                        <img className={`w-6 justify-center align-middle mb-1 rounded-md duration-300 ${location.pathname === '/profile' ? 'hover: scale-125' : ''}`} src={location.pathname === "/profile" ? whiteProfile1 : whiteProfile} alt="QRcode" />
                        <p className="text-white text-xs mr-1 font-body">Profile</p>
                    </Link>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Navbar
