import { chargingStation, chargingStationSVG } from "../assets"

const Stations = () => {
    return (
        <div className="w-full bg-white py-40 px-4">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                    <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                    <h2 className="text-xl font-bold mb-2">Бяла 1</h2>
                    <p className="text-xl font-bold text-green-500 mb-2">Свободна</p>
                    <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                    <p className="text-sm text-gray-600 absolute bottom-3 right-3">#3736</p>
                </div>
                <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                    <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                    <h2 className="text-xl font-bold mb-2">Бяла 2</h2>
                    <p className="text-xl font-bold text-green-500 mb-2">Свободна</p>
                    <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                    <p className="text-sm text-gray-600 absolute bottom-3 right-3">#2946</p>
                </div>
                <div className="bg-gray-100 rounded-md p-6 relative flex flex-col justify-center items-center">
                    <img className="w-2/3 h-auto mb-4" src={chargingStationSVG} alt="stationIcon" />
                    <h2 className="text-xl font-bold mb-2">Приморско 1</h2>
                    <p className="text-xl font-bold text-red-500 mb-2">Заета</p>
                    <p className="text-sm text-gray-600 mb-2">Мощност: 22kw</p>
                    <p className="text-sm text-gray-600 absolute bottom-3 right-3">#3805</p>
                </div>
            </div>
        </div>
    )
}

export default Stations
