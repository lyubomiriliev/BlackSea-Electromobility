import { useEffect, useRef, useState } from "react"
import { chargingStationSVG } from "../assets"
import { useTranslation } from 'react-i18next';
import { useStationStore } from "../store/useStationStore";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchDataForAllStations } from "../utils/api";


const Stations = () => {

    const { t } = useTranslation();

    const { stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, setStationData, stationDalgopol1, stationDalgopol2, stationDolniChiflik1, stationDolniChiflik2, stationKavarna1, stationKavarna2, stationNesebar } = useStationStore();
    const [inputs, setInputs] = useState({ search: "" })
    const [isSearchFocused, setSearchFocused] = useState(false);

    const [newStationData, setNewStationData] = useState(null);

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



    const MINUTE_MS = 6000000;

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
                    "Дългопол 1": { ...stationDalgopol1, Name: "Дългопол 1" },
                    "Дългопол 2": { ...stationDalgopol2, Name: "Дългопол 2" },
                    "Долни Чифлик 1": { ...stationDolniChiflik1, Name: "Долни Чифлик 1" },
                    "Долни Чифлик 2": { ...stationDolniChiflik2, Name: "Долни Чифлик 2" },
                    "Каварна 1": { ...stationKavarna1, Name: "Каварна 1" },
                    "Каварна 2": { ...stationKavarna2, Name: "Каварна 2" },
                    "Несебър": { ...stationNesebar, Name: "Несебър" },
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

        const fetchNewStation = async () => {
            try {
                const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTkyMzc4MS04MjE1LTQwYjMtOGU3ZS04ZmI2YjNlZTA1MTUiLCJqdGkiOiJmNzFkZWZlZTFiYzdkYjRmMjM4ODMzMzllMTUwNzViODQxZDA5YzJiMmM3ZGRiMjVjMjlkNjg3ZjU3MTZmZWUxZWY4MmMwZWU2ZDQ0ZmM4OCIsImlhdCI6MTcxNDUwMDU2Ny45NDU2MjYsIm5iZiI6MTcxNDUwMDU2Ny45NDU2MjgsImV4cCI6MTc0NjAzNjU2Ny45Mzk0NTEsInN1YiI6IjE1ODgiLCJzY29wZXMiOltdfQ.TRGG8G86Z-mH3qnaIHey5r2nBfOksMbnRvVhH1k2QZpwiDXXf25Jj-XAEKAQPM6uUR8arKfzP8Q0pt-XFAJJWYDxbYDG4krigaRHiFvPPu97mykCaS4UnIZfx0NEb4Pjq37L4JftrabPIIcYs9PzwQTfJf57CDqPrMPavHkAFJzYeum4HGmQn26P18FJKU_vxSSA5MI4lEXMNnC7OVZ7J-_7KxBis2dsk3P5SD4j09DIcRywU25_AOH6vfSNOGLHCUAJy_ieBFpVapjOxX5SKXYAq7KD54Sshy2GybtLGYOgWF1Rn7KsP75bixw6mK8iJ0k_7Zyt-RAZX3WXMHjeoDGBcSrVHmJldvneSrY4WajdDBV_I0fJTapFfXIVOxnY3k_eWfLj_NUyUdPr75k4K39r_PPRaQgVbYy7L6LC5Iwtr7S_96SaCp5UjkU1ZEqpAkLLQvzcGzTve_i-AqZxhQxQKqx4RZsAVk7LdINEUAzJVEv-zEIn7F9eu8ZNxXfFyX-y4b6y7Zf_0dl1PY7WIdAXoLzfAgDiZn5H7s2evlpriDMD1m58v0CTpg8__pwBtMYmDwuOXveYyLT2B-BJ6AvBkGWN_OLNIdXICFEQ3aBIhcV_MpkIsnbrHZD7vdAtkwOY29Ydq1geQrcNqQ-oikkGY0_nZpLLeoJBvt6HYQ8";
                const teamId = "35232175";
                const chargerId = "52805940";
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token} `
                    }
                };

                const response = await fetch(`https://cloud.volttime.com/api/v2/teams/${teamId}/chargers/${chargerId}`, options);
                const data = await response.json();

                setNewStationData(data)

            } catch (error) {
                console.error(error);
            }
        };

        fetchNewStation();

        const interval = setInterval(fetchDataForStations, MINUTE_MS);

        return () => clearInterval(interval);
    }, [setStationData]);

    console.log(newStationData)

    const stationIdToName = {
        "52805940": "Несебър"
    }


    const startChargingButton = async () => {

        try {

            const options = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTkyMzc4MS04MjE1LTQwYjMtOGU3ZS04ZmI2YjNlZTA1MTUiLCJqdGkiOiJmNzFkZWZlZTFiYzdkYjRmMjM4ODMzMzllMTUwNzViODQxZDA5YzJiMmM3ZGRiMjVjMjlkNjg3ZjU3MTZmZWUxZWY4MmMwZWU2ZDQ0ZmM4OCIsImlhdCI6MTcxNDUwMDU2Ny45NDU2MjYsIm5iZiI6MTcxNDUwMDU2Ny45NDU2MjgsImV4cCI6MTc0NjAzNjU2Ny45Mzk0NTEsInN1YiI6IjE1ODgiLCJzY29wZXMiOltdfQ.TRGG8G86Z-mH3qnaIHey5r2nBfOksMbnRvVhH1k2QZpwiDXXf25Jj-XAEKAQPM6uUR8arKfzP8Q0pt-XFAJJWYDxbYDG4krigaRHiFvPPu97mykCaS4UnIZfx0NEb4Pjq37L4JftrabPIIcYs9PzwQTfJf57CDqPrMPavHkAFJzYeum4HGmQn26P18FJKU_vxSSA5MI4lEXMNnC7OVZ7J-_7KxBis2dsk3P5SD4j09DIcRywU25_AOH6vfSNOGLHCUAJy_ieBFpVapjOxX5SKXYAq7KD54Sshy2GybtLGYOgWF1Rn7KsP75bixw6mK8iJ0k_7Zyt-RAZX3WXMHjeoDGBcSrVHmJldvneSrY4WajdDBV_I0fJTapFfXIVOxnY3k_eWfLj_NUyUdPr75k4K39r_PPRaQgVbYy7L6LC5Iwtr7S_96SaCp5UjkU1ZEqpAkLLQvzcGzTve_i-AqZxhQxQKqx4RZsAVk7LdINEUAzJVEv-zEIn7F9eu8ZNxXfFyX-y4b6y7Zf_0dl1PY7WIdAXoLzfAgDiZn5H7s2evlpriDMD1m58v0CTpg8__pwBtMYmDwuOXveYyLT2B-BJ6AvBkGWN_OLNIdXICFEQ3aBIhcV_MpkIsnbrHZD7vdAtkwOY29Ydq1geQrcNqQ-oikkGY0_nZpLLeoJBvt6HYQ8',
                    'Content-Type': 'application/json'
                },
                body: '{"connector_id":1,"id_tag":"Несебър 1"}'
            };

            const response = await fetch('https://cloud.volttime.com/api/v2/teams/35232175/chargers/52805940/commands/start', options)
            if (!response.ok) {
                throw new Error("Failed to start charging");
            }
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Error starting charging", error);
        }


    }

    const stopChargingButton = async () => {

        try {

            const options = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTkyMzc4MS04MjE1LTQwYjMtOGU3ZS04ZmI2YjNlZTA1MTUiLCJqdGkiOiJmNzFkZWZlZTFiYzdkYjRmMjM4ODMzMzllMTUwNzViODQxZDA5YzJiMmM3ZGRiMjVjMjlkNjg3ZjU3MTZmZWUxZWY4MmMwZWU2ZDQ0ZmM4OCIsImlhdCI6MTcxNDUwMDU2Ny45NDU2MjYsIm5iZiI6MTcxNDUwMDU2Ny45NDU2MjgsImV4cCI6MTc0NjAzNjU2Ny45Mzk0NTEsInN1YiI6IjE1ODgiLCJzY29wZXMiOltdfQ.TRGG8G86Z-mH3qnaIHey5r2nBfOksMbnRvVhH1k2QZpwiDXXf25Jj-XAEKAQPM6uUR8arKfzP8Q0pt-XFAJJWYDxbYDG4krigaRHiFvPPu97mykCaS4UnIZfx0NEb4Pjq37L4JftrabPIIcYs9PzwQTfJf57CDqPrMPavHkAFJzYeum4HGmQn26P18FJKU_vxSSA5MI4lEXMNnC7OVZ7J-_7KxBis2dsk3P5SD4j09DIcRywU25_AOH6vfSNOGLHCUAJy_ieBFpVapjOxX5SKXYAq7KD54Sshy2GybtLGYOgWF1Rn7KsP75bixw6mK8iJ0k_7Zyt-RAZX3WXMHjeoDGBcSrVHmJldvneSrY4WajdDBV_I0fJTapFfXIVOxnY3k_eWfLj_NUyUdPr75k4K39r_PPRaQgVbYy7L6LC5Iwtr7S_96SaCp5UjkU1ZEqpAkLLQvzcGzTve_i-AqZxhQxQKqx4RZsAVk7LdINEUAzJVEv-zEIn7F9eu8ZNxXfFyX-y4b6y7Zf_0dl1PY7WIdAXoLzfAgDiZn5H7s2evlpriDMD1m58v0CTpg8__pwBtMYmDwuOXveYyLT2B-BJ6AvBkGWN_OLNIdXICFEQ3aBIhcV_MpkIsnbrHZD7vdAtkwOY29Ydq1geQrcNqQ-oikkGY0_nZpLLeoJBvt6HYQ8',
                    'Content-Type': 'application/json'
                },
                body: '{"connector_id":1,"id_tag":"Несебър 1"}'
            };

            const response = await fetch('https://cloud.volttime.com/api/v2/teams/35232175/chargers/52805940/commands/start', options)
            if (!response.ok) {
                throw new Error("Failed to start charging");
            }
            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error("Error starting charging", error);
        }


    }

    // const stationNames = {
    //     1710: "Несебър",
    // }

    const chargerName = {
        52805940: "Несебър"
    }

    const chargerStatus = {
        Available: "READY TO CHARGE"
    }

    const connectorStatus = {
        Available: "Свободен",
    }


    const filteredStations = inputs.search
        ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik1, stationDolniChiflik2, stationKavarna1, stationKavarna2, stationNesebar].filter(station => station && new RegExp(inputs.search, 'i').test(station.Name))
        : [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik1, stationDolniChiflik2, stationKavarna1, stationKavarna2, stationNesebar].filter(station => station);

    return (
        <div className="w-full bg-white py-20 px-4">
            <div className="flex justify-center mb-5 relative">
                <h1 className="text-2xl md:text-4xl font-bold font-heading mt-10">{t('stations.title')}</h1>
            </div>
            <div className="xl:w-1/3 mx-auto md:w-2/3 relative flex items-center">
                <FaSearch className="absolute left-4 top-3 text-primary scale-125" />
                <input
                    className="input-field border font-body bg-white border-gray-300 rounded-md mb-5 pl-12 pr-4 py-2 w-full focus:outline-none focus:border-primary shadow-md"
                    type="search"
                    name="search"
                    value={inputs.search}
                    onChange={handleInputChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                />
                <label
                    className={`absolute left-12 bottom-12 font-body -mt-3 transition-all ml-3 duration-300 ${isSearchFocused || inputs.search ? 'top-1 text-sm bg-white px-2 text-primary' : 'left-0 -mt-3 translate-y-5 text-gray-400'
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
                    {(inputs.search === "" ? [stationByala1, stationByala2, stationPrimorsko1, stationPrimorsko2, stationDalgopol1, stationDalgopol2, stationDolniChiflik1, stationDolniChiflik2, stationKavarna1, stationKavarna2] : filteredStations).map(station => (
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
                            </div>
                        </Link>
                    ))}
                    <Link to={`/station-details/${chargerName[newStationData?.data.id]}`} className="hover:opacity-70">
                        <div className="w-96 h-80 mb-20 flex flex-col relative rounded-bl-2xl rounded-tr-2xl bg-sky-400">
                            <h1 className="left-[11px] top-[51px] absolute text-center text-white text-3xl font-bold font-heading capitalize">{chargerName[newStationData?.data.id]}</h1>
                            <h2 className="left-[14px] top-[137px] absolute text-center text-white text-l font-medium font-body">Power: 22 kw</h2>
                            <h2 className="left-[14px] top-[172px] absolute text-center text-white text-l font-medium font-body">Connection Status: {newStationData?.data.connection_status}</h2>
                            <ul className="left-[14px] top-[202px] absolute text-center text-white text-l font-medium font-body">
                                {newStationData?.data.connectors ? (
                                    newStationData?.data.connectors.map((connector) => (
                                        <li className="flex flex-col items-start" key={connector.id}>
                                            Connector: {connector.connector_id}:
                                            <ul>
                                                <li className="mb-4">Status: {connectorStatus[connector.status]}</li>
                                            </ul>
                                        </li>
                                    ))
                                ) : (
                                    <li>No connectors available</li>
                                )}
                            </ul>
                            <div className="w-56 h-9 left-0 top-0 absolute">
                                <div className="w-56 h-9 left-0 top-0 absolute bg-green-400 rounded-br-2xl" />
                                <h1 className="left-[12px] top-[3px] absolute text-white text-xl font-bold font-heading uppercase">{chargerStatus[newStationData?.data.status]}</h1>
                            </div>
                            <img className="w-44 h-44 left-[212px] top-[35px] absolute" src={chargingStationSVG} />
                        </div>
                    </Link>
                </div>
            )}


        </div>
    );
};

export default Stations;
