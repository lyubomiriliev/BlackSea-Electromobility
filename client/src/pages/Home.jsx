import { abchoPNG, byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, norwayLogo, okolnaSreda, primorsko, smartNorwayLogo } from "../assets"

import { useTranslation } from 'react-i18next';


const Home = () => {

    const { t } = useTranslation();

    return (
        <div className="max-w-screen-2xl mx-auto py-20 flex flex-col items-center justify-center text-center">

            <h1 className="text-2xl font-bold mb-6">{t('home.title')}</h1>
            <h2 className="text-xl font-medium mb-6">{t('home.partners')}</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <img className="w-24" src={primorsko} alt="primorsko" />
                <img className="w-24" src={byalaLogo} alt="byalaLogo" />
                <img className="w-24" src={chiflikLogo} alt="chiflikLogo" />
                <img className="w-24" src={dulgopolLogo} alt="dulgopolLogo" />
                <img className="w-24" src={kavarnaLogo} alt="kavarnaLogo" />
                <img className="w-24" src={neseburLogo} alt="neseburLogo" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5">
                <img className="w-24" src={abchoPNG} alt="abchoLogo" />
                <img className="w-24" src={okolnaSreda} alt="okolnaSreda" />
                <img className="w-24" src={norwayLogo} alt="norwayLogo" />
                <img className="w-24" src={smartNorwayLogo} alt="smartNorwayLogo" />


            </div>
        </div>
    )
}

export default Home
