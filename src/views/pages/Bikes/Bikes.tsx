import { useState } from 'react';
import BikeCard from "../../../components/molecules/BikeCard";
import { allbikes, allbikes2 } from "../../../utils/constants";


const bikes = [...allbikes, ...allbikes2];

const BikesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Cálculos para la paginación
    const totalPages = Math.ceil(bikes.length / itemsPerPage);
    const currentBikes = bikes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Generar números de página para la navegación
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            className={`join-item btn ${currentPage === number ? 'btn-active' : ''}`}
                            onClick={() => { setCurrentPage(number); scroll(0, 0); }}
                        >
                            {number}
                        </button>
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