import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderState {
    orders: Order[];
    createOrder: (orderData: CreateOrderDTO) => string;
    getOrder: (id: string) => Order | undefined;
    getUserOrders: (userId: string) => Order[];
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    cancelOrder: (orderId: string) => void;
    getRecentOrders: (limit?: number) => Order[];
    getTotalRevenue: () => number;
    getOrdersByStatus: (status: Order['status']) => Order[];
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [
                // Orden de ejemplo
                {
                    id: 'order-1',
                    userId: 'user-1',
                    items: [
                        {
                            bike: {
                                id: 'b1',
                                brand: 'Trek',
                                model: 'Fuel EX 9.8',
                                year: 2024,
                                price: 6999.99,
                                image: 'https://example.com/bike1.jpg',
                                description: 'High-performance mountain bike',
                                stock: 5
                            },
                            quantity: 1,
                            selectedSize: 'M',
                            priceAtPurchase: 6999.99
                        }
                    ],
                    status: 'delivered',
                    totalAmount: 6999.99,
                    shippingAddress: {
                        street: '123 Main St',
                        city: 'Biketown',
                        state: 'BK',
                        zipCode: '12345',
                        country: 'USA'
                    },
                    paymentMethod: 'credit_card',
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-03T00:00:00.000Z'
                }
            ],

            createOrder: (orderData) => {
                const orderId = `order-${Math.random().toString(36).substr(2, 9)}`;
                const newOrder: Order = {
                    id: orderId,
                    ...orderData,
                    status: 'pending',
                    totalAmount: orderData.items.reduce(
                        (total, item) => total + (item.priceAtPurchase * item.quantity),
                        0
                    ),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                set((state) => ({
                    orders: [...state.orders, newOrder],
                }));

                return orderId;
            },

            getOrder: (id) => {
                return get().orders.find((order) => order.id === id);
            },

            getUserOrders: (userId) => {
                return get().orders.filter((order) => order.userId === userId);
            },

            updateOrderStatus: (orderId, status) => {
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === orderId
                            ? {
                                ...order,
                                status,
                                updatedAt: new Date().toISOString(),
                            }
                            : order
                    ),
                }));
            },

            cancelOrder: (orderId) => {
                const order = get().getOrder(orderId);
                if (order && order.status === 'pending') {
                    get().updateOrderStatus(orderId, 'cancelled');
                }
            },

            getRecentOrders: (limit = 10) => {
                return [...get().orders]
                    .sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .slice(0, limit);
            },

            getTotalRevenue: () => {
                return get().orders
                    .filter(order => order.status !== 'cancelled')
                    .reduce((total, order) => total + order.totalAmount, 0);
            },

            getOrdersByStatus: (status) => {
                return get().orders.filter((order) => order.status === status);
            },
        }),
        {
            name: 'order-store',
        }
    )
);