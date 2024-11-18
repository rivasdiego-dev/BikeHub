import { useState } from 'react';
import { Sliders } from 'lucide-react';

interface PriceRange {
    min: number;
    max: number;
}

interface PriceFilterProps {
    initialMin: number;
    initialMax: number;
    step?: number;
    onPriceChange: (range: PriceRange) => void;
    onReset: () => void;
}

const PriceFilter = ({
    initialMin,
    initialMax,
    step = 100, // Valor por defecto más razonable
    onPriceChange,
    onReset
}: PriceFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<PriceRange>({
        min: initialMin,
        max: initialMax
    });
    const [inputValues, setInputValues] = useState<PriceRange>({
        min: initialMin,
        max: initialMax
    });

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = Number(value);

        const newRange = {
            ...priceRange,
            [name]: newValue
        };

        // Asegurarse que min no sea mayor que max y viceversa
        if (name === 'min' && newValue > priceRange.max) {
            newRange.max = newValue;
            setInputValues(prev => ({ ...prev, max: newValue }));
        }
        if (name === 'max' && newValue < priceRange.min) {
            newRange.min = newValue;
            setInputValues(prev => ({ ...prev, min: newValue }));
        }

        setPriceRange(newRange);
        setInputValues(prev => ({ ...prev, [name]: newValue }));
        onPriceChange(newRange);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = value === '' ? '' : Number(value);

        setInputValues(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = Number(value);

        // Validar límites
        if (name === 'min') {
            newValue = Math.max(initialMin, Math.min(newValue, priceRange.max));
        } else {
            newValue = Math.max(priceRange.min, Math.min(newValue, initialMax));
        }

        const newRange = {
            ...priceRange,
            [name]: newValue
        };

        setPriceRange(newRange);
        setInputValues(prev => ({ ...prev, [name]: newValue }));
        onPriceChange(newRange);
    };

    const handleReset = () => {
        setPriceRange({ min: initialMin, max: initialMax });
        setInputValues({ min: initialMin, max: initialMax });
        onReset();
    };

    return (
        <div className="mb-8">
            <button
                className="btn btn-primary mb-4"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Sliders className="w-4 h-4 mr-2" />
                Filtros
            </button>

            <div className={`collapse ${isOpen ? 'collapse-open' : ''} bg-base-200`}>
                <div className="collapse-content">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Rango de Precios</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Control de precio mínimo */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Precio Mínimo</span>
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="number"
                                            name="min"
                                            value={inputValues.min}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            className="input input-bordered w-full"
                                            min={initialMin}
                                            max={initialMax}
                                            step={step}
                                        />
                                        <input
                                            type="range"
                                            name="min"
                                            min={initialMin}
                                            max={initialMax}
                                            step={step}
                                            value={priceRange.min}
                                            onChange={handleRangeChange}
                                            className="range range-primary"
                                        />
                                    </div>
                                </div>

                                {/* Control de precio máximo */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Precio Máximo</span>
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="number"
                                            name="max"
                                            value={inputValues.max}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            className="input input-bordered w-full"
                                            min={initialMin}
                                            max={initialMax}
                                            step={step}
                                        />
                                        <input
                                            type="range"
                                            name="max"
                                            min={initialMin}
                                            max={initialMax}
                                            step={step}
                                            value={priceRange.max}
                                            onChange={handleRangeChange}
                                            className="range range-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button
                                    className="btn btn-ghost"
                                    onClick={handleReset}
                                >
                                    Restablecer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceFilter;