import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useShoppingCartStore from '../../../store/shopping-cart.store';

interface CartPreviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartPreview = ({ isOpen, onClose }: CartPreviewProps) => {
    const { items, updateQuantity, removeItem, getTotalPrice } = useShoppingCartStore();
    const total = getTotalPrice();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Overlay oscuro */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Panel deslizable */}
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col bg-base-100 shadow-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-medium">
                                Carrito de Compras
                            </h2>
                            <button
                                onClick={onClose}
                                className="btn btn-ghost btn-sm btn-circle"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Contenido del carrito */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
                                    <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        ¡Añade algunas bicicletas increíbles!
                                    </p>
                                    <Link
                                        to="/bikes"
                                        className="btn btn-primary"
                                        onClick={onClose}
                                    >
                                        Ver Bicicletas
                                    </Link>
                                </div>
                            ) : (
                                <ul className="divide-y">
                                    {items.map((item) => (
                                        <li key={`${item.id}-${item.selectedSize}`} className="py-4">
                                            <div className="flex items-center gap-4">
                                                {/* Imagen */}
                                                <img
                                                    src={item.image}
                                                    alt={`${item.brand} ${item.model}`}
                                                    className="h-24 w-24 object-cover rounded-lg"
                                                />

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <h3 className="font-medium truncate">
                                                                {item.brand} {item.model}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                Talla: {item.selectedSize}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium">
                                                            ${item.price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                    {/* Controls */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                                className="btn btn-ghost btn-xs"
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </button>
                                                            <span className="w-8 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                                                                className="btn btn-ghost btn-xs"
                                                                disabled={item.quantity >= item.stock}
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="btn btn-ghost btn-xs text-error"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer con total y botones */}
                        {items.length > 0 && (
                            <div className="border-t p-4 space-y-4">
                                <div className="flex justify-between text-base font-medium">
                                    <p>Total</p>
                                    <p>${total.toLocaleString()}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/cart"
                                        className="btn btn-outline"
                                        onClick={onClose}
                                    >
                                        Ver Carrito
                                    </Link>
                                    <Link
                                        to="/checkout"
                                        className="btn btn-primary"
                                        onClick={onClose}
                                    >
                                        Comprar
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPreview;