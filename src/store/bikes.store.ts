import { create } from 'zustand';
import { allbikes, bikes } from '../utils/constants';

interface BikeStore {
    bikes: Bike[];
    addBike: (bike: Bike) => void;
    removeBike: (id: number) => void;
}

const useBikeStore = create<BikeStore>((set) => ({
    bikes: [...bikes, ...allbikes],
    addBike: (bike) => set((state) => ({ bikes: [...state.bikes, bike] })),
    removeBike: (id: number) => set((state) => ({ bikes: state.bikes.filter(bike => bike.id !== id.toString()) })),
}));

export default useBikeStore;