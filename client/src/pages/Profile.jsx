import useAuthStore from "../store/authStore"
import { useEffect, useState } from "react";
import useEditProfile from "../hooks/useEditProfile";
import { useTranslation } from 'react-i18next';
import { toast } from "react-toastify"
import { EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { reauthenticateWithCredential } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Profile = () => {

    const { t } = useTranslation();

    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser);

    const { editProfile } = useEditProfile();

    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isNameFocused, setNameFocused] = useState(false);
    const [isSurnameFocused, setSurnameFocused] = useState(false);
    const [isCurrentPasswordFocused, setCurrentPasswordFocused] = useState(false);
    const [isNewPasswordFocused, setNewPasswordFocused] = useState(false);
    const [isPhoneFocused, setPhoneFocused] = useState(false);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        currentPassword: "",
        newPassword: "",
    });

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
                } else if (!emailRegex.test(value)) {
                    errorMessage = t("registerError.invalidEmail")
                }
                break;
            case 'currentPassword':
                if (!value.trim()) {
                    errorMessage = t("registerError.passwordRequired")
                    setCurrentPasswordFocused(false);
                } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(value)) {
                    errorMessage = t("registerError.passwordInvalid");
                }
                setShowNewPassword(true);
                break;
            case 'newPassword':
                if (!value.trim()) {
                    errorMessage = t("registerError.repeatPasswordRequired")
                    setNewPasswordFocused(false);
                } else if (inputs.currentPassword === inputs.newPassword) {
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

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    useEffect(() => {
        setInputs(prevInputs => ({
            ...prevInputs,
            name: authUser?.name || "",
            surname: authUser?.surname || "",
            phone: authUser?.phone || "",
            email: authUser?.email || "",
        }));
    }, [authUser]);



    const [inputs, setInputs] = useState({
        name: authUser?.name || "",
        surname: authUser?.surname || "",
        currentPassword: "",
        newPassword: "",
        phone: authUser?.phone || "",
        email: authUser?.email || "",
    });

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const handleEditProfile = async () => {

        const { currentPassword, newPassword } = inputs;

        if (!currentPassword) {
            toast.error("Please provide your current password.");
            return;
        }

        try {

            const credential = EmailAuthProvider.credential(authUser.email, currentPassword)
            await reauthenticateWithCredential(auth.currentUser, credential);

            if (currentPassword !== newPassword && newPassword !== "") {
                await updatePassword(auth.currentUser, newPassword);
                toast.success("Password changed successfully")

                const updatedAuthUser = {
                    ...authUser,
                    password: newPassword,
                }
                setAuthUser(updatedAuthUser);
                localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));

            } else if (currentPassword === newPassword) {
                toast.error("New password cannot be the same as the old one.")
                return;
            }

            await editProfile({
                ...authUser,
                name: inputs.name,
                surname: inputs.surname,
                email: inputs.email,
                phone: inputs.phone
            });

            const updatedAuthUser = {
                ...authUser,
                name: inputs.name,
                surname: inputs.surname,
                email: inputs.email,
                phone: inputs.phone
            };
            setAuthUser(updatedAuthUser);
            localStorage.setItem("user-info", JSON.stringify(updatedAuthUser));
            toast.success("Changes saved successfully")
        } catch (error) {
            console.error("Error updating profile", error);
            if (error.code === 'auth/invalid-credential') {
                toast.error("Invalid current password. Please check your password.");
            } else {
                toast.error("Error updating profile. Please try again.");
            }
        }


    }



    return (
        <div className="bg-white py-28 px-4">
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-4xl font-heading font-light mb-10">{t('profile.hello')} <span className="text-secondary">{authUser?.name}</span></h1>
                <h1 className="text-3xl font-heading font-medium mb-6">{t('profile.title')}</h1>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                        type="email"
                        name="email"
                        value={authUser.email}
                        onChange={handleInputChange}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                        disabled
                    />
                    <label
                        className={`absolute font-body left-4 -mt-3 transition-all duration-300 ${isEmailFocused || authUser.email ? 'top-1 text-sm bg-white px-2 text-gray-400' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="email"
                    >
                        {t('profile.email')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary focus:placeholder-transparent"
                        type="country"
                        name="country"
                        value={authUser.country}
                        onChange={handleInputChange}
                        disabled
                    />
                    <label
                        className={`absolute left-4 -mt-3 font-body transition-all duration-300 ${isEmailFocused || authUser.email ? 'top-1 text-sm bg-white px-2 text-gray-400' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="email"
                    >
                        {t('profile.country')}
                    </label>
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleInputChange}
                        onFocus={() => setNameFocused(true)}
                        onBlur={handleInputBlur}
                    />
                    <label
                        className={`absolute left-4 -mt-3 font-body transition-all duration-300 ${isNameFocused || inputs.name ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.name')}
                    </label>
                    {errors.name && <p className="text-red-500 font-body text-xs">{errors.name}</p>}
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="surname"
                        value={inputs.surname}
                        onChange={handleInputChange}
                        onFocus={() => setSurnameFocused(true)}
                        onBlur={handleInputBlur}
                    />
                    <label
                        className={`absolute left-4 font-body -mt-3 transition-all duration-300 ${isSurnameFocused || inputs.surname ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.surname')}
                    </label>
                    {errors.surname && <p className="text-red-500 font-body text-xs">{errors.surname}</p>}
                </div>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type="text"
                        name="phone"
                        value={inputs.phone}
                        onChange={handleInputChange}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={handleInputBlur}
                    />
                    <label
                        className={`absolute left-4 font-body -mt-3 transition-all duration-300 ${isPhoneFocused || inputs.phone ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="name"
                    >
                        {t('profile.phone')}
                    </label>
                    {errors.phone && <p className="text-red-500 font-body text-xs">{errors.phone}</p>}
                </div>
                <h1 className="text-3xl font-medium font-heading mb-6">{t('profile.changePassword')}</h1>
                <div className="relative mb-5">
                    <input
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        onChange={handleInputChange}
                        onFocus={() => setCurrentPasswordFocused(true)}
                        onBlur={handleInputBlur}
                    />
                    <label
                        className={`absolute left-4 font-body -mt-3 transition-all duration-300 ${isCurrentPasswordFocused || inputs.currentPassword ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="currentPassword"
                    >
                        {t('profile.currentPassword')}
                    </label>
                    {errors.currentPassword && <p className="text-red-500 font-body text-xs">{errors.currentPassword}</p>}
                    <button type="button" onClick={toggleCurrentPasswordVisibility} className="absolute inset-y-0 right-0 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                        {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                </div>
                <div className="relative mb-5">
                    <input required
                        className="input-field border font-body border-gray-300 rounded-md mb-5 px-4 py-2 w-full focus:outline-none focus:border-primary"
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        onChange={handleInputChange}
                        onFocus={() => setNewPasswordFocused(true)}
                        onBlur={handleInputBlur}
                    />
                    <button type="button" onClick={toggleNewPasswordVisibility} className="absolute  inset-y-0 right-0 flex items-center mr-3 -mt-5 text-gray-400 cursor-pointer">
                        {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                    <label
                        className={`absolute left-4 font-body -mt-3 transition-all duration-300 ${isNewPasswordFocused || inputs.newPassword ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-4 -mt-3 translate-y-5 text-gray-400'
                            }`}
                        htmlFor="newPassword"
                    >
                        {t('profile.newPassword')}
                    </label>
                    {errors.newPassword && <p className="text-red-500 font-body text-xs">{errors.newPassword}</p>}
                </div>
                <button onClick={handleEditProfile} className="bg-secondary text-white py-3 px-8 rounded-md hover:bg-primary duration-300 font-body mt-6 w-1/3">{t('profile.submit')}</button>
                <div className="flex items-center mt-6">
                </div>
            </div>
        </div>
    )
}

export default Profile
