import { Link } from "react-router-dom";

export default function Logotype() {
    return (
        <Link to={'/'}>
            <div className="flex items-center">
                <span className="text-white text-3xl font-bold">Bike</span>
                <span className="bg-[#ff9000] text-black text-3xl font-bold px-1 rounded-sm ml-1">hub</span>
            </div>
        </Link>
    )
}
