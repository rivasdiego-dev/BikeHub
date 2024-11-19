import { MenuIcon, UserCircle, LogOut, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logotype from "../../atoms/Logotype";
import { useAuthStore } from "../../../store/auth.store";
import SearchBar from "../../molecules/SearchBar";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users", label: "Usuarios" },
    { to: "/admin/orders", label: "Ordenes" },
    { to: "/admin/bikes", label: "Bicicletas" },
  ];

  return (
    <div className="drawer w-full">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full">
          {/* Hamburger menu for mobile */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <MenuIcon />
            </label>
          </div>

          {/* Logo */}
          <div className="mx-2 flex-1 px-2">
            <Link to="/">
              <Logotype />
            </Link>
          </div>

          {/* Búsqueda */}
          <div className="sm:flex-none hidden">
            <SearchBar />
          </div>

          {/* Desktop menu */}
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal items-center gap-2">
              {/* Navigation links */}
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              {/* Auth Section */}
              {isAuthenticated ? (
                <li>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <UserCircle className="w-full h-full" />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                    >
                      <li className="menu-title">
                        <span>{currentUser?.name}</span>
                      </li>
                      {currentUser?.is_admin && (
                        <li>
                          <Link to="/admin" className="text-primary">
                            Panel de Admin
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link to="/profile">
                          <Settings size={18} />
                          Perfil
                        </Link>
                      </li>
                      <div className="divider my-0"></div>
                      <li>
                        <button onClick={handleLogout} className="text-error">
                          <LogOut size={18} />
                          Cerrar Sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="btn btn-ghost">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-primary">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <div className="divider"></div>

          {/* Auth section in mobile */}
          {isAuthenticated ? (
            <>
              <li className="menu-title">
                <span>{currentUser?.name}</span>
              </li>
              {currentUser?.is_admin && (
                <li>
                  <Link to="/admin" className="text-primary">
                    Panel de Admin
                  </Link>
                </li>
              )}
              <li>
                <Link to="/profile">Perfil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
