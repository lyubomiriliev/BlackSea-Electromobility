import { useEffect, useState } from "react"

const ChargingStations = () => {

    const [stationData, setStationData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [chargerData, setChargerData] = useState(null);

    useEffect(() => {
        const fetchStationData = async () => {
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
                setStationData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStationData();


        // const fetchTeamData = async () => {
        //     const options = { method: 'GET', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTkyMzc4MS04MjE1LTQwYjMtOGU3ZS04ZmI2YjNlZTA1MTUiLCJqdGkiOiJmNzFkZWZlZTFiYzdkYjRmMjM4ODMzMzllMTUwNzViODQxZDA5YzJiMmM3ZGRiMjVjMjlkNjg3ZjU3MTZmZWUxZWY4MmMwZWU2ZDQ0ZmM4OCIsImlhdCI6MTcxNDUwMDU2Ny45NDU2MjYsIm5iZiI6MTcxNDUwMDU2Ny45NDU2MjgsImV4cCI6MTc0NjAzNjU2Ny45Mzk0NTEsInN1YiI6IjE1ODgiLCJzY29wZXMiOltdfQ.TRGG8G86Z-mH3qnaIHey5r2nBfOksMbnRvVhH1k2QZpwiDXXf25Jj-XAEKAQPM6uUR8arKfzP8Q0pt-XFAJJWYDxbYDG4krigaRHiFvPPu97mykCaS4UnIZfx0NEb4Pjq37L4JftrabPIIcYs9PzwQTfJf57CDqPrMPavHkAFJzYeum4HGmQn26P18FJKU_vxSSA5MI4lEXMNnC7OVZ7J-_7KxBis2dsk3P5SD4j09DIcRywU25_AOH6vfSNOGLHCUAJy_ieBFpVapjOxX5SKXYAq7KD54Sshy2GybtLGYOgWF1Rn7KsP75bixw6mK8iJ0k_7Zyt-RAZX3WXMHjeoDGBcSrVHmJldvneSrY4WajdDBV_I0fJTapFfXIVOxnY3k_eWfLj_NUyUdPr75k4K39r_PPRaQgVbYy7L6LC5Iwtr7S_96SaCp5UjkU1ZEqpAkLLQvzcGzTve_i-AqZxhQxQKqx4RZsAVk7LdINEUAzJVEv-zEIn7F9eu8ZNxXfFyX-y4b6y7Zf_0dl1PY7WIdAXoLzfAgDiZn5H7s2evlpriDMD1m58v0CTpg8__pwBtMYmDwuOXveYyLT2B-BJ6AvBkGWN_OLNIdXICFEQ3aBIhcV_MpkIsnbrHZD7vdAtkwOY29Ydq1geQrcNqQ-oikkGY0_nZpLLeoJBvt6HYQ8' } };

        //     fetch('https://cloud.volttime.com/api/v2/teams', options)
        //         .then(response => response.json())
        //         .then(response => console.log(response))
        //         .catch(err => console.error(err));
        //     setTeamData(response)
        // }

        // fetchTeamData()

        // const fetchGetCharger = async () => {

        //     const options = { method: 'GET', headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YTkyMzc4MS04MjE1LTQwYjMtOGU3ZS04ZmI2YjNlZTA1MTUiLCJqdGkiOiJmNzFkZWZlZTFiYzdkYjRmMjM4ODMzMzllMTUwNzViODQxZDA5YzJiMmM3ZGRiMjVjMjlkNjg3ZjU3MTZmZWUxZWY4MmMwZWU2ZDQ0ZmM4OCIsImlhdCI6MTcxNDUwMDU2Ny45NDU2MjYsIm5iZiI6MTcxNDUwMDU2Ny45NDU2MjgsImV4cCI6MTc0NjAzNjU2Ny45Mzk0NTEsInN1YiI6IjE1ODgiLCJzY29wZXMiOltdfQ.TRGG8G86Z-mH3qnaIHey5r2nBfOksMbnRvVhH1k2QZpwiDXXf25Jj-XAEKAQPM6uUR8arKfzP8Q0pt-XFAJJWYDxbYDG4krigaRHiFvPPu97mykCaS4UnIZfx0NEb4Pjq37L4JftrabPIIcYs9PzwQTfJf57CDqPrMPavHkAFJzYeum4HGmQn26P18FJKU_vxSSA5MI4lEXMNnC7OVZ7J-_7KxBis2dsk3P5SD4j09DIcRywU25_AOH6vfSNOGLHCUAJy_ieBFpVapjOxX5SKXYAq7KD54Sshy2GybtLGYOgWF1Rn7KsP75bixw6mK8iJ0k_7Zyt-RAZX3WXMHjeoDGBcSrVHmJldvneSrY4WajdDBV_I0fJTapFfXIVOxnY3k_eWfLj_NUyUdPr75k4K39r_PPRaQgVbYy7L6LC5Iwtr7S_96SaCp5UjkU1ZEqpAkLLQvzcGzTve_i-AqZxhQxQKqx4RZsAVk7LdINEUAzJVEv-zEIn7F9eu8ZNxXfFyX-y4b6y7Zf_0dl1PY7WIdAXoLzfAgDiZn5H7s2evlpriDMD1m58v0CTpg8__pwBtMYmDwuOXveYyLT2B-BJ6AvBkGWN_OLNIdXICFEQ3aBIhcV_MpkIsnbrHZD7vdAtkwOY29Ydq1geQrcNqQ-oikkGY0_nZpLLeoJBvt6HYQ8' } };

        //     fetch('https://cloud.volttime.com/api/v2/teams/35232175/chargers', options)
        //         .then(response => response.json())
        //         .then(response => console.log(response))
        //         .catch(err => console.error(err));
        //     setChargerData(response)

        // }

        // fetchGetCharger()
    }, []);

    console.log(stationData)


    return (

        <div>
            <h1 className="w-full flex justify-center mt-5">Charging Station Information</h1>
            {stationData && (
                <div className="mb-10 flex gap-10 justify-center w-full">
                    <p>Charger ID: {stationData.data.id}</p>
                    <p>Status: {stationData.data.status}</p>
                </div>
            )}
        </div>
    )
}

export default ChargingStations
