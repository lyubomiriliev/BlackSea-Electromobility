import { Link, useNavigate } from "react-router-dom"
import { logoBlackSea } from "../assets"
import { useEffect, useState } from "react"

import useLogin from "../hooks/useLogin"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { ToastContainer } from "react-toastify"

const Login = () => {

    const { t } = useTranslation();
    const { handleUserLogin } = useLogin();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const [rememberUser, setRememberUser] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    useEffect(() => {

        const updateErrorMessages = () => {
            const newErrors = {};

            if (errors.email) {
                if (errors.email === "emailRequired") {
                    newErrors.email = t("loginError.emailRequired");
                } else if (errors.email === "emailInvalid") {
                    newErrors.email = t("loginError.invalidEmail");
                }
            }

            if (errors.password) {
                if (errors.password === "passwordRequired") {
                    newErrors.password = t("loginError.passwordRequired");
                } else if (errors.password === "passwordInvalid") {
                    newErrors.password = t("loginError.passwordInvalid");
                }
            }

            setErrors(newErrors);
        };

        updateErrorMessages();
    }, [t])


    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;


    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            case 'email':
                if (!value.trim()) {
                    errorMessage = t("loginError.emailRequired");
                } else if (!isValidEmail(value)) {
                    errorMessage = t("loginError.invalidEmail");
                }
                break;
            case 'password':
                if (!value.trim()) {
                    errorMessage = t("loginError.passwordRequired")
                } else if (!/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/.test(value)) {
                    errorMessage = t("registerError.passwordInvalid");
                }
                break;
            default:
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors, [name]: errorMessage
        }));
    };

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setShowPassword(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        if (!inputs.email.trim()) {
            newErrors.email = t("loginError.emailRequired");
            formIsValid = false;
        } else if (!isValidEmail(inputs.email)) {
            newErrors.email = t("loginError.invalidEmail");
            formIsValid = false;
        }

        if (!inputs.password.trim()) {
            newErrors.password = t("loginError.passwordRequired");
            formIsValid = false;
        } else if (!passwordRegex.test(inputs.password)) {
            newErrors.password = t("loginError.passwordInvalid")
            formIsValid = false;
        }

        setErrors(newErrors);
        if (formIsValid) {
            handleUserLogin(inputs);
            if (rememberUser) {
                localStorage.setItem("rememberedUser", inputs.email);
            } else {
                localStorage.removeItem("rememberedUser");
            }
        }

    }

    const handleForgotPassword = () => {
        navigate("/forgot-password")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }



    return (
        <div>
            <div className="min-h-screen flex justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-40 w-auto" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="mt-6 text-center text-4xl font-bold text-gray-900">{t('login.welcome')}</h1>
                        <div className="mt-6">
                            <form className="mt-8 flex flex-col" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 gap-y-4">
                                    <input required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" type="email" placeholder={t('login.email')} value={inputs.email} onChange={handleInputChange} onBlur={handleInputBlur} name="email" />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                    <div className="relative mb-5">
                                        <input required
                                            className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                                            type={showPassword ? "password" : "text"}
                                            name="password"
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                        />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </button>
                                    </div>
                                    {/* <div className="relative">
                                        <input required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                            type={showPassword ? "password" : "text"}
                                            value={inputs.password}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            name="password"
                                        />
                                        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 text-gray-400 cursor-pointer">
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </button>
                                    </div> */}
                                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
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
                <ToastContainer
                    position="top-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>

        </div>
    )

}
export default Login