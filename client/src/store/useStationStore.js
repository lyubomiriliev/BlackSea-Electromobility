import create from "zustand";

export const useStationStore = create((set) => ({
  stationByala1: {
    stationCode: 3736,
    Name: "Бяла 1",
    State: "",
    EVEnergyCharged: "",
    EVTotalEnergyCharged: "",
  },
  stationByala2: {
    stationCode: 2946,
    Name: "Бяла 2",
    State: "",
    EVEnergyCharged: "",
    EVTotalEnergyCharged: "",
  },
  stationPrimorsko1: {
    stationCode: 3805,
    Name: "Приморско 1",
    State: "",
    EVEnergyCharged: "",
    EVTotalEnergyCharged: "",
  },
  stationPrimorsko2: {
    stationCode: 4380,
    Name: "Приморско 2",
    State: "",
    EVEnergyCharged: "",
    EVTotalEnergyCharged: "",
  },
  setStationData: (data) => {
    set((state) => ({
      ...state,
      stationByala1: {
        ...state.stationByala1,
        State: data["Бяла 1"].State,
        EVEnergyCharged: data["Бяла 1"].EVEnergyCharged,
        EVTotalEnergyCharged: data["Бяла 1"].EVTotalEnergyCharged,
      },
      stationByala2: {
        ...state.stationByala2,
        State: data["Бяла 2"].State,
        EVEnergyCharged: data["Бяла 2"].EVEnergyCharged,
        EVTotalEnergyCharged: data["Бяла 2"].EVTotalEnergyCharged,
      },
      stationPrimorsko1: {
        ...state.stationPrimorsko1,
        State: data["Приморско 1"].State,
        EVEnergyCharged: data["Приморско 1"].EVEnergyCharged,
        EVTotalEnergyCharged: data["Приморско 1"].EVTotalEnergyCharged,
      },
      stationPrimorsko2: {
        ...state.stationPrimorsko2,
        State: data["Приморско 2"].State,
        EVEnergyCharged: data["Приморско 2"].EVEnergyCharged,
        EVTotalEnergyCharged: data["Приморско 2"].EVTotalEnergyCharged,
      },
    }));
  },
}));
