import { homeIcon, mapIcon, profileIcon, stationsIcon } from "../assets"

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400">
            <div className="w-full h-full flex items-center justify-between">
                <img className="w-14" src={homeIcon} alt="" />
                <img className="w-14" src={stationsIcon} alt="searchIcon" />
                <img className="w-14" src={mapIcon} alt="mainLogo" />
                <img className="w-14" src={profileIcon} alt="QRcode" />
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
