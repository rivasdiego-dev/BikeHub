import { useMemo, useState } from 'react';
import BikeCard from "../../../components/molecules/BikeCard";
import PriceFilter from '../../../components/molecules/PriceFilter';
import useBikeStore from '../../../store/bikes.store';

const BikesPage = () => {
    const bikes = useBikeStore(state => state.bikes);
    const [currentPage, setCurrentPage] = useState(1);
    const maxPrice = Math.max(...bikes.map(bike => bike.price));
    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: maxPrice
    });

    // Filtrar bicicletas por precio
    const filteredBikes = useMemo(() => {
        return bikes.filter(bike =>
            bike.price >= priceRange.min &&
            bike.price <= priceRange.max
        );
    }, [bikes, priceRange]);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
    const currentBikes = filteredBikes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePriceChange = (newRange: { min: number; max: number }) => {
        setPriceRange(newRange);
        setCurrentPage(1);
    };

    const handleResetPrice = () => {
        setPriceRange({ min: 0, max: maxPrice });
        setCurrentPage(1);
    };

    const getPageNumbers = () => {
        const delta = 1;
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

            {/* Filtros */}
            <PriceFilter
                initialMin={0}
                initialMax={maxPrice}
                step={500}
                onPriceChange={handlePriceChange}
                onReset={handleResetPrice}
            />

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
                Mostrando {currentBikes.length} de {filteredBikes.length} bicicletas filtradas
            </div>
        </div>
    );
};

export default BikesPage;