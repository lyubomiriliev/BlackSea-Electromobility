import { Link } from "react-router-dom"
import { BlackSeaLogo } from "../assets"
import useLogout from "../hooks/useLogout"
import { useTranslation } from 'react-i18next';

import { TbLogout2 } from "react-icons/tb";
import i18n from "../i18n";
import { useEffect, useRef, useState } from "react";

import { GrLanguage } from "react-icons/gr";



const Header = () => {

    const { t } = useTranslation();
    const { handleLogout } = useLogout()
    const languageRef = useRef(null);


    const [showLanguage, setShowLanguage] = useState(false);
    const [changeLanguageText, setChangeLanguageText] = useState("")

    const toggleLanguageMenu = () => setShowLanguage(!showLanguage);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setShowLanguage(false);
    }

    const handleClickOutside = (event) => {

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

    useEffect(() => {
        setChangeLanguageText(i18n.language === 'en' ? "EN" : "BG")
    }, [i18n.language])



    return (
        <div className="w-full h-20 bg-white shadow-md fixed top-0 left-0 z-50 flex justify-between items-center px-4">
            <div className="relative flex items-center">
                <h2 onClick={toggleLanguageMenu} className="ml-5 text-secondary hover:text-primary duration-300 cursor-pointer font-bold ">{changeLanguageText}</h2>
                {showLanguage && (
                    <div className="absolute top-10 -right-20 mt-2 py-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary" onClick={() => changeLanguage('en')}>
                            English
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary " onClick={() => changeLanguage('bg')}>
                            Български
                        </button>
                    </div>
                )}
            </div>
            <Link to="/" className="flex items-center justify-center">
                <img className="w-56" src={BlackSeaLogo} alt="mainLogo" />
            </Link>
            <div className="flex items-center">
                <div className="relative">
                    <TbLogout2 className="w-6 h-6 text-secondary hover:text-primary hover:scale-125 duration-300 cursor-pointer" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default Header
