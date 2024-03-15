import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"
import useLogout from "../hooks/useLogout"

import { FaSearch } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";


const Header = () => {

    const { handleLogout } = useLogout()

    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex items-center">
                    <button>
                        <FaSearch className="w-20 h-6 text-primary hover:text-secondary hover:scale-125 duration-300 cursor-pointer" />
                    </button>
                    {/* <input type="text" placeholder="Търсене на станции" /> */}
                </div>
                <div>
                    <Link to="/">
                        <img className="w-32 hover:scale-110" src={logoBlackSea} alt="mainLogo" />
                    </Link>
                </div>
                <TbLogout2 className="w-20 h-6 text-primary hover:text-secondary hover:scale-125 duration-300 cursor-pointer" onClick={handleLogout} />
            </div>
            {/* <img className="w-14" src={qrCode} alt="QRcode" /> */}
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
