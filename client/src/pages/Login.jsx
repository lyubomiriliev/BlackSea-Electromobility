import { Link, useNavigate } from "react-router-dom"
import { logoBlackSea } from "../assets"
import { useEffect, useState } from "react"

import useLogin from "../hooks/useLogin"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

const Login = () => {

    const { t } = useTranslation();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [rememberUser, setRememberUser] = useState(false);
    const { handleUserLogin } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("rememberedUser");
        if (storedUser) {
            setInputs((prevInputs) => ({
                ...prevInputs,
                email: storedUser,
            }));
            setRememberUser(true);
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        handleUserLogin(inputs);
        if (rememberUser) {
            localStorage.setItem("rememberedUser", inputs.email);
        } else {
            localStorage.removeItem("rememberedUser");
        }
    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    return (
        <div>
            <div className="min-h-screen flex justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-40 w-auto" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="mt-6 text-center text-4xl font-bold text-gray-900">{t('login.welcome')}</h1>
                        <div className="mt-6">
                            <form className="mt-8 flex flex-col" onSubmit={handleLogin}>
                                <div className="grid grid-cols-1 gap-y-4">
                                    <input required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" type="email" placeholder={t('login.email')} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                    <input required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" type="password" placeholder={t('login.password')} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                    <div className="flex items-center">
                                        <label htmlFor="rememberUser">{t("login.signedIn")}</label>
                                        <input className="ml-2" type="checkbox" id="rememberUser" checked={rememberUser} onChange={(e) => setRememberUser(e.target.checked)} />
                                    </div>
                                    <button type="submit" className="bg-primary text-white text-base mt-5 py-3 px-20 tracking-wide rounded-md flex mx-auto hover:bg-secondary duration-300">{t('login.login')}</button>
                                </div>
                            </form>
                            <div className="flex mx-auto py-2 text-secondary font-bold">
                                <button className="flex mx-auto py-2 text-black font-bold" onClick={handleForgotPassword}>{t('login.forgotPassword')}</button>
                            </div>
                            <Link to="/register" className="font-medium ">
                                <button className="flex mx-auto py-2 text-secondary font-bold">{t('login.noProfile')}</button>
                            </Link>
                            <div className="flex justify-center mt-10 space-x-4">
                                <button onClick={() => i18n.changeLanguage('en')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">EN</button>
                                <button onClick={() => i18n.changeLanguage('bg')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">BG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
