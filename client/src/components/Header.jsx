import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"

const Header = () => {
    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex items-center">
                    <button>
                        <img className="w-14" src={searchIcon} alt="searchIcon" />
                    </button>
                    <input type="text" placeholder="Търсене на станции" />
                </div>
                <div>
                    <Link to="/">
                        <img className="w-52" src={logoBlackSea} alt="mainLogo" />
                    </Link>
                </div>
                <img className="w-14" src={qrCode} alt="QRcode" />
            </div>
            <div className="flex justify-end">
                <button>BG</button>
                <button>EN</button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header
