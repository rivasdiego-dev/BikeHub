import { useMemo } from "react";
import { Link } from "react-router-dom";
import BikeCard from "../../../components/molecules/BikeCard";
import useBikeStore from "../../../store/bikes.store";

export default function Home() {

    const baseBikes = useBikeStore(state => state.bikes);
    const bikes = useMemo(() => {
        const shuffled = [...baseBikes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [baseBikes]);

    return (
        <>
            <div
                className="hero min-h-[60dvh]"
                style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1521078803125-7efd09b65b8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-6xl font-bold">¡Esto es BikeHub!</h1>
                        <p className="mb-5 text-lg font-medium">
                            Encuentra las mejores bicicletas de montaña, carretera y ciudad en un solo lugar, en BikeHub. Una tienda especializada en bicicletas de alta calidad.
                        </p>
                        <Link to={'/bikes'}>
                            <button className="btn btn-primary">
                                Ver Bicicletas
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <main>
                <section className="py-16">
                    <div className="container mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            Bicicletas Destacadas
                        </h2>
                        <div className="flex justify-evenly gap-8">
                            {
                                bikes.map(bike => <BikeCard key={bike.id} bike={bike} />)
                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
