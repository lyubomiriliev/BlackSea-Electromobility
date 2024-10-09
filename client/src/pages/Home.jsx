import { useState } from "react";
import { BlackSeaLogo, Cost, HeroSectionCar, Map, Type, abchoPNG, byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, norwayLogo, okolnaSreda, popUp, popUp2, primorsko, smartNorwayLogo } from "../assets"
import { Trans, useTranslation } from 'react-i18next';

import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import Partners from "../components/Partners";



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
        <div className="w-full mx-auto my-10 py-20 px-5 md:px-0 flex flex-col items-center justify-center">
            <HeroSection />
            {/* SubHero Start */}
            <div className="w-full md:w-2/3 justify-between  gap-5 md:gap-10 items-center  flex flex-col md:flex-row mt-10">
                <div className="w-full md:w-1/3 flex flex-col">
                    <div className="flex flex-col items-start mb-5">
                        <div className="flex items-center">
                            <img src={Map} className="w-16 h-16" alt="" />
                            <h2 className="text-2xl md:text-3xl ml-2 font-heading">{t('home.locations')}</h2>
                        </div>
                    <p className="text-sm text-left font-body font-light">{t('home.muncipalities')}</p>
                    </div>
                </div>

                <div className="md:h-24 md:bg-black w-[1px] md:mt-5"></div>

                <div className="w-full md:w-1/3 flex-col ">
                    <div className="flex flex-col items-start mb-5">
                        <div className="flex items-center">
                            <img src={Type} className="w-16 h-16" alt="" />
                            <h2 className="text-2xl md:text-3xl ml-2 font-heading">{t('home.stationType')}</h2>
                        </div>
                    <p className="text-sm text-left font-body font-light">{t('home.stationInfo')}</p>
                    </div>
                </div>

                <div className="md:h-24 md:bg-black w-[1px] md:mt-5"></div>

                <div className="w-full md:w-1/3 flex-col">
                    <div className="flex flex-col items-start mb-5">
                        <div className="flex items-center">
                            <img src={Cost} className="w-16 h-16" alt="" />
                            <h2 className="text-2xl md:text-3xl ml-2 font-heading">{t('home.freeCharge')}</h2>
                        </div>
                    <p className="text-sm text-left font-body font-light">{t('home.freeChargeDesc')}</p>

                    </div>
                </div>
            </div>
            {/* SubHeroEnd */}
            <Partners />
            
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
