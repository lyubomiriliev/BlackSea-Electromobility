import { useTranslation } from "react-i18next";
import { chargingStationSVG } from "../assets";
import { useStationStore } from "../store/useStationStore";
import { Link, useParams } from "react-router-dom";


const StationsDetails = () => {

    const { t } = useTranslation();

    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2 } = useStationStore();
    const { name } = useParams()

    const stationData = [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2].find(station => station && station.Name === decodeURIComponent(name))

    if (!stationData) {

    }

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-4 relative">
                <div className="max-w-screen-xl mx-auto flex">
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-2/3" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{stationData.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{stationData.State}</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.power')}</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.charge')} {stationData.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.charge')} {stationData.EVChargePower}kw</p>
                        <p className="text-sm text-gray-600 mb-2">{t('stations.charge')} {stationData.EVPlugState}</p>
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
}

export default StationsDetails
