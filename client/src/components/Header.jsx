import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"
import useLogout from "../hooks/useLogout"
import { useTranslation } from 'react-i18next';

import { FaSearch } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import i18n from "../i18n";
import { useState } from "react";


const Header = () => {

    const { t } = useTranslation();
    const { handleLogout } = useLogout()

    const [showSearch, setShowSearch] = useState(false);


    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={() => setShowSearch(!showSearch)}>
                        <FaSearch className="w-20 h-6 text-secondary hover:text-primary hover:scale-125 duration-300 cursor-pointer" />
                    </button>
                    {showSearch && (
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="border-b-[2px] bg-gray-100 px-2 py-2 ml-2 focus:outline-none focus:border-primary"
                        />
                    )}

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
