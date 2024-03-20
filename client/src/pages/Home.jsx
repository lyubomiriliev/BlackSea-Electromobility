import { abchoPNG, byalaLogo, chiflikLogo, dulgopolLogo, kavarnaLogo, neseburLogo, norwayLogo, okolnaSreda, primorsko, smartNorwayLogo } from "../assets"

import { useTranslation } from 'react-i18next';
import { useStationStore } from "../store/useStationStore";
import { fetchDataByala1, fetchDataByala2, fetchDataPrimorsko1, fetchDataPrimorsko2 } from "../utils/api"
import { useEffect } from "react";



const Home = () => {

    const { t } = useTranslation();

    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, setStationData } = useStationStore();


    // useEffect(() => {
    //     if (!stationByala1 && !stationByala2 && !stationPrimorsko1 && !stationPrimorsko2) {
    //         const fetchDataForStations = async () => {
    //             try {
    //                 const dataByala1 = await fetchDataByala1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3736');
    //                 const dataByala2 = await fetchDataByala2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '2946');
    //                 const dataPrimorsko1 = await fetchDataPrimorsko1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3805');
    //                 const dataPrimorsko2 = await fetchDataPrimorsko2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '4380');

    //                 setStationData({
    //                     stationByala1: dataByala1,
    //                     stationByala2: dataByala2,
    //                     stationPrimorsko1: dataPrimorsko1,
    //                     stationPrimorsko2: dataPrimorsko2,
    //                 });
    //             } catch (error) {
    //                 console.error("Error fetching data for stations:", error);
    //             }
    //         };
    //         fetchDataForStations();
    //     }


    // }, [setStationData]);

    return (
        <div className="max-w-screen-2xl mx-auto my-10 py-20 flex flex-col items-center justify-center text-center">

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
