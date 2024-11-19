import { Outlet } from "react-router-dom";
import AdminHeader from "../../../components/organisms/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex">
      <div className="flex flex-col w-full">
        <AdminHeader />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
