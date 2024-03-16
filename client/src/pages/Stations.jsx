import { useEffect, useState } from "react"
import { chargingStationSVG } from "../assets"
import { fetchDataByala1, fetchDataByala2, fetchDataPrimorsko1, fetchDataPrimorsko2 } from "../utils/api"





const Stations = () => {

    const [stationByala1, setStationByala1] = useState(null);
    const [stationByala2, setStationByala2] = useState(null);
    const [stationPrimorsko1, setStationPrimorsko1] = useState(null);
    const [stationPrimorsko2, setStationPrimorsko2] = useState(null);

    useEffect(() => {
        const fetchDataForStations = async () => {
            const dataByala1 = await fetchDataByala1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3736');
            const dataByala2 = await fetchDataByala2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '2946');
            const dataPrimorsko1 = await fetchDataPrimorsko1('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3805');
            const dataPrimorsko2 = await fetchDataPrimorsko2('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '4380');
            setStationByala1(dataByala1);
            setStationByala2(dataByala2);
            setStationPrimorsko1(dataPrimorsko1);
            setStationPrimorsko2(dataPrimorsko2);
        };

        fetchDataForStations();
    }, []);

    return (
        <div className="w-full bg-white py-40 px-4">
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stationByala1 && (
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{stationByala1.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{stationByala1.State}</p>
                        <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                        <p className="text-sm text-gray-600 mb-2">Зареден ток: {stationByala1.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 absolute bottom-3 right-3">{stationByala1.code}</p>
                    </div>
                )}
                {stationByala2 && (
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{stationByala2.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{stationByala2.State}</p>
                        <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                        <p className="text-sm text-gray-600 mb-2">Зареден ток: {stationByala2.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 absolute bottom-3 right-3">{stationByala2.code}</p>
                    </div>
                )}
                {stationPrimorsko1 && (
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{stationPrimorsko1.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{stationPrimorsko1.State}</p>
                        <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                        <p className="text-sm text-gray-600 mb-2">Зареден ток: {stationPrimorsko1.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 absolute bottom-3 right-3">{stationPrimorsko1.code}</p>
                    </div>
                )}
                {stationPrimorsko2 && (
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{stationPrimorsko2.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{stationPrimorsko2.State}</p>
                        <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                        <p className="text-sm text-gray-600 mb-2">Зареден ток: {stationPrimorsko2.EVEnergyCharged}kwH</p>
                        <p className="text-sm text-gray-600 absolute bottom-3 right-3">{stationPrimorsko2.code}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stations;
