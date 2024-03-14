import { chargingStation } from "../assets"

const Stations = () => {
    return (
        <div className="max-w-screen-2xl mx-auto py-20 flex">
            <div className="pr-10">
                <div className="w-full">
                    <h1 className="text-2xl font-bold">Зарядни Станции</h1>
                    <div className="mt-6">
                        <div >
                            <div className="w-full border-[2px] rounded-md">
                                <img className="h-10 w-10" src={chargingStation} alt="stationIcon" />
                                <h2>Бяла 1</h2>
                                <p>Свободна</p>
                                <p>Мощност: 22kw</p>
                                <p>#3736</p>
                            </div>
                            <div className="w-full h-auto border-[2px] mt-3">
                                <img className="h-10 w-10" src={chargingStation} alt="stationIcon" />
                                <h2>Бяла 2</h2>
                                <p>Заета</p>
                                <p>Мощност: 22kw</p>
                                <p>#2946</p>
                            </div>
                            <div className="w-full h-auto border-[2px] mt-3">
                                <img className="h-10 w-10" src={chargingStation} alt="stationIcon" />
                                <h2>Приморско 1</h2>
                                <p>Свободна</p>
                                <p>Мощност: 22kw</p>
                                <p>#3805</p>

                            </div>
                            <div className="w-full h-auto border-[2px] mt-3">
                                <img className="h-10 w-10" src={chargingStation} alt="stationIcon" />
                                <h2>Приморско 2</h2>
                                <p>Свободна</p>
                                <p>Мощност: 22kw</p>
                                <p>#4380</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Stations
