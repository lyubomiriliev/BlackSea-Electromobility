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
        <div className="w-full flex-col bg-white py-20 px-4">
            <div className="flex justify-center mb-4 relative mt-5">
                <div className="w-96 h-96 relative bg-sky-400">
                    <img className="w-40 h-52 top-6 right-2 absolute" src={chargingStationSVG} />
                    <h1 className="w-60 left-[0px] top-[50px] absolute text-center text-white text-4xl font-bold font-body capitalize">{newStationData?.Name}</h1>
                    <div className="w-44 h-60 left-[200px] top-[140px] absolute">
                        <img className="w-24 h-32 left-14 top-16 absolute" src={Type2} />
                        <h1 className=" right-[46px] bottom-16 absolute text-center text-white text-l font-bold font-body capitalize">{t('stationDetails.type')}</h1>
                        <h1 className="right-[2px] bottom-[2px] absolute text-center text-white text-sm font-bold font-body capitalize">#3736</h1>
                    </div>
                    <div className="w-60 h-64 left-[15px] bottom-[20px] absolute">
                        <h3 className="left-0 bottom-40 absolute text-white text-l font-light font-body">{t('stationDetails.power')}</h3>
                        <h3 className="left-0 bottom-32 absolute text-white text-l font-light font-body">{t('stationDetails.totalEnergy')} {newStationData?.EVTotalEnergyCharged} kwH</h3>
                        <h3 className="left-0 bottom-24 absolute text-white text-l font-light font-body">{t('stationDetails.charged')} {newStationData?.EVEnergyCharged} kwH</h3>
                        <h3 className="left-0 bottom-16 absolute text-white text-l font-light font-body">{t('stationDetails.chargePower')} {newStationData?.EVChargePower} kw</h3>
                        <h3 className="left-0 bottom-8 absolute text-white text-l font-light font-body">{t('stationDetails.plugState')} {newStationData?.EVPlugState}</h3>
                        <h3 className="left-0 bottom-0 absolute text-white text-l font-light font-body">{t('stationDetails.location')} </h3>
                    </div>
                    <div className="w-56 h-9 left-0 top-0 absolute bg-green-400 rounded-br-2xl" />
                    <div className="left-[14px] top-[4px] absolute text-white text-xl font-bold font-heading uppercase">{newStationData?.State}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex">
                    <button onClick={startChargingButton} className="mx-2 py-2 px-4 rounded bg-primary hover:bg-secondary text-white">Start charging</button>
                    <button className="mx-2 py-2 px-4 rounded bg-primary hover:bg-secondary text-white">Stop charging</button>
                </div>
                <Link to="/stations">
                    <button className="mx-2 py-2 px-4 rounded bg-primary hover:bg-secondary text-white">Back to stations</button>
                </Link>
            </div>
        </div>
    );


};




export default StationsDetails
