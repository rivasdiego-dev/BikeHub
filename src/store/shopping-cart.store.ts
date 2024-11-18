import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Bike = {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    image: string;
    description: string;
    stock: number;
}

interface CartBike extends Bike {
    quantity: number;
    selectedSize?: string; // Opcional: si quieres manejar tallas
}

interface ShoppingCartState {
    items: CartBike[];
    addItem: (bike: Bike, quantity: number, size?: string) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const useShoppingCartStore = create<ShoppingCartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (bike, quantity, size) =>
                set((state) => {
                    // Verificar si la bicicleta ya existe en el carrito
                    const existingItem = state.items.find(
                        (item) => item.id === bike.id && item.selectedSize === size
                    );

                    // Verificar stock disponible
                    const newQuantity = existingItem
                        ? existingItem.quantity + quantity
                        : quantity;

                    if (newQuantity > bike.stock) {
                        // Podrías manejar este caso con una notificación al usuario
                        console.warn('No hay suficiente stock disponible');
                        return state;
                    }

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === bike.id && item.selectedSize === size
                                    ? { ...item, quantity: newQuantity }
                                    : item
                            ),
                        };
                    }

                    // Añadir nueva bicicleta al carrito
                    return {
                        items: [
                            ...state.items,
                            {
                                ...bike,
                                quantity,
                                selectedSize: size,
                            },
                        ],
                    };
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.id === id) {
                            // Verificar que la nueva cantidad no exceda el stock
                            if (quantity > item.stock) {
                                console.warn('No hay suficiente stock disponible');
                                return item;
                            }
                            return { ...item, quantity };
                        }
                        return item;
                    }),
                })),

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                const state = get();
                return state.items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                const state = get();
                return state.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'shopping-cart', // nombre para localStorage
        }
    )
);

export default useShoppingCartStore;