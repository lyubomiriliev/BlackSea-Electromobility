import { useEffect, useRef, useState } from "react"
import { chargingStationSVG } from "../assets"
import { useTranslation } from 'react-i18next';
import { useStationStore } from "../store/useStationStore";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Stations = () => {

    const { t } = useTranslation();


    const { setStationData } = useStationStore();


    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2 } = useStationStore();
    const isLoading = !stationByala1 && !stationByala2 && !stationPrimorsko1 && !stationPrimorsko2;


    const [inputs, setInputs] = useState({
        search: ""
    })

    const [isSearchFocused, setSearchFocused] = useState(false);

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const storedStationData = localStorage.getItem('stationData');

        if (storedStationData) {
            const parsedStationData = JSON.parse(storedStationData);
            setStationData(parsedStationData);
        }
    }, [])


    const filteredStations = inputs.search
        ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2].filter(station => station && new RegExp(inputs.search, 'i').test(station.Name))
        : [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2].filter(station => station);

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-10 relative">

            </div>
            <div className="xl:w-1/3 mx-auto md:w-2/3 relative flex">
                <FaSearch className=" mt-3 text-primary scale-150" />
                <input
                    className="input-field border bg-white border-gray-300 rounded-md mb-5 ml-3 px-4 py-2 w-full focus:outline-none focus:border-primary"
                    type="search"
                    name="search"
                    value={inputs.search}
                    onChange={handleInputChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
                <label
                    className={`absolute left-10 -mt-3 transition-all ml-3 duration-300 ${isSearchFocused || inputs.search ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-0 -mt-3 translate-y-5 text-gray-400'
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
                        <Link key={station.Name} to={`/station-details/${station.Name}`} className=" hover:opacity-70">
                            <div className="bg-gray-100 rounded-md p-6 flex justify-center items-center">
                                <div className="flex flex-col mr-3">
                                    <h2 className="text-l font-bold text-gray-800">{station.Name}</h2>
                                    <p className="text-l font-bold text-green-500">{station.State}</p>
                                </div>
                                <div className="flex flex-col ml-5">
                                    <p className="text-sm text-gray-600 mb-2">{t('stations.charge')} {station.EVEnergyCharged}kwH</p>
                                    <p className="text-sm text-gray-600">{t('stations.power')}</p>
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
