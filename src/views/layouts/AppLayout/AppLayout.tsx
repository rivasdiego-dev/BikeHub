import { Outlet } from "react-router-dom";
import Header from "../../../components/organisms/Header";

export default function AppLayout() {
    return (
        <div className="flex">
            <div className="flex flex-col w-full">
                <Header />
                <main className="flex flex-1 flex-col p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}