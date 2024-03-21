import { Link } from "react-router-dom"
import { logoBlackSea } from "../assets"
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword"
import { useState } from "react";

import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

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
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
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
                    setNameFocused(false);
                    setSurnameFocused(false);
                } else if (!/^[a-zA-Zа-яА-Я\s]+$/.test(value)) {
                    errorMessage = t("registerError.invalidName");
                }
                break;
            case 'email':
                if (!value.trim()) {
                    errorMessage = t("registerError.emailRequired")
                    setEmailFocused(false);
                } else if (!emailRegex.test(value)) {
                    errorMessage = t("registerError.invalidEmail")
                }
                break;
            case 'password':
                if (!value.trim()) {
                    errorMessage = t("registerError.passwordRequired")
                    setPasswordFocused(false);
                } else if (!/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/.test(value)) {
                    errorMessage = t("registerError.passwordInvalid");
                }
                setShowPassword(true);
                break;
            case 'repeatPassword':
                if (!value.trim()) {
                    errorMessage = t("registerError.repeatPasswordRequired")
                    setRepeatPasswordFocused(false);
                } else if (inputs.password !== inputs.repeatPassword) {
                    errorMessage = t("registerError.passwordMismatch")
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    errorMessage = t("registerError.phoneRequired")
                    setPhoneFocused(false);
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formIsValid = true;
        const newErrors = {};

        const nameRegex = /^[a-zA-Zа-яА-Я\s]+$/;

        try {
            if (!inputs.name.trim()) {
                newErrors.name = t("registerError.emptyName")
                formIsValid = false;
            } else if (!nameRegex.test(inputs.name)) {
                newErrors.name = t("registerError.nameInvalid")
                formIsValid = false;
            }
            if (!inputs.surname.trim()) {
                newErrors.surname = t("registerError.emptySurname");
                formIsValid = false;
            } else if (!nameRegex.test(inputs.surname.trim())) {
                newErrors.surname = t("registerError.invalidSurname")
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
                toast.success(t("register.success"))
            }
        } catch (error) {
            toast.error(t("register.fail"))
            console.error(error)
        }


    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const [isNameFocused, setNameFocused] = useState(false);
    const [isSurnameFocused, setSurnameFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [isRepeatPasswordFocused, setRepeatPasswordFocused] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);


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
                                        <div className="relative">
                                            <input
                                                required
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}
                                                onFocus={() => setNameFocused(true)}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300 ${isNameFocused || inputs.name ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('register.name')}
                                            </label>
                                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                        </div>
                                        <div className="relative">
                                            <input
                                                required
                                                id="surname"
                                                name="surname"
                                                type="text"
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                onChange={handleInputChange}
                                                onFocus={() => setSurnameFocused(true)}
                                                onBlur={handleInputBlur}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300 ${isSurnameFocused || inputs.surname ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('register.surname')}
                                            </label>
                                            {errors.surname && <p className="text-red-500 text-xs">{errors.surname}</p>}
                                        </div>
                                        <div className="relative ">
                                            <input
                                                required
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                type="email"
                                                name="email"
                                                value={inputs.email}
                                                onChange={handleInputChange}
                                                onFocus={() => setEmailFocused(true)}
                                                onBlur={handleInputBlur}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300  ${isEmailFocused || inputs.email ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('login.email')}
                                            </label>
                                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                        </div>
                                        <div className="relative">
                                            <input
                                                required
                                                id="password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                onChange={handleInputChange}
                                                onFocus={() => setPasswordFocused(true)}
                                                onBlur={handleInputBlur}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300  ${isPasswordFocused || inputs.password ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('login.password')}
                                            </label>
                                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-4 text-gray-400 cursor-pointer">
                                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                                        <div className="relative">
                                            <input
                                                required
                                                id="repeatPassword"
                                                name="repeatPassword"
                                                type={showRepeatPassword ? "text" : "password"}
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                onChange={handleInputChange}
                                                onFocus={() => setRepeatPasswordFocused(true)}
                                                onBlur={handleInputBlur}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300  ${isRepeatPasswordFocused || inputs.repeatPassword ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('register.repeatPassword')}
                                            </label>
                                            <button type="button" onClick={toggleRepeatPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-8 text-gray-400 cursor-pointer">
                                                {showRepeatPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                            </button>
                                            {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}
                                        </div>
                                        <div className="relative">
                                            <input
                                                required
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                className="input-field border border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                                                onChange={handleInputChange}
                                                onFocus={() => setPhoneFocused(true)}
                                                onBlur={handleInputBlur}
                                            />
                                            <label
                                                className={`absolute left-4 -mt-3 transition-all duration-300  ${isPhoneFocused || inputs.phone ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                                                    }`}
                                                htmlFor="email"
                                            >
                                                {t('register.phone')}
                                            </label>
                                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                        </div>

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
