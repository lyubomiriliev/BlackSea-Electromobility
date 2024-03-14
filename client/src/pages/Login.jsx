import { Link, useNavigate } from "react-router-dom"
import { logoBlackSea } from "../assets"
import { useState } from "react"
import useLogin from "../hooks/useLogin"

const Login = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })

    const { handleUserLogin } = useLogin();
    const navigate = useNavigate();


    return (
        <div>
            <div className="w-full justify-center flex">
                <div className="w-1/3 pr-10">
                    <div className="w-full ">
                        <img className="w-100" src={logoBlackSea} alt="mainLogo" />
                        <h1 className="text-4xl font-bold">Добре дошли!</h1>
                        <div className="mt-6">
                            <div>
                                <form className="flex flex-col" onSubmit={(e) => {
                                    e.preventDefault();
                                    handleUserLogin(inputs);
                                }}>
                                    <label className="mb-2">Попълнете вашите данни</label>
                                    <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="email" placeholder="Електронна поща" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                                    <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="password" placeholder="Парола" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                                    <button type="submit" className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md self-center w-60 hover:bg-gray-800 duration-300">Вход</button>
                                </form>

                            </div>
                            <div className="flex mx-auto py-5">
                                <div className=" border-[1px] h-1">
                                </div>
                                <p>Забравена парола?</p>
                            </div>
                            <Link to="/register">
                                <button>Нямате профил? Регистрирайте се тук</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
