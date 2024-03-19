import { Link } from "react-router-dom"
import { logoBlackSea } from "../assets"
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword"
import { useState } from "react";

import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Register = () => {

    const { t } = useTranslation();
    const { signup } = useSignUpWithEmailAndPassword();

    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
        phone: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
        phone: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleInputFocus = () => {
        setShowPassword(true);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        let errorMessage = "";

        switch (name) {
            case 'name':
            case 'surname':
                if (!value.trim()) {
                    errorMessage = t("registerError.emptyName");
                } else if (!/^[a-zA-Zа-яА-Я\s]+$/.test(value)) {
                    errorMessage = t("registerError.invalidName");
                }
                break;
            case 'email':
                if (!value.trim()) {
                    errorMessage = t("registerError.emailRequired")
                } else if (!emailRegex.test(value)) {
                    errorMessage = t("registerError.invalidEmail")
                }
                break;
            case 'password':
                if (!value.trim()) {
                    errorMessage = t("registerError.passwordRequired")
                } else if (!/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/.test(value)) {
                    errorMessage = t("registerError.passwordInvalid");
                }
                setShowPassword(true);
                break;
            case 'repeatPassword':
                if (!value.trim()) {
                    errorMessage = t("registerError.repeatPasswordRequired")
                } else if (inputs.password !== inputs.repeatPassword) {
                    errorMessage = t("registerError.passwordMismatch")
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    errorMessage = t("registerError.phoneRequired")
                } else if (!/^[0-9+]+$/.test(value)) {
                    errorMessage = t("registerError.phoneInvalid");
                }
                break;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    }

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        setShowPassword(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        const nameRegex = !/^[a-zA-Zа-яА-Я\s]+$/;
        if (!inputs.name.trim()) {
            newErrors.name = t("registerError.emptyName")
            formIsValid = false;
        } else if (!nameRegex.test(value)) {
            newErrors.name = t("registerError.nameInvalid")
            formIsValid = false;
        }
        if (!inputs.surname.trim()) {
            newErrors.surname = t("registerError.emptySurname");
            formIsValid = false;
        } else if (!nameRegex.test(inputs.surname.trim())) {
            newErrors.surname = t("registerError.")
            formIsValid = false;
        }

        if (!inputs.email.trim()) {
            newErrors.email = t("registerError.emailRequired");
            formIsValid = false;
        } else if (!isValidEmail(inputs.email)) {
            newErrors.email = t("registerError.invalidEmail");
            formIsValid = false;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

        if (!inputs.password.trim() || !passwordRegex.test(inputs.password.trim())) {
            newErrors.password = t("registerError.passwordRequired");
            formIsValid = false;
        }

        if (inputs.password !== inputs.repeatPassword) {
            newErrors.repeatPassword = t("registerError.passwordMismatch");
            formIsValid = false;
        }

        const phoneRegex = /^[0-9+]+$/;
        if (!inputs.phone.trim() || !phoneRegex.test(inputs.phone.trim())) {
            newErrors.phone = t("registerError.phoneRequired");
            formIsValid = false;
        }

        setErrors(newErrors);

        if (formIsValid) {
            signup(inputs);
        }

    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div>
            <div className="min-h-screen flex justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-40" src={logoBlackSea} alt="mainLogo" />
                        <h1 className=" text-center text-2xl font-bold text-gray-900">{t("register.create")}</h1>
                        <div className="mb-10">
                            <div className="flex flex-col">
                                <form className="mt-8 flex flex-col" onSubmit={handleSubmit} noValidate>
                                    <div className="grid grid-cols-1 gap-y-4 relative">
                                        <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.name")} onChange={handleInputChange} onBlur={handleInputBlur} />
                                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                        <input id="surname" name="surname" type="text" autoComplete="surname" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.surname")} onChange={handleInputChange} onBlur={handleInputBlur} />
                                        {errors.surname && <p className="text-red-500 text-xs">{errors.surname}</p>}
                                        <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.email")} onChange={handleInputChange} onBlur={handleInputBlur} />
                                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                        <div className="relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm pr-10"
                                                placeholder={t("register.password")}
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                                onBlur={handleInputBlur}
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 flex items-center mr-3 text-gray-400 cursor-pointer"
                                            >
                                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                                        <input id="repeatPassword" name="repeatPassword" type={showPassword ? "text" : "password"} autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.repeatPassword")} onChange={handleInputChange} onBlur={handleInputBlur} />
                                        {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}
                                        <input id="phone" name="phone" type="text" autoComplete="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.phone")} onChange={handleInputChange} onBlur={handleInputBlur} />
                                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

                                    </div>
                                    <Link to="/login">
                                        <button className="flex mx-auto py-2 text-secondary font-bold">{t("register.haveProfile")}</button>
                                    </Link>
                                    <div>
                                        <button className="bg-primary text-white text-base mt-5 py-3 px-20 tracking-wide rounded-md flex mx-auto hover:bg-secondary duration-300">
                                            {t("register.register")}
                                        </button>
                                    </div>
                                </form>
                                <div className="flex justify-center mt-5 space-x-4">
                                    <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">EN</button>
                                    <button onClick={() => i18n.changeLanguage('bg')} className="px-2 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">BG</button>
                                </div>
                            </div>
                            <div className="text-sm text-center">
                                <div className="mt-5">
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register
