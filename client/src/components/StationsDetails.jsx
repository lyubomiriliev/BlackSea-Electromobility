import { useTranslation } from "react-i18next";
import { stationImage, Type2 } from "../assets";
import { useStationStore } from "../store/useStationStore";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { FaChargingStation } from "react-icons/fa6";
import { FaDirections } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { stationsMarkers } from "../constants/constants";


const StationsDetails = () => {

    const { t } = useTranslation();
    const { setStationData } = useStationStore();
    const { name } = useParams()
    const [newStationData, setNewStationData] = useState(null);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        const storedStationData = localStorage.getItem('stationData');
        if (storedStationData) {
            const parsedStationData = JSON.parse(storedStationData);
            if (parsedStationData[name]) {
                setNewStationData(parsedStationData[name]);
                const stationNameWithoutNumber = parsedStationData[name].Name.replace(/\d+/g, '').trim();
                const foundStation = stationsMarkers.find(station => station.name.includes(stationNameWithoutNumber))
            if (foundStation) {
                setSelectedStation(foundStation);
            }
            }
        } else {
            const foundStation = Object.values(stations).find(station => station.Name === decodeURIComponent(name));
            if (foundStation) {
                setStationData(foundStation);
                localStorage.setItem('stationData', JSON.stringify({ [foundStation.Name]: foundStation }));
            }
        }

    }, [name]);

    const handleOpenDirections = () => {
        if(selectedStation) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedStation.lat},${selectedStation.lng}`, "_blank")
        }
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

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-20 md:py-24 px-4">
          {/* Station name and type */}
            <div className="flex w-full justify-between items-center py-5">
                <div>
                <Link to="/stations">
                    <IoChevronBack className="text-3xl" />
                </Link>
                </div>
                <h1 className="font-bold text-3xl mt-2 md:text-4xl uppercase">{newStationData?.Name}</h1>
                <div className="flex flex-col items-center gap-2">

                </div>
            </div>

          {/* Hero section with info and image */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10">
            {/* Left side: station info */}
            <div className="w-full bg-gray md:w-96 p-6 rounded-lg text-center md:text-left">
              <h3 className="font-semibold text-2xl mb-4">{t('stationDetails.details')}</h3>
              <ul className="space-y-2 md:text-xl">
                <li>{t('stationDetails.power')}</li>
                <li>{t('stationDetails.totalEnergy')} {newStationData?.EVTotalEnergyCharged} kWh</li>
                <li>{t('stationDetails.charged')} {newStationData?.EVEnergyCharged} kWh</li>
                <li>{t('stationDetails.chargePower')} {newStationData?.EVChargePower} kW</li>
                <li>{t('stationDetails.plugState')} {newStationData?.EVPlugState}</li>
              </ul>
            </div>
    
            {/* Right side: station image */}
            <div className="w-full md:w-1/2">
              <img src={stationImage} alt="Charging Station" className="w-full h-auto" />
            </div>
            
          </div>
    
          {/* Buttons section */}
          <div className="w-[80%] md:w-[20%] flex flex-col justify-center items-center gap-4 mb-5">
            <div className="w-full flex justify-center items-center gap-8">
                <button onClick={startChargingButton} className="py-2 px-8 bg-primary hover:bg-secondary text-white duration-300 rounded-lg shadow flex items-center gap-2 w-full justify-center">
                {t('stationDetails.startCharging')}
                <FaChargingStation className="text-white" />
                </button>
                <button className="py-2 px-8 bg-primary hover:bg-secondary text-white duration-300 rounded-lg shadow flex items-center gap-2 w-full justify-center">
                {t('stationDetails.stopCharging')}
                <FaChargingStation className="text-white" />
                </button>
            </div>
            <div className="w-full flex justify-center items-center mx-auto">
                <button onClick={handleOpenDirections} className="py-2 px-8 bg-primary hover:bg-secondary text-white duration-300 rounded-lg shadow flex items-center gap-2 w-full justify-center">
                {t('map.getDirections')}
                <FaDirections className="text-white" />
                </button>
            </div>
          </div>
        </div>
      );
    };




export default StationsDetails
