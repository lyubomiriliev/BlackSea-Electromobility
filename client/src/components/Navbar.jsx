import { Link } from "react-router-dom"
import { whiteHome, whiteMap, whiteProfile, whiteStations } from "../assets"

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-secondary shadow-sm fixed bottom-0 left-0 ">
            <div className="w-full h-full flex items-center justify-between">
                <Link to="/">
                    <img className="w-14 ml-5 rounded-md hover:bg-primary hover:scale-110 duration-300" src={whiteHome} alt="" />
                </Link>
                <Link to="/stations">
                    <img className="w-14 rounded-md hover:bg-primary hover:scale-110 duration-300" src={whiteStations} alt="stationsIcon" />
                </Link>
                <Link to="/map">
                    <img className="w-14 rounded-md hover:bg-primary hover:scale-110 duration-300" src={whiteMap} alt="mainLogo" />
                </Link>
                <Link to="/profile">
                    <img className="w-14 mr-5 rounded-md hover:bg-primary hover:scale-110 duration-300" src={whiteProfile} alt="QRcode" />
                </Link>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
