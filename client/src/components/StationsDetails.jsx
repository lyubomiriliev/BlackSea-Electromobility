import { useTranslation } from "react-i18next";
import { chargingStationSVG } from "../assets";
import { useStationStore } from "../store/useStationStore";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const StationsDetails = () => {

    const { t } = useTranslation();
    const { setStationData } = useStationStore();
    const { name } = useParams()
    const [newStationData, setNewStationData] = useState(null);

    useEffect(() => {
        const storedStationData = localStorage.getItem('stationData');
        if (storedStationData) {
            const parsedStationData = JSON.parse(storedStationData);
            if (parsedStationData[name]) {
                setNewStationData(parsedStationData[name]);
            }
        } else {
            const foundStation = Object.values(stations).find(station => station.Name === decodeURIComponent(name));
            if (foundStation) {
                setStationData(foundStation);
                localStorage.setItem('stationData', JSON.stringify({ [foundStation.Name]: foundStation }));
            }
        }

    }, [name]);

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-4 relative mt-5">
                <div className="max-w-screen-xl mx-auto flex">
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-1/3" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{newStationData?.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{newStationData?.State}</p>
                        <p className="text-sm font-bold text-gray-600 mb-2">{t('stations.power')}</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.totalEnergy')} {newStationData?.EVTotalEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.charged')} {newStationData?.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.charge')} {newStationData?.EVChargePower}kw</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.plugState')} {newStationData?.EVPlugState}</p>
                        <p className="text-sm text-gray-600 font-bold absolute top-3 right-3">#3736</p>
                    </div>

                </div>
            </div>
            <div className="flex justify-center">

                <button className="mx-2 py-2 px-4 rounded bg-primary hover:bg-secondary text-white">Charge</button>
                <Link to="/stations">
                    <button className="mx-2 py-2 px-4 rounded bg-primary hover:bg-secondary text-white">Back to stations</button>
                </Link>
            </div>
        </div>
    );


};




export default StationsDetails
