interface OrderItem {
    bike: Bike;
    quantity: number;
    selectedSize?: string;
    priceAtPurchase: number;
}

interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    totalAmount: number;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: 'credit_card' | 'debit_card' | 'paypal';
    createdAt: string;
    updatedAt: string;
}

interface CreateOrderDTO {
    userId: string;
    items: OrderItem[];
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
}