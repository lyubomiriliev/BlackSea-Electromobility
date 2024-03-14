import { byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, primorsko, smartNorwayLogo } from "../assets"

const Home = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Черноморска електромобилност</h1>
            <div className="w-full h-full flex items-center justify-center">
                <img className="w-24" src={primorsko} alt="primorsko" />
                <img className="w-24" src={byalaLogo} alt="byalaLogo" />
                <img className="w-24" src={chiflikLogo} alt="chiflikLogo" />
                <img className="w-24" src={dulgopolLogo} alt="dulgopolLogo" />
                <img className="w-24" src={kavarnaLogo} alt="kavarnaLogo" />
                <img className="w-24" src={neseburLogo} alt="neseburLogo" />
                <img className="w-24" src={smartNorwayLogo} alt="smartNorwayLogo" />
            </div>

        </div>
    )
}

export default Home
