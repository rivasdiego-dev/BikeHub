import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import useShoppingCartStore from '../../../store/shopping-cart.store';
import { useAuthStore } from '../../../store/auth.store';
import { useOrderStore } from '../../../store/order.store';
import { toast } from 'sonner';

type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal';

interface CheckoutForm {
    // Shipping Info
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    // Payment Info
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { items, getTotalPrice, clearCart } = useShoppingCartStore();
    const { currentUser } = useAuthStore();
    const { createOrder } = useOrderStore();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('credit_card');
    const [formData, setFormData] = useState<CheckoutForm>({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });

    const subtotal = getTotalPrice();
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + shippingCost;

    // Validar que haya items en el carrito
    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Formateo específico para campos de tarjeta
        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        if (name === 'expiryDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .slice(0, 5);
        }
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validaciones básicas
            if (!formData.fullName || !formData.email || !formData.street) {
                throw new Error('Por favor completa todos los campos requeridos');
            }

            // Crear la orden
            const orderData = {
                userId: currentUser?.id || 'guest',
                items: items.map(item => ({
                    bike: item,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                    priceAtPurchase: item.price
                })),
                shippingAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: selectedPayment,
            };

            const orderId = await createOrder(orderData);

            // Limpiar carrito
            clearCart();

            // Mostrar éxito y redirigir
            toast.success('¡Orden creada exitosamente!');
            navigate(`/orders/${orderId}`);

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error al procesar la orden');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna de información */}
                <div className="space-y-6">
                    {/* Información de envío */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Truck size={20} />
                                Información de Envío
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Nombre completo</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Teléfono</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Dirección</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Ciudad</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Estado</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Código Postal</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">País</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información de pago */}
                    <div className="card bg-base-200">
                        <div className="card-body">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <CreditCard size={20} />
                                Información de Pago
                            </h2>

                            {/* Método de pago */}
                            <div className="flex gap-4 mb-4">
                                <button
                                    type="button"
                                    className={`btn flex-1 ${selectedPayment === 'credit_card' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedPayment('credit_card')}
                                >
                                    Crédito
                                </button>
                                <button
                                    type="button"
                                    className={`btn flex-1 ${selectedPayment === 'debit_card' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedPayment('debit_card')}
                                >
                                    Débito
                                </button>
                                <button
                                    type="button"
                                    className={`btn flex-1 ${selectedPayment === 'paypal' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setSelectedPayment('paypal')}
                                >
                                    PayPal
                                </button>
                            </div>

                            {/* Campos de tarjeta */}
                            {(selectedPayment === 'credit_card' || selectedPayment === 'debit_card') && (
                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Número de tarjeta</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Nombre en la tarjeta</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Fecha de expiración</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="input input-bordered"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">CVV</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="input input-bordered"
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Columna de resumen */}
                <div>
                    <div className="card bg-base-200 sticky top-4">
                        <div className="card-body">
                            <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

                            {/* Lista de productos */}
                            <div className="space-y-4 mb-4">
                                {items.map((item) => (
                                    <div
                                        key={`${item.id}-${item.selectedSize}`}
                                        className="flex justify-between items-center"
                                    >
                                        <div className="flex gap-2">
                                            <img
                                                src={item.image}
                                                alt={`${item.brand} ${item.model}`}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {item.brand} {item.model}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Talla: {item.selectedSize} · Cantidad: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-medium">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totales */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span>
                                        {shippingCost === 0 ? 'Gratis' : `$${shippingCost}`}
                                    </span>
                                </div>
                                <div className="divider my-2"></div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Seguridad */}
                            <div className="alert mt-4">
                                <ShieldCheck />
                                <span>Pago seguro con cifrado SSL</span>
                            </div>

                            {/* Botón de pago */}
                            <button
                                type="submit"
                                className={`btn btn-primary w-full mt-4 ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Procesando...'
                                    : `Pagar $${total.toLocaleString()}`
                                }
                            </button>

                            {/* Información adicional */}
                            <div className="text-sm text-gray-500 mt-4 space-y-2">
                                <p>
                                    Al realizar tu compra, aceptas nuestros{' '}
                                    <a href="/terms" className="link link-primary">
                                        términos y condiciones
                                    </a>
                                </p>
                                <div className="flex items-center gap-2 text-success">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Pago seguro con cifrado SSL</span>
                                </div>
                                {selectedPayment !== 'paypal' && (
                                    <div className="flex flex-wrap gap-8">
                                        <img
                                            src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_card_visa-512.png"
                                            alt="Visa"
                                            className="h-16"
                                        />
                                        <img
                                            src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png"
                                            alt="Mastercard"
                                            className="h-16"
                                        />
                                        <img
                                            src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_american_express_card-512.png"
                                            alt="American Express"
                                            className="h-16"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;