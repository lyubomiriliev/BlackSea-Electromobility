import create from "zustand";

export const useStationStore = create((set) => ({
  stationByala1: null,
  stationByala2: null,
  stationPrimorsko1: null,
  stationPrimorsko2: null,
  setStationData: (data) => set(data),
}));
