import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"

const Header = () => {
    return (
        <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-400">
            <div className="w-full h-full flex items-center justify-between">
                <img className="w-14" src={searchIcon} alt="searchIcon" />
                <div>
                    <Link to="/">
                        <img className="w-52" src={logoBlackSea} alt="mainLogo" />
                    </Link>
                </div>
                <img className="w-14" src={qrCode} alt="QRcode" />
            </div>
            <div className="w-full h-full flex items-center justify-end">
                <button>BG</button>
                <button>EN</button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header
