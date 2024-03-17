const Map = () => {

    return (
        <div className="max-w-screen-2xl  mx-auto py-20">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="w-full h-full mx-auto">
                    <h1 className="text-2xl font-bold text-center mt-5 mb-5">Карта на зарядните станции</h1>
                    <div className="overflow-hidden bg-gray-200 rounded-lg">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full object-cover"
                                src="https://www.google.com/maps/d/u/1/embed?mid=147Etk3f3S7kgZ22_iRuCEuJi9Rb-ueM&ehbc=2E312F&noprof=1"
                                height="550"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map
