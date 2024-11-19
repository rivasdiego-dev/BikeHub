import { useOrderStore } from "../../../../store/order.store";

interface OrderTableItemProps {
  order: Order;
}

function OrderTableItem({ order }: OrderTableItemProps) {
  return (
    <tr>
      <th>{order.id}</th>
      <td>{order.userId}</td>
      <td>
        {order.shippingAddress.country} {order.shippingAddress.state}{" "}
        {order.shippingAddress.city} {order.shippingAddress.street}{" "}
        {order.shippingAddress.zipCode}
      </td>
      <td>
        <div className="flex flex-col justify-center gap-3">
          {order.items.map((item: OrderItem, index: number) => (
            <div key={`${item.bike.id}${index}`}>
              <div className="font-bold">
                {item.bike.brand} {item.bike.model} {item.bike.year}
              </div>
              <div className="text-sm opacity-50">{item.bike.price}</div>
            </div>
          ))}
        </div>
      </td>
      <td>{order.totalAmount} USD</td>
      <td>
        <div
          className={`badge font-medium ${
            order.status === "delivered" ? "badge-primary" : "badge-secondary"
          } capitalize p-4`}
        >
          {order.status}
        </div>
      </td>
      <td>{new Date(order.updatedAt).toLocaleString()}</td>
    </tr>
  );
}

export default function OrdersTable() {
  const { orders } = useOrderStore();

  return (
    <div className="w-full">
      <div className="w-full px-10 card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Ordenes</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Usuario</th>
                  <th>Dirección de envio</th>
                  <th>Productos</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Fecha de actualización</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <OrderTableItem key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
