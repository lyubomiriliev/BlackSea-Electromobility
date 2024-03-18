import { Link } from "react-router-dom"
import { logoBlackSea, qrCode, searchIcon } from "../assets"
import useLogout from "../hooks/useLogout"
import { useTranslation } from 'react-i18next';

import { FaSearch } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import i18n from "../i18n";
import { useEffect, useRef, useState } from "react";

import { GrLanguage } from "react-icons/gr";


const Header = () => {

    const { t } = useTranslation();
    const { handleLogout } = useLogout()
    const languageRef = useRef(null);
    const searchRef = useRef(null);


    const [showSearch, setShowSearch] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);

    const toggleSearch = () => setShowSearch(!showSearch);
    const toggleLanguageMenu = () => setShowLanguage(!showLanguage);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setShowLanguage(false);
    }

    const handleClickOutside = (event) => {
        if (
            (searchRef.current && !searchRef.current.contains(event.target)) &&
            (!event.target.classList.contains('search-input'))
        ) {
            setShowSearch(false);
        }
        if (languageRef.current && !languageRef.current.contains(event.target)) {
            setShowLanguage(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])


    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="w-full h-full flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={toggleSearch} ref={searchRef}>
                        <FaSearch className="w-20 h-6 scale-75 text-secondary hover:text-primary hover:scale-110 duration-300 cursor-pointer" />
                    </button>
                    {showSearch && (
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="search-input border-b-[2px] bg-gray-100 px-2 py-2 ml-2 focus:outline-none focus:border-primary"
                        />
                    )}
                </div>
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-56" src={logoBlackSea} alt="mainLogo" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="relative" ref={languageRef}>
                        <GrLanguage className=" text-secondary rounded-md scale-120 hover:text-secondary hover:scale-150 duration-300" onClick={toggleLanguageMenu} />
                        {showLanguage && (
                            <div className="absolute top-10 right-0 mt-2 py-2 w-32 bg-white border rounded shadow-lg z-10">
                                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => changeLanguage('en')}>
                                    English
                                </button>
                                <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => changeLanguage('bg')}>
                                    Български
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <TbLogout2 className="w-20 h-6 text-secondary hover:text-primary hover:scale-125 duration-300 cursor-pointer" onClick={handleLogout} />
                    </div>
                </div>

            </div>
            {/* <img className="w-14" src={qrCode} alt="QRcode" /> */}
            <div>
            </div>
        </div>
    )
}

export default Header
