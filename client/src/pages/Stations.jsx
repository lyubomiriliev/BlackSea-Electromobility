import { useEffect, useRef, useState } from "react"
import { chargingStationSVG } from "../assets"
import { useTranslation } from 'react-i18next';
import { useStationStore } from "../store/useStationStore";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchDataForAllStations } from "../utils/api";


const Stations = () => {

    const { t } = useTranslation();

    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, setStationData } = useStationStore();
    const [inputs, setInputs] = useState({ search: "" })
    const [isSearchFocused, setSearchFocused] = useState(false);

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    // const [newStationData, setNewStationData] = useState(null);

    // useEffect(() => {
    //     const ws = new WebSocket(
    //         "ws://www.ecarup.com/api/Ocpp16/BDBEC1617524E7AA/22KW"
    //     );

    //     ws.onopen = () => {
    //         console.log("WebSocket Connection Established!");
    //     };

    //     ws.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log("Received data from WebSocket:", data);
    //         setNewStationData(data);
    //     };

    //     ws.onclose = () => {
    //         console.log("WebSocket Connection Closed!");
    //     };

    //     ws.onerror = (error) => {
    //         console.error("WebSocket Error:", error);
    //     };

    //     return () => {
    //         ws.close();
    //     };
    // }, []);

    const [isFetchingData, setIsFetchingData] = useState(true);

    const isLoading = isFetchingData;

    useEffect(() => {
        const storedStationData = localStorage.getItem('stationData');

        if (storedStationData) {
            const parsedStationData = JSON.parse(storedStationData);
            setStationData(parsedStationData);
            setIsFetchingData(false);
        }
    }, [])


    const MINUTE_MS = 60000;

    const stationCodes = [3736, 2946, 3805, 4380]

    useEffect(() => {
        const fetchDataForStations = async () => {
            try {
                const stationData = await fetchDataForAllStations("vesso@raytex-bg.com", "tgrnc02YmExVtRiXIjzMpp10D44y2Hyc", stationCodes);

                const updatedStationData = {
                    "Бяла 1": { ...stationData["Бяла 1"], Name: "Бяла 1" },
                    "Бяла 2": { ...stationData["Бяла 2"], Name: "Бяла 2" },
                    "Приморско 1": { ...stationData["Приморско 1"], Name: "Приморско 1" },
                    "Приморско 2": { ...stationData["Приморско 2"], Name: "Приморско 2" },
                };
                localStorage.setItem('stationData', JSON.stringify(updatedStationData));
                setStationData(updatedStationData);
                setIsFetchingData(false);
            } catch (error) {
                console.error("Error fetching data for stations", error)
                setIsFetchingData(false);
            }

        };

        fetchDataForStations();
        const interval = setInterval(fetchDataForStations, MINUTE_MS);

        return () => clearInterval(interval);
    }, [setStationData]);

    const filteredStations = inputs.search
        ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2].filter(station => station && new RegExp(inputs.search, 'i').test(station.Name))
        : [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2].filter(station => station);

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-5 relative">
                <h1 className="text-2xl font-bold font-heading mt-10">{t('stations.title')}</h1>
                {/* {newStationData ? (
                    <div>
                        {Object.entries(newStationData).map(([stationName, stationInfo]) => (
                            <div key={stationName}>
                                <h2>{stationName}</h2>
                                <p>State: {stationInfo.State}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )} */}
            </div>
            <div className="xl:w-1/3 mx-auto md:w-2/3 relative flex">
                <FaSearch className=" mt-3 text-primary scale-150" />
                <input
                    className="input-field border font-body bg-white border-gray-300 rounded-md mb-5 ml-3 px-4 py-2 w-full focus:outline-none focus:border-primary"
                    type="search"
                    name="search"
                    value={inputs.search}
                    onChange={handleInputChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
                <label
                    className={`absolute left-10 font-body -mt-3 transition-all ml-3 duration-300 ${isSearchFocused || inputs.search ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-0 -mt-3 translate-y-5 text-gray-400'
                        }`}
                    htmlFor="search"
                >
                    {t('stations.search')}
                </label>

            </div>
            {isLoading ? (
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-gray-300 rounded-md py-12 relative flex flex-col justify-center items-center animate-pulse">
                            <div className="w-2/3 h-16 mb-4 bg-gray-200 rounded-md"></div>
                            <div className="w-2/3 h-6 mb-2 bg-gray-200 rounded-md"></div>
                            <div className="w-2/3 h-6 mb-2 bg-gray-200 rounded-md"></div>
                            <div className="w-1/2 h-6 mb-2 bg-gray-200 rounded-md"></div>
                            <div className="w-1/3 h-6 mb-2 bg-gray-200 rounded-md"></div>
                            <div className="w-1/4 h-6 absolute bottom-3 right-3 bg-gray-200 rounded-md"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <
                    div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(inputs.search === "" ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2] : filteredStations).map(station => (
                        <Link key={station?.stationCode} to={`/station-details/${station?.Name}`} className=" hover:opacity-70">
                            <div className="bg-gray-100 rounded-md px-2 py-2 flex justify-center items-center">
                                <div className="flex flex-col mr-3">
                                    <h2 className="text-l font-bold font-body text-gray-800">{station?.Name}</h2>
                                    <p className="text-l font-bold font-body text-green-500">{station?.State}</p>
                                </div>
                                <div className="flex flex-col ml-5">
                                    <p className="text-sm text-gray-600 font-body mb-2">{t('stations.charge')} {station?.EVEnergyCharged}kwH</p>
                                    <p className="text-sm text-gray-600 font-body mb-2">{t('stations.totalEnergy')} {station?.EVTotalEnergyCharged}kwH</p>
                                    <p className="text-sm text-gray-600 font-body">{t('stations.power')}</p>
                                </div>
                                <div className="flex justify-end">
                                    <img className=" w-20 h-auto" src={chargingStationSVG} alt="stationIcon" />
                                </div>
                            </div>


                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Stations;
