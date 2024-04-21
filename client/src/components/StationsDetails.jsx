import { useTranslation } from "react-i18next";
import { Type2, chargingStationSVG } from "../assets";
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
        <div className="w-full flex-col bg-white py-20 px-4">
            <div className="flex justify-center mb-4 relative mt-5">
                <div className="w-96 h-96 relative flex justify-center bg-sky-400">
                    <img className="w-36 h-52 top-6 right-7 absolute" src={chargingStationSVG} />
                    <h1 className="w-32 left-[12px] top-[60px] absolute text-center text-white text-4xl font-bold font-body capitalize">{newStationData?.Name}</h1>
                    <div className="w-44 h-60 left-[200px] top-[140px] absolute">
                        <img className="w-24 h-32 left-14 top-16 absolute" src={Type2} />
                        <h1 className=" right-[46px] bottom-16 absolute text-center text-white text-l font-bold font-body capitalize">{t('stationDetails.type')}</h1>
                        <h1 className="right-[2px] bottom-[2px] absolute text-center text-white text-sm font-bold font-body capitalize">#3736</h1>
                    </div>
                    <div className="w-56 h-64 left-[10px] bottom-[10px] absolute">
                        <h3 className="left-0 bottom-40 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.power')}</h3>
                        <h3 className="left-0 bottom-32 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.totalEnergy')} {newStationData?.EVTotalEnergyCharged} kwH</h3>
                        <h3 className="left-0 bottom-24 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.charged')} {newStationData?.EVEnergyCharged} kwH</h3>
                        <h3 className="left-0 bottom-16 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.chargePower')} {newStationData?.EVChargePower} kw</h3>
                        <h3 className="left-0 bottom-8 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.plugState')} {newStationData?.EVPlugState}</h3>
                        <h3 className="left-0 bottom-0 gap absolute text-center text-white text-l font-light font-body">{t('stationDetails.location')} </h3>
                    </div>
                    <div className="w-56 h-9 left-0 top-0 absolute bg-green-400 rounded-br-2xl" />
                    <div className="left-[14px] top-[4px] absolute text-white text-xl font-bold font-heading uppercase">{newStationData?.State}</div>
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
