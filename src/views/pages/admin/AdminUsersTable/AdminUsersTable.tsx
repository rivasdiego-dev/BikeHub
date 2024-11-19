import { useUserStore } from "../../../../store/user.store";

interface UserTableItemProps {
  user: User;
}

function UserTableItem({ user }: UserTableItemProps) {
  return (
    <tr>
      <th>{user.id}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div
          className={`badge font-medium ${
            user.is_admin ? "badge-primary" : "badge-secondary"
          } capitalize p-4`}
        >
          {user.is_admin ? "Administrador" : "Cliente"}
        </div>
      </td>
      <td>{new Date(user.created_at).toLocaleString()}</td>
    </tr>
  );
}

export default function AdminUsersTable() {
  const { users } = useUserStore();

  return (
    <div className="w-full">
      <div className="w-full px-10 card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">Usuarios</h2>
            <button
              onClick={() => {
                const modal = document.getElementById(
                  "add_user_modal"
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
              className="btn btn-secondary px-10"
            >
              Agregar
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Role</th>
                  <th>Fecha de registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <UserTableItem key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="add_user_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Agregar usuario</h3>
          <form method="dialog">
            {/* forms */}
            <div className="grid grid-cols-2 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Nombre</span>
                </div>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Correo</span>
                </div>
                <input
                  type="email"
                  placeholder="Correo"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Contraseña</span>
                </div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            {/* actions */}
            <div className="flex justify-end gap-2 mt-8">
              <button className="btn btn-secondary">Cerrar</button>
              <button className="btn btn-primary">Agregar</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
