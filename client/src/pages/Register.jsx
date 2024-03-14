import { Link } from "react-router-dom"
import { logoBlackSea } from "../assets"

const Register = () => {
    return (
        <div>
            <div className="w-full justify-center flex">
                <div className="w-1/3 pr-10">
                    <div className="w-full">
                        <img className="w-120" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="text-4xl font-bold">Създаване на акаунт</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <label className="mb-2">Регистрирайте се за да продължите</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Име" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Фамилия" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="E-mail" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Парола" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Повтори парола" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Телефон" />
                                <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md self-center w-60 hover:bg-gray-800 duration-300">Регистрация</button>
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
