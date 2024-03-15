import { useEffect, useState } from "react"
import { chargingStationSVG } from "../assets"
import { fetchData } from "../utils/api"


const Stations = () => {

    const [statusData, setStatusData] = useState(null);

    useEffect(() => {
        const fetchDataForStation = async () => {
            const data = await fetchData('vesso@raytex-bg.com', 'tgrnc02YmExVtRiXIjzMpp10D44y2Hyc', '3736');
            setStatusData(data);
        };

        fetchDataForStation();
    }, []);

    return (
        <div className="w-full bg-white py-40 px-4">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {statusData && (
                    <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                        <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                        <h2 className="text-xl font-bold mb-2">{statusData.Name}</h2>
                        <p className="text-xl font-bold text-green-500 mb-2">{statusData.State}</p>
                        <p className="text-sm text-gray-600 mb-2">22 kwH</p>
                        <p className="text-sm text-gray-600 absolute bottom-3 right-3">{statusData.code}</p>
                    </div>
                )}
                <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                    <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                    <h2 className="text-xl font-bold mb-2">Бяла 2</h2>
                    <p className="text-xl font-bold text-green-500 mb-2">Свободна</p>
                    <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                    <p className="text-sm text-gray-600 absolute bottom-3 right-3">#2946</p>
                </div>
                <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                    <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                    <h2 className="text-xl font-bold mb-2">Приморско 2</h2>
                    <p className="text-xl font-bold text-red-500 mb-2">Заета</p>
                    <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                    <p className="text-sm text-gray-600 absolute bottom-3 right-3">#3805</p>
                </div>
            </div>
        </div>
    );
};

export default Stations;
