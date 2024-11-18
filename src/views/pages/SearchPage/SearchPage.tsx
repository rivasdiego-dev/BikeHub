import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BikeCard from '../../../components/molecules/BikeCard';
import useBikeStore from '../../../store/bikes.store';

const SearchPage = () => {
    const bikes = useBikeStore(state => state.bikes);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Filtrar bicicletas según la búsqueda
    const filteredBikes = useMemo(() => {
        const searchTerm = query.toLowerCase();
        return bikes.filter(bike =>
            bike.brand.toLowerCase().includes(searchTerm) ||
            bike.model.toLowerCase().includes(searchTerm) ||
            `${bike.brand} ${bike.model}`.toLowerCase().includes(searchTerm)
        );
    }, [query, bikes]);

    // Paginación
    const totalPages = Math.ceil(filteredBikes.length / itemsPerPage);
    const currentBikes = filteredBikes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Generar números de página
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
            {/* Encabezado de búsqueda */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Resultados de búsqueda
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                    <Search className="w-4 h-4" />
                    <span>
                        {filteredBikes.length} resultados para "{query}"
                    </span>
                </div>
            </div>

            {/* Grid de resultados */}
            {filteredBikes.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {currentBikes.map(bike => (
                            <BikeCard key={bike.id} bike={bike} />
                        ))}
                    </div>

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className="flex justify-center">
                            <div className="join">
                                <button
                                    className="join-item btn"
                                    onClick={() => {
                                        setCurrentPage(prev => Math.max(prev - 1, 1));
                                        scroll(0, 0);
                                    }}
                                    disabled={currentPage === 1}
                                >
                                    «
                                </button>
                                {getPageNumbers().map((number, index) => (
                                    number === '...' ? (
                                        <button
                                            key={`dots-${index}`}
                                            className="join-item btn btn-disabled"
                                        >
                                            ...
                                        </button>
                                    ) : (
                                        <button
                                            key={number}
                                            className={`join-item btn ${currentPage === number ? 'btn-primary' : ''}`}
                                            onClick={() => {
                                                setCurrentPage(Number(number));
                                                scroll(0, 0);
                                            }}
                                        >
                                            {number}
                                        </button>
                                    )
                                ))}
                                <button
                                    className="join-item btn"
                                    onClick={() => {
                                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                        scroll(0, 0);
                                    }}
                                    disabled={currentPage === totalPages}
                                >
                                    »
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-16">
                    <Search className="w-16 h-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">
                        No encontramos resultados
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Intenta con otros términos de búsqueda
                    </p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;