import useBikeStore from "../../../../store/bikes.store";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface BikeTableItemProps {
  bike: Bike;
  updateStock: (id: string, amount: number) => void;
}

function BikeTableItem({ bike, updateStock }: BikeTableItemProps) {
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
        <div className="flex items-center gap-4">
          <div className={`badge font-medium badge-secondary capitalize p-4`}>
            {bike.stock}
          </div>
          <button
            onClick={() => updateStock(bike.id, 1)}
            className="btn btn-primary"
          >
            <MdKeyboardArrowUp />
          </button>
          <button
            onClick={() => updateStock(bike.id, -1)}
            className="btn btn-secondary"
          >
            <MdKeyboardArrowDown />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function BikesTable() {
  const { bikes, updateStock } = useBikeStore();

  return (
    <div className="w-full">
      <div className="w-full px-10 card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">Bicicletas</h2>
            <button
              onClick={() => {
                const modal = document.getElementById(
                  "add_product_modal"
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
                  <th>Marca y modelo</th>
                  <th>Año</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Inventario</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike: Bike) => (
                  <BikeTableItem
                    key={bike.id}
                    bike={bike}
                    updateStock={updateStock}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="add_product_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">Agregar producto</h3>
          <form method="dialog">
            {/* Formulario */}
            <div className="grid grid-cols-2 gap-4">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Marca</span>
                </div>
                <input
                  type="text"
                  placeholder="Marca"
                  className="input input-bordered w-full max-w-xs"
                  name="brand"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Modelo</span>
                </div>
                <input
                  type="text"
                  placeholder="Modelo"
                  className="input input-bordered w-full max-w-xs"
                  name="model"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Año</span>
                </div>
                <input
                  type="number"
                  placeholder="Año"
                  className="input input-bordered w-full max-w-xs"
                  name="year"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Precio</span>
                </div>
                <input
                  type="number"
                  placeholder="Precio"
                  className="input input-bordered w-full max-w-xs"
                  name="price"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Imagen (URL)</span>
                </div>
                <input
                  type="text"
                  placeholder="URL de la imagen"
                  className="input input-bordered w-full max-w-xs"
                  name="image"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Descripción</span>
                </div>
                <textarea
                  placeholder="Descripción"
                  className="textarea textarea-bordered w-full max-w-xs"
                  name="description"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Stock</span>
                </div>
                <input
                  type="number"
                  placeholder="Cantidad en stock"
                  className="input input-bordered w-full max-w-xs"
                  name="stock"
                />
              </label>
            </div>
            {/* Acciones */}
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
