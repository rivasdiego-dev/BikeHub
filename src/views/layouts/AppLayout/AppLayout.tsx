import { Outlet } from "react-router-dom";
import Header from "../../../components/organisms/Header";

export default function AppLayout() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}