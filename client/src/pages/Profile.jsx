import { Link } from "react-router-dom"
import useAuthStore from "../store/authStore"
import { useState } from "react";
import useEditProfile from "../hooks/useEditProfile";

const Profile = () => {

    const authUser = useAuthStore((state) => state.user)
    const { editProfile } = useEditProfile();

    const handleEditProfile = async () => {

        try {
            await editProfile(inputs)
            alert("Успешно запазване")
        } catch (error) {
            alert("Неуспешно запазване")
        }
    }

    const [inputs, setInputs] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
    });

    return (
        <div className="bg-white py-40 px-4">
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-4xl font-bold mb-6">Профил</h1>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="text" placeholder="Име" value={inputs.name || authUser?.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="text" placeholder="Фамилия" value={inputs.surname || authUser?.surname} onChange={(e) => setInputs({ ...inputs, surname: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="email" placeholder="E-mail" value={inputs.email || authUser?.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="password" placeholder="Стара парола" value={inputs.password || authUser?.password} onChange={(e) => setInputs(e)({ ...inputs, password: e.target.value })} />
                </div>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="password" placeholder="Нова парола" />
                </div>
                <div className="mb-6">
                    <input className="input-field border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-primary" type="text" placeholder="Телефон" value={inputs.phone || authUser?.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                </div>
                <button onClick={handleEditProfile} className="bg-secondary text-white py-3 px-8 rounded-md hover:bg-primary duration-300 mt-6 w-1/3">Актуализирай</button>
                <div className="flex items-center mt-6">
                </div>
            </div>
        </div>
    )
}

export default Profile
