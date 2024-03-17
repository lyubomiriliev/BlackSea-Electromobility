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
            <div className="min-h-screen flex justify-center bg-gray-50 py-1 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-40" src={logoBlackSea} alt="mainLogo" />
                        <h1 className=" text-center text-2xl font-bold text-gray-900">{t("register.create")}</h1>
                        <div className="mb-10">
                            <div className="flex flex-col">
                                <form className="mt-8 flex flex-col" onSubmit={(e) => { e.preventDefault(); }}>
                                    <div className="grid grid-cols-1 gap-y-4">
                                        <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.name")} value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                                        <input id="surname" name="surname" type="text" autoComplete="surname" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.surname")} value={inputs.surname} onChange={(e) => setInputs({ ...inputs, surname: e.target.value })} />
                                        <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.email")} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                        <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.password")} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                        <input id="repeat_password" name="repeat_password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.repeatPassword")} value={inputs.repeatPassword} onChange={(e) => setInputs({ ...inputs, repeatPassword: e.target.value })} />
                                        <input id="phone" name="phone" type="text" autoComplete="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder={t("register.phone")} value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                                    </div>
                                    <Link to="/login">
                                        <p className="font-bold mt-2">{t("register.haveProfile")}</p>
                                    </Link>
                                    <div>
                                        <button onClick={() => signup(inputs)} className="bg-primary text-white text-base mt-5 py-3 px-8 tracking-wide rounded-md self-center w-2/3 hover:bg-secondary duration-300">
                                            {t("register.register")}
                                        </button>
                                    </div>
                                </form>
                                <div className="flex justify-center mt-5 space-x-4">
                                    <button onClick={() => i18n.changeLanguage('en')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">EN</button>
                                    <button onClick={() => i18n.changeLanguage('bg')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary duration-300">BG</button>
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
