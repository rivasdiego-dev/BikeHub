import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    is_admin: boolean;
  } | null>(null);

  useEffect(() => {
    // Obtiene los datos del usuario desde localStorage
    const authStore = localStorage.getItem("auth-store");
    if (authStore) {
      const parsedData = JSON.parse(authStore).state?.currentUser;
      setUser(parsedData);
    }
  }, []);

  return (
    <div className="bg-base-100 min-h-[80vh] flex items-center justify-center text-base-content">
      <div className="bg-secondary shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        {/* Título */}
        <h1 className="text-3xl font-bold text-primary mb-6">Perfil de Usuario</h1>

        {/* Imagen de perfil */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-content text-5xl font-bold">👤</span>
          </div>
        </div>

        {/* Botón para cambiar foto */}
        <button className="bg-primary text-primary-content px-4 py-2 rounded-md hover:bg-warning hover:text-warning-content transition-colors mb-6">
          Cambiar Foto
        </button>

        {/* Información del usuario */}
        {user ? (
          <div className="text-left">
            <p className="text-lg font-medium mb-2">
              <span className="text-secondary-content">Nombre:</span> {user.name}
            </p>
            <p className="text-lg font-medium mb-2">
              <span className="text-secondary-content">Correo:</span> {user.email}
            </p>
            <p className="text-lg font-medium">
              <span className="text-secondary-content">Rol:</span>{" "}
              {user.is_admin ? "Administrador" : "Usuario"}
            </p>
          </div>
        ) : (
          <p className="text-secondary-content">Cargando información del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
