import { Link } from "react-router-dom";

type Props = {
    bike: Bike;
}

export default function BikeCard({
    bike
}: Props) {
    return (
        <div className="card bg-base-300 w-96 shadow-lg hover:shadow-slate-50/5 hover:scale-105 transition-all border border-slate-50/10">
            <figure>
                <img
                    className="w-full h-64 object-cover"
                    src={bike.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl relative">
                    <div className="flex w-full justify-between items-center">
                        <p className="w-full">
                            {bike.model}
                        </p>
                        <p className="font-thin text-3xl">
                            ${bike.price}
                        </p>
                    </div>
                    <p className="text-sm text-neutral-content font-bold tracking-widest absolute -top-4">
                        {bike.brand}
                    </p>
                </h2>
                <p className="text-neutral-content"> {bike.description} </p>
                <div className="flex justify-end gap-4 mb-4">
                    <div className="badge badge-outline"> {bike.year} </div>
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/bikes/${bike.id}`} className="w-full">
                        <button className="btn btn-primary btn-outline w-full">
                            Comprar
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
