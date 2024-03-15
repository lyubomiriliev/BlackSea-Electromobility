import { chargingStation, chargingStationSVG } from "../assets"

const Stations = () => {
    return (
        <div className="w-full bg-white py-20 px-4">
            <div className=" max-w-screen-xl mx-auto grid md:grid-cols-2 bg-red-100">
                <div>
                    <h1 className="text-2xl font-bold">Зарядни Станции</h1>
                    <div className="mt-6">
                        <div>
                            <div className="w-full border-[2px] rounded-md mx-auto flex gap-10 bg-red-200">
                                <img className="w-20" src={chargingStationSVG} alt="stationIcon" />
                                <h2>Бяла 1</h2>
                                <p>Свободна</p>
                                <p>Мощност: 22kw</p>
                                <p>#3736</p>
                            </div>
                            <div className="w-full rounded-md mx-auto flex gap-10 bg-red-200">
                                <img className="w-20" src={chargingStationSVG} alt="stationIcon" />
                                <h2>Бяла 2</h2>
                                <p>Заета</p>
                                <p>Мощност: 22kw</p>
                                <p>#2946</p>
                            </div>
                            <div className="w-full rounded-md mx-auto flex gap-10 bg-red-200">
                                <img className="w-20" src={chargingStationSVG} alt="stationIcon" />
                                <h2>Приморско 1</h2>
                                <p>Свободна</p>
                                <p>Мощност: 22kw</p>
                                <p>#3805</p>

                            </div>
                            <div className="w-full rounded-md mx-auto flex gap-10 bg-red-200">
                                <img className="w-20" src={chargingStationSVG} alt="stationIcon" />
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
