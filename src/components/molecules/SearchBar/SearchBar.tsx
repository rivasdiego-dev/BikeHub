import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery('');
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            {/* Botón de búsqueda en móvil */}
            <button
                className="lg:hidden btn btn-ghost btn-circle"
                onClick={() => setIsOpen(true)}
            >
                <Search />
            </button>

            {/* Barra de búsqueda en desktop */}
            <form
                onSubmit={handleSubmit}
                className="hidden lg:flex items-center"
            >
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Buscar bicicletas..."
                        className="input input-bordered w-64"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-ghost btn-circle">
                    <Search />
                </button>
            </form>

            {/* Modal de búsqueda en móvil */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-base-100 lg:hidden">
                    <div className="p-4">
                        <div className="flex items-center gap-2">
                            <button
                                className="btn btn-ghost btn-circle"
                                onClick={() => setIsOpen(false)}
                            >
                                <X />
                            </button>
                            <form
                                onSubmit={handleSubmit}
                                className="flex-1"
                            >
                                <input
                                    type="text"
                                    placeholder="Buscar bicicletas..."
                                    className="input input-bordered w-full"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
