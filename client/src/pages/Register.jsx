import { Link } from "react-router-dom"
import { logoBlackSea } from "../assets"
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword"
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";


const Register = () => {

    const { t } = useTranslation();

    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
        phone: "",
    });

    const { signup } = useSignUpWithEmailAndPassword();

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-end">
                    <button onClick={() => i18n.changeLanguage('en')}>EN</button>
                    <button onClick={() => i18n.changeLanguage('bg')}>BG</button>
                </div>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-40 w-auto" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">{t("register.create")}</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <form className="mt-6 space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
                                    <input type="hidden" name="remember" value="true" />
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="name" className="sr-only">{t("register.name")}</label>
                                            <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.name")} value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <label htmlFor="surname" className="sr-only">{t("register.surname")}</label>
                                            <input id="surname" name="surname" type="text" autoComplete="surname" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.surname")} value={inputs.surname} onChange={(e) => setInputs({ ...inputs, surname: e.target.value })} />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">{t("register.email")}</label>
                                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.email")} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">{t("register.password")}</label>
                                            <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.password")} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                        </div>
                                        <div>
                                            <label htmlFor="repeat_password" className="sr-only">{t("register.repeatPassword")}</label>
                                            <input id="repeat_password" name="repeat_password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.repeatPassword")} value={inputs.repeatPassword} onChange={(e) => setInputs({ ...inputs, repeatPassword: e.target.value })} />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="sr-only">{t("register.phone")}</label>
                                            <input id="phone" name="phone" type="text" autoComplete="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.phone")} value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                                        </div>
                                    </div>

                                    <div>
                                        <button onClick={() => signup(inputs)} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                            {t("register.register")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-sm text-center">
                                <div className=" border-[1px] h-1">
                                </div>
                                <Link to="/login">
                                    <p>{t("register.haveProfile")}</p>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register
