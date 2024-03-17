import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"
import useLogout from "../hooks/useLogout"
import { useTranslation } from 'react-i18next';

import { FaSearch } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import i18n from "../i18n";


const Header = () => {

    const { t } = useTranslation();
    const { handleLogout } = useLogout()


    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex items-center">
                    <button>
                        <FaSearch className="w-20 h-6 text-secondary hover:text-primary hover:scale-125 duration-300 cursor-pointer" />
                    </button>
                    <input type="text" placeholder={t('searchPlaceholder')} />
                </div>
                <div>
                    <Link to="/">
                        <img className="w-56 hover:scale-110" src={logoBlackSea} alt="mainLogo" />
                    </Link>
                </div>
                <TbLogout2 className="w-20 h-6 text-secondary hover:text-primary hover:scale-125 duration-300 cursor-pointer" onClick={handleLogout} />
            </div>
            {/* <img className="w-14" src={qrCode} alt="QRcode" /> */}
            <div className="flex justify-end">
                <button onClick={() => i18n.changeLanguage('en')}>EN</button>
                <button onClick={() => i18n.changeLanguage('bg')}>BG</button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header
