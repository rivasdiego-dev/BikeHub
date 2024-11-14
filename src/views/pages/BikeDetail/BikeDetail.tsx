import { InfoIcon, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allbikes, bikes } from '../../../utils/constants'; // Ajusta la ruta según tu estructura

const BikeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');

    // Encontrar la bicicleta correcta usando el id de la URL
    const bike = bikes.find(bike => bike.id === id) || allbikes.find(bike => bike.id === id);

    // Si no se encuentra la bicicleta, mostrar error o redireccionar
    if (!bike) {
        return (
            <div className="mt-96 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 max-w-md text-center">
                    Ups! Parece que no pudimos encontrar la bicicleta que buscas 😢🚲
                </h2>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/bikes')}
                >
                    Volver al catálogo
                </button>
            </div>
        );
    }

    // Opciones de talla para bicicletas
    const sizes = ['S', 'M', 'L', 'XL'];

    // Simulación de reseñas
    const rating = 4.5;
    const reviews = 10;

    return (
        <div className="mt-16 container mx-auto p-4">
            <div className="flex flex-col bg-secondary text-secondary-content p-6 rounded-lg">
                {/* Botón para volver */}
                <button
                    className="btn btn-ghost self-start"
                    onClick={() => navigate('/bikes')}
                >
                    ← Volver al catálogo
                </button>

                {/* Contenedor principal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* Columna de imagen */}
                    <div className="bg-base-200 rounded-lg overflow-hidden">
                        <img
                            src={bike.image}
                            alt={`${bike.brand} ${bike.model}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Columna de información */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">
                            {bike.brand} {bike.model} {bike.year}
                        </h1>

                        <div className="text-2xl font-bold">
                            ${bike.price.toLocaleString()}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-warning text-warning' : 'fill-none text-warning'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm">
                                ({rating} stars) · {reviews} reviews
                            </span>
                        </div>

                        <p className="text-secondary-content/80">
                            {bike.description}
                        </p>

                        {/* Selector de talla */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-secondary-content">Talla</span>
                            </label>
                            <select
                                className="select select-bordered w-full bg-base-100 text-base-content"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="" disabled>Selecciona una talla</option>
                                {sizes.map(size => (
                                    <option key={size} value={size}>
                                        Talla {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Control de cantidad */}
                        <div className="form-control w-full max-w-[8rem]">
                            <label className="label">
                                <span className="label-text text-secondary-content">Cantidad</span>
                            </label>
                            <input
                                type="number"
                                className="input input-bordered bg-base-100 text-base-content"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-3 mt-4 w-full">
                            <button className="btn btn-accent btn-ghost flex-1">
                                Añadir al Carrito
                            </button>
                            <button className="btn btn-primary flex-1">
                                Comprar Ahora
                            </button>
                        </div>

                        {/* Envío gratis */}
                        <div role="alert" className="alert">
                            <InfoIcon />
                            <span> Envío gratis en compras mayores a $500 </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetail;