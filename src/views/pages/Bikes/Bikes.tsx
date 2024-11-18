import { useState } from 'react';
import BikeCard from "../../../components/molecules/BikeCard";
import useBikeStore from '../../../store/bikes.store';

const BikesPage = () => {

    const bikes = useBikeStore(state => state.bikes);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Cálculos para la paginación
    const totalPages = Math.ceil(bikes.length / itemsPerPage);
    const currentBikes = bikes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Función para generar el array de páginas a mostrar
    const getPageNumbers = () => {
        const delta = 1; // Número de páginas a mostrar antes y después de la página actual
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);

        if (totalPages <= 1) return range;

        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i < totalPages && i > 1) {
                range.push(i);
            }
        }
        range.push(totalPages);

        for (const i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Grid de Bicicletas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentBikes.map(bike => (
                    <BikeCard key={bike.id} bike={bike} />
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center">
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); scroll(0, 0); }}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {getPageNumbers().map((number, index) => (
                        number === '...' ? (
                            <button key={`dots-${index}`} className="join-item btn btn-disabled">
                                ...
                            </button>
                        ) : (
                            <button
                                key={number}
                                className={`join-item btn ${currentPage === number ? 'btn-primary' : ''}`}
                                onClick={() => { setCurrentPage(Number(number)); scroll(0, 0); }}
                            >
                                {number}
                            </button>
                        )
                    ))}
                    <button
                        className="join-item btn"
                        onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); scroll(0, 0); }}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Información de resultados */}
            <div className="text-center mt-4 text-gray-600">
                Mostrando {currentBikes.length} de {bikes.length} bicicletas
            </div>
        </div>
    );
};

export default BikesPage;