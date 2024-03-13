import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div>
            <div className=" max-w-screen-xl mx-auto py-20 flex ">
                <div className="w-1/3 pr-10">
                    <div className="w-full">
                        <h1 className="text-4xl font-bold">Добре дошли!</h1>
                        <div className="mt-6">
                            <div className="flex flex-col">
                                <label className="mb-2">Попълнете вашите данни</label>
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Електронна поща" />
                                <input className=" border-b-[2px] bg-gray-100 px-2 py-2 mb-5" type="text" placeholder="Парола" />
                                <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">Вход</button>
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
