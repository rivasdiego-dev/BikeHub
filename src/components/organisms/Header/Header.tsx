import { MenuIcon } from "lucide-react";
import Logotype from "../../atoms/Logotype";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="drawer w-full">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <MenuIcon />
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">
                        <Logotype />
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal">
                            <li><Link to={'login'}> Login </Link></li>
                            <li><Link to={'register'} > Register </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer-side z-10">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    <li><Link to={'login'}> Login </Link></li>
                    <li><Link to={'register'} > Register </Link></li>
                </ul>
            </div>
        </div>
    )
}
