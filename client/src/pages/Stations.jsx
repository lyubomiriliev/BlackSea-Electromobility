import { useEffect, useRef, useState } from "react"
import { chargingStationSVG } from "../assets"
import { useTranslation } from 'react-i18next';
import { useStationStore } from "../store/useStationStore";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchDataForAllStations } from "../utils/api";


const Stations = () => {

    const { t } = useTranslation();

    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, setStationData, stationDalgopol1, stationDalgopol2, stationDolniChiflik, stationKavarna1, stationKavarna2, stationNesebar1, stationNesebar2 } = useStationStore();
    const [inputs, setInputs] = useState({ search: "" })
    const [isSearchFocused, setSearchFocused] = useState(false);

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


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
        ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik, stationKavarna1, stationKavarna2, stationNesebar1, stationNesebar2].filter(station => station && new RegExp(inputs.search, 'i').test(station.Name))
        : [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik, stationKavarna1, stationKavarna2, stationNesebar1, stationNesebar2].filter(station => station);

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-5 relative">
                <h1 className="text-2xl font-bold font-heading mt-10">{t('stations.title')}</h1>
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
                    {(inputs.search === "" ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik, stationKavarna1, stationKavarna2, stationNesebar1, stationNesebar2] : filteredStations).map(station => (
                        <Link key={station?.stationCode} to={`/station-details/${station?.Name}`} className=" hover:opacity-70">
                            <div className="w-96 h-60 relative">
                                <div className="w-80 h-60 relative">
                                    <div className="w-96 h-60 left-0 top-0 absolute rounded-bl-2xl rounded-tr-2xl bg-sky-400" />
                                    <h1 className="left-[11px] top-[51px] absolute text-center text-white text-3xl font-bold font-heading capitalize">{station?.Name}</h1>
                                    <h2 className="left-[14px] top-[172px] absolute text-center text-white text-l font-medium font-body">Charge Power: {station?.EVEnergyCharged} kwH</h2>
                                    <h2 className="left-[14px] top-[207px] absolute text-center text-white text-l font-medium font-body">Total Charged: {station?.EVTotalEnergyCharged} kwH</h2>
                                    <h2 className="left-[14px] top-[137px] absolute text-center text-white text-l font-medium font-body">Power: 22 kw</h2>
                                    <div className="w-56 h-9 left-0 top-0 absolute">
                                        <div className="w-56 h-9 left-0 top-0 absolute bg-green-400 rounded-br-2xl" />
                                        <h1 className="left-[12px] top-[3px] absolute text-white text-xl font-bold font-heading uppercase">{station?.State}</h1>
                                    </div>
                                    <img className="w-44 h-44 left-[212px] top-[35px] absolute" src={chargingStationSVG} />
                                </div>


                                {/* <div className="flex flex-col mr-3">
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
                                </div> */}
                            </div>
                            {/* <div className="w-80 h-60 relative mt-10">
                                <div className="w-96 h-60 left-0 top-0 absolute rounded-bl-2xl rounded-tr-2xl bg-sky-400" />
                                <h1 className="left-[11px] top-[51px] absolute text-center text-white text-3xl font-bold font-heading capitalize">{station?.Name}</h1>
                                <h2 className="left-[14px] top-[172px] absolute text-center text-white text-l font-medium font-body">Charge Power: {station?.EVEnergyCharged} kwH</h2>
                                <h2 className="left-[14px] top-[207px] absolute text-center text-white text-l font-medium font-body">Total Charged: {station?.EVTotalEnergyCharged} kwH</h2>
                                <h2 className="left-[14px] top-[137px] absolute text-center text-white text-l font-medium font-body">Power: 22 kw</h2>
                                <div className="w-56 h-9 left-0 top-0 absolute">
                                    <div className="w-56 h-9 left-0 top-0 absolute bg-green-400 rounded-br-2xl" />
                                    <h1 className="left-[12px] top-[3px] absolute text-white text-xl font-bold font-heading uppercase">{station?.State}</h1>
                                </div>
                                <img className="w-44 h-44 left-[212px] top-[35px] absolute" src={chargingStationSVG} />
                            </div> */}

                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Stations;
