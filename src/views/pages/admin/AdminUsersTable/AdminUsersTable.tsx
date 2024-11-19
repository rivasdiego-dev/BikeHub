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
          <h2 className="card-title">Usuarios</h2>
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
    </div>
  );
}
