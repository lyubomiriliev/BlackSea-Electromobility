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
  stationDalgopol1: {
    stationCode: 6129,
    Name: "Дългопол 1",
    State: "Ready to Charge",
    EVEnergyCharged: "2025",
    EVTotalEnergyCharged: "40244",
  },
  stationDalgopol2: {
    stationCode: 6631,
    Name: "Дългопол 2",
    State: "Ready to Charge",
    EVEnergyCharged: "0",
    EVTotalEnergyCharged: "3341",
  },
  stationDolniChiflik: {
    stationCode: 8910,
    Name: "Долни Чифлик",
    State: "Ready to Charge",
    EVEnergyCharged: "0",
    EVTotalEnergyCharged: "20410",
  },
  stationKavarna1: {
    stationCode: 6631,
    Name: "Каварна 1",
    State: "Ready to Charge",
    EVEnergyCharged: "1096",
    EVTotalEnergyCharged: "41800",
  },
  stationKavarna2: {
    stationCode: 6730,
    Name: "Каварна 2",
    State: "Ready to Charge",
    EVEnergyCharged: "1096",
    EVTotalEnergyCharged: "33300",
  },
  stationNesebar1: {
    stationCode: 4441,
    Name: "Несебър 1",
    State: "Ready to Charge",
    EVEnergyCharged: "0",
    EVTotalEnergyCharged: "3670",
  },
  stationNesebar2: {
    stationCode: 4443,
    Name: "Несебър 2",
    State: "Ready to Charge",
    EVEnergyCharged: "0",
    EVTotalEnergyCharged: "10204",
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
