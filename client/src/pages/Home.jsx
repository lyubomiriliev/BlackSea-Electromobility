import { useState } from "react";
import { BlackSeaLogo, abchoPNG, byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, norwayLogo, okolnaSreda, popUp, popUp2, primorsko, smartNorwayLogo } from "../assets"
import { useTranslation } from 'react-i18next';

import { MdClose } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";




const Home = () => {

    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);

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

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const mobileModalShown = localStorage.getItem('mobileModalShown');
            if (!mobileModalShown) {
                setShowMobileModal(true);
                localStorage.setItem('mobileModalShown', true)
            }
        } else {
            const isLoggedIn = localStorage.getItem("user-info");
            if (isLoggedIn) {
                const modalShown = localStorage.getItem('modalShown');
                if (!modalShown) {
                    setShowModal(true);
                    localStorage.setItem('modalShown', true);
                }
            }
        }


    }, [])

    return (
        <div className="max-w-screen-2xl mx-auto my-10 py-20 flex flex-col items-center justify-center text-center">

            <h1 className="text-2xl font-bold mb-6">{t('home.title')}</h1>
            <h2 className="text-xl font-medium mb-6">{t('home.partners')}</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <img className="w-24" src={primorsko} alt="primorsko" />
                <img className="w-24" src={byalaLogo} alt="byalaLogo" />
                <img className="w-24" src={chiflikLogo} alt="chiflikLogo" />
                <img className="w-24" src={dulgopolLogo} alt="dulgopolLogo" />
                <img className="w-24" src={kavarnaLogo} alt="kavarnaLogo" />
                <img className="w-24" src={neseburLogo} alt="neseburLogo" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
                <img className="w-24" src={abchoPNG} alt="abchoLogo" />
                <img className="w-24" src={okolnaSreda} alt="okolnaSreda" />
                <img className="w-24" src={norwayLogo} alt="norwayLogo" />
                <img className="w-24 h-20 mt-3" src={smartNorwayLogo} alt="smartNorwayLogo" />
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50 bg-gray-800">
                    <div className="bg-white rounded-lg md:py-20 px-20 lg: py-20 relative" ref={modalRef}>
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
                    </div>

                </div>
            )}
        </div>
    )
}

export default Home
