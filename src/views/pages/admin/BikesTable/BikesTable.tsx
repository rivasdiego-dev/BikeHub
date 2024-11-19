import useBikeStore from "../../../../store/bikes.store";

interface BikeTableItemProps {
  bike: Bike;
}

function BikeTableItem({ bike }: BikeTableItemProps) {
  return (
    <tr>
      <th>{bike.id}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-16 w-16">
              <img src={bike.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{bike.brand}</div>
            <div className="text-sm opacity-50">{bike.model}</div>
          </div>
        </div>
      </td>
      <td>{bike.year}</td>
      <td>{bike.description}</td>
      <td>{bike.price} USD</td>
      <td>
        <div className={`badge font-medium badge-secondary capitalize p-4`}>
          {bike.stock}
        </div>
      </td>
    </tr>
  );
}

export default function BikesTable() {
  const { bikes } = useBikeStore();

  return (
    <div className="w-full">
      <div className="w-full px-10 card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Bicicletas</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Marca y modelo</th>
                  <th>Año</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Inventario</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike: Bike) => (
                  <BikeTableItem key={bike.id} bike={bike} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
