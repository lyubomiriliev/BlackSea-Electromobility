import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user) => set({ user }),
}));

const storedUser = JSON.parse(localStorage.getItem("user-info"));
if (storedUser) {
  useAuthStore.setState({ user: storedUser });
}

export default useAuthStore;
