import { create } from "zustand";
import { allbikes, bikes } from "../utils/constants";

interface BikeStore {
  bikes: Bike[];
  addBike: (bike: Bike) => void;
  removeBike: (id: number) => void;
  updateStock: (id: string, amount: number) => void;
}

const useBikeStore = create<BikeStore>((set) => ({
  bikes: [...bikes, ...allbikes],
  addBike: (bike) => set((state) => ({ bikes: [...state.bikes, bike] })),
  removeBike: (id: number) =>
    set((state) => ({
      bikes: state.bikes.filter((bike) => bike.id !== id.toString()),
    })),
  updateStock: (id, amount) =>
    set((state) => ({
      bikes: state.bikes.map((bike) =>
        bike.id === id
          ? { ...bike, stock: Math.max(bike.stock + amount, 0) }
          : bike
      ),
    })),
}));

export default useBikeStore;
