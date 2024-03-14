import { Link } from "react-router-dom"
import { homeIcon, mapIcon, profileIcon, stationsIcon } from "../assets"

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400">
            <div className="w-full h-full flex items-center justify-between">
                <Link to="/">
                    <img className="w-14" src={homeIcon} alt="" />
                </Link>
                <Link to="/stations">
                    <img className="w-14" src={stationsIcon} alt="stationsIcon" />
                </Link>
                <Link to="/map">
                    <img className="w-14" src={mapIcon} alt="mainLogo" />
                </Link>
                <Link to="/profile">
                    <img className="w-14" src={profileIcon} alt="QRcode" />
                </Link>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
