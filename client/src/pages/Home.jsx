import { useState } from "react";
import { BlackSeaLogo, Cost, HeroSectionCar, Map, Type, abchoPNG, byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, norwayLogo, okolnaSreda, popUp, popUp2, primorsko, smartNorwayLogo } from "../assets"
import { useTranslation } from 'react-i18next';

import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";



const Home = () => {

    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const navigate = useNavigate();

    const modalRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowModal(false);
                setShowMobileModal(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [])

    const navigateToStations = () => {
        navigate('/stations')
    }

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const isLoggedIn = localStorage.getItem("user-info");

        if (isMobile) {
            const mobileModalShown = localStorage.getItem('mobileModalShown');
            if (!mobileModalShown) {
                setShowMobileModal(true);
                localStorage.setItem('mobileModalShown', true)
            }
        } else {
            if (isLoggedIn) {
                const modalShown = localStorage.getItem('modalShown');
                if (!modalShown) {
                    setShowModal(true);
                    localStorage.setItem('modalShown', true);
                }
            }
        }
        const isStandalone = window.matchMedia('(display-mode: standalone').matches;

        if (!isStandalone && isMobile) {
            const mobileModalShown = localStorage.getItem("mobileModalShown");
            if (!mobileModalShown) {
                setShowMobileModal(true);
                localStorage.setItem('mobileModalShown', true);
            }
        } else {
            if (isStandalone) {
                setShowMobileModal(false)
            }
        }

    }, [])


    return (
        <div className="w-full mx-auto my-10 py-20 px-5 flex flex-col items-center justify-center text-center">
            <h1 className="text-center text-secondary text-4xl font-bold font-heading">{t('home.title')}</h1>
            <div className="w-full md:w-2/3 relative">
                <div className="md:absolute md:left-0 md:w-1/2 md:mt-10 md:ml-10 flex flex-col text-left">
                    <div className="flex items-center mt-10 mb-5">
                        <h2 className="w-full text-2xl font-medium font-heading">{t('home.subheading')}</h2>
                    </div>
                    <p className="md:w-2/3 font-body font-light">{t('home.publicStations')}</p>
                </div>
                <div className="w-full flex justify-center md:justify-end">
                    <img onClick={navigateToStations} className="w-full md:w-2/3 h-auto object-cover mt-5 relative cursor-pointer" src={HeroSectionCar} alt="Car Charging" />
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-10 mt-10">
                <div className="w-full md:w-1/3 flex-col">
                    <div className="flex items-start mb-5">
                        <div className="flex items-center">
                            <img src={Map} className="w-16 h-16" alt="" />
                            <h2 className="text-xl font-medium ml-2 font-heading">{t('home.locations')}</h2>
                        </div>
                    </div>
                    <p className="text-sm text-left font-body font-light">{t('home.muncipalities')}</p>
                </div>
                <div className="w-full md:w-1/3 flex-col">
                    <div className="flex items-start mb-5">
                        <div className="flex items-center">
                            <img src={Type} className="w-16 h-16" alt="" />
                            <h2 className="text-xl font-medium ml-2 font-heading">{t('home.stationType')}</h2>
                        </div>
                    </div>
                    <p className="text-sm text-left font-body font-light">{t('home.stationInfo')}</p>
                </div>
                <div className="w-full md:w-1/3 flex-col">
                    <div className="flex items-start mb-5">
                        <div className="flex items-center">
                            <img src={Cost} className="w-16 h-16" alt="" />
                            <h2 className="text-xl font-medium ml-2 font-heading">{t('home.freeCharge')}</h2>
                        </div>
                    </div>
                    <p className="text-sm text-left font-body font-light">{t('home.freeChargeDesc')}</p>
                </div>
            </div>
            <div className="w-full h-20 mt-10 flex items-center bg-secondary">
                <h2 className="w-full text-2xl font-bold text-white text-center font-heading">{t('home.partners')}</h2>
            </div>
            <h2 className="text-xl font-medium mb-6"></h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Link to="https://primorsko.bg/">
                    <img className="w-20" src={primorsko} alt="primorsko" />
                </Link>
                <Link to="https://www.byala.org/">
                    <img className="w-20" src={byalaLogo} alt="byalaLogo" />
                </Link>
                <Link to="https://dolnichiflik.bg/wps/portal/municipality-dolni-chiflik/home">
                    <img className="w-20" src={chiflikLogo} alt="chiflikLogo" />
                </Link>
                <Link to="https://www.dalgopol.bg/">
                    <img className="w-20" src={dulgopolLogo} alt="dulgopolLogo" />
                </Link>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-5">
                <Link to="https://www.kavarna.bg/">
                    <img className="w-20" src={kavarnaLogo} alt="kavarnaLogo" />
                </Link>
                <Link to="https://www.nesebar.bg/">
                    <img className="w-20" src={neseburLogo} alt="neseburLogo" />
                </Link>
                <Link to="https://www.ubbsla.org/">
                    <img className="w-20" src={abchoPNG} alt="abchoLogo" />
                </Link>
                <Link to="https://pudoos.bg/">
                    <img className="w-20" src={okolnaSreda} alt="okolnaSreda" />
                </Link>
                <Link to="https://www.eeagrants.bg/bg/2009-2014/%d0%bf%d1%80%d0%be%d0%b3%d1%80%d0%b0%d0%bc%d0%b8">
                    <img className="w-20" src={norwayLogo} alt="norwayLogo" />
                </Link>
                <Link to="https://smartinnovationnorway.com/en/">
                    <img className="w-20 h-20 mt-3" src={smartNorwayLogo} alt="smartNorwayLogo" />
                </Link>
            </div>
            {showModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-800">
                    <div className="bg-white rounded-lg md:py-20 px-20 lg: py-10 relative" ref={modalRef}>
                        <img className="mx-auto" src={BlackSeaLogo} alt="" />
                        <h2 className="text-xl font-bold mb-4">Моля отворете сайта на мобилно устройство.</h2>
                        <p>Инсталиране като апликация се поддържа само на iOS и Android.</p>
                        <MdClose onClick={() => setShowModal(false)} className="absolute top-0 right-5 text-2xl mt-4 cursor-pointer text-primary hover:text-secondary hover:scale-150 duration-300" ></MdClose>
                    </div>
                </div>
            )}

            {showMobileModal && (

                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-800">
                    <div className="bg-white rounded-lg md:py-10 px-10 lg: py-10 relative" ref={modalRef}>
                        <img className="w-full mx-auto" src={BlackSeaLogo} alt="" />
                        <h2 className="text-xl font-bold">Инсталирайте приложението на</h2>
                        <h1 className="text-primary font-bold text-xl">BLACK SEA <span className="text-green-400">ELECTROMOBILITY</span></h1>
                        <h2 className="mb-10 text-lg">за да продължите</h2>
                        <div className="flex">
                            <div className="flex flex-col mt-1">
                                <p className="w-6 mt-4 rounded-full bg-primary text-white">1.</p>
                                <p className="w-6 mt-4 rounded-full bg-primary text-white">2.</p>
                                <p className="w-6 mt-4 rounded-full bg-primary text-white">3.</p>
                            </div>
                            <div className="w-full">
                                <img src={popUp2} alt="MobilePopUp" />
                            </div>
                        </div>

                        <MdClose onClick={() => setShowMobileModal(false)} className="absolute top-0 right-5 text-2xl mt-4 cursor-pointer text-primary hover:text-secondary hover:scale-150 duration-300" ></MdClose>
                    </div >


                </div>
            )}
        </div>
    )
}

export default Home
