import { Link } from "react-router-dom"
import { logoBlackSea } from "../assets"
import useSignUpWithEmailAndPassword from "../hooks/useSignUpWithEmailAndPassword"
import { useState } from "react";

const Register = () => {

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
            <div className="w-full justify-center flex">
                <div className="w-1/3 pr-10">
                    <div className="w-full">
                        <img className="w-120" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="text-4xl font-bold">Създаване на акаунт</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                }} ></form>
                                <label className="mb-2">Регистрирайте се за да продължите</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Име" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Фамилия" value={inputs.surname} onChange={(e) => setInputs({ ...inputs, surname: e.target.value })} />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="email" placeholder="E-mail" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="password" placeholder="Парола" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="password" placeholder="Повтори парола" value={inputs.repeatPassword} onChange={(e) => setInputs({ ...inputs, repeatPassword: e.target.value })} />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Телефон" value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                                <button onClick={() => signup(inputs)} className="bg-primary text-white text-base py-3 px-8 tracking-wide rounded-md self-center w-60 hover:bg-secondary duration-300">Регистрация</button>
                            </div>
                            <div className="flex mx-auto py-5">
                                <div className=" border-[1px] h-1">
                                </div>
                                <Link to="/login">
                                    <p>Вече имате профил? Влезте тук</p>
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
