import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useShoppingCartStore from '../../../store/shopping-cart.store';
import { toast } from 'sonner';

const CartPage = () => {
    const {
        items,
        removeItem,
        updateQuantity,
        getTotalPrice,
        clearCart
    } = useShoppingCartStore();

    const subtotal = getTotalPrice();
    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + shippingCost;

    const handleUpdateQuantity = (itemId: string, newQuantity: number, stock: number) => {
        if (newQuantity > stock) {
            toast.error(`Solo hay ${stock} unidades disponibles`);
            return;
        }
        if (newQuantity < 1) {
            toast.error('La cantidad debe ser mayor a 0');
            return;
        }
        updateQuantity(itemId, newQuantity);
    };

    const handleRemoveItem = (itemId: string) => {
        removeItem(itemId);
        toast.success('Producto eliminado del carrito');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-center">
                    <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                    <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-8">
                        ¿No sabes qué comprar? ¡Miles de productos te esperan!
                    </p>
                    <Link to="/bikes" className="btn btn-primary">
                        Ir a Comprar
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lista de productos */}
                <div className="lg:col-span-2">
                    <div className="bg-base-200 rounded-lg p-6">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.selectedSize}`}
                                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-base-100 rounded-lg mb-4"
                            >
                                {/* Imagen */}
                                <img
                                    src={item.image}
                                    alt={`${item.brand} ${item.model}`}
                                    className="w-24 h-24 object-cover rounded"
                                />

                                {/* Info del producto */}
                                <div className="flex-1">
                                    <h3 className="font-bold">
                                        {item.brand} {item.model}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Talla: {item.selectedSize}
                                    </p>
                                    <p className="text-primary font-semibold">
                                        ${item.price.toLocaleString()}
                                    </p>
                                </div>

                                {/* Controles de cantidad */}
                                <div className="flex items-center gap-2">
                                    <button
                                        className="btn btn-circle btn-sm"
                                        onClick={() => handleUpdateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                            item.stock
                                        )}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        className="btn btn-circle btn-sm"
                                        onClick={() => handleUpdateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                            item.stock
                                        )}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Subtotal y eliminar */}
                                <div className="flex flex-col items-end gap-2">
                                    <p className="font-semibold">
                                        ${(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    <button
                                        className="btn btn-ghost btn-sm text-error"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Botones de acción */}
                        <div className="flex justify-between mt-4">
                            <Link to="/bikes" className="btn btn-ghost">
                                Seguir Comprando
                            </Link>
                            <button
                                className="btn btn-error btn-outline"
                                onClick={() => {
                                    clearCart();
                                    toast.success('Carrito vaciado');
                                }}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </div>

                {/* Resumen de compra */}
                <div className="lg:col-span-1">
                    <div className="bg-base-200 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Resumen de Compra</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío</span>
                                <span>
                                    {shippingCost === 0
                                        ? 'Gratis'
                                        : `$${shippingCost.toLocaleString()}`
                                    }
                                </span>
                            </div>
                            {shippingCost > 0 && (
                                <div className="text-sm text-gray-500">
                                    ¡Agrega ${(500 - subtotal).toLocaleString()} más para obtener envío gratis!
                                </div>
                            )}
                            <div className="divider my-2"></div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="btn btn-primary w-full"
                        >
                            Proceder al Pago
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <div className="mt-4 text-sm text-center text-gray-500">
                            Los impuestos se calcularán en el checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;