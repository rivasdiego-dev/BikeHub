import { createTheme, ThemeProvider } from "@mui/material";
import { BarChart, PieChart, ScatterChart } from "@mui/x-charts";
import { cheerfulFiestaPalette } from "@mui/x-charts/colorPalettes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function AdminDashboard() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-full">
        {/* Stat */}
        <div className="w-full stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Nov 1st - Dec 1st</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Orders</div>
            <div className="stat-value">1,000</div>
            <div className="stat-desc">↗︎ 100 (10%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
        {/* Charts */}
        <div className="mt-16 flex justify-around flex-wrap gap-4">
          {/* Card */}
          <div className="card bg-secondary p-4 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Distribución de Ventas por Categoría de Productos
              </h2>
              <PieChart
                colors={cheerfulFiestaPalette}
                series={[
                  {
                    data: [
                      { id: 0, value: 25, label: "Bicicletas de montaña" },
                      { id: 1, value: 40, label: "Bicicletas de carretera" },
                      { id: 2, value: 20, label: "Accesorios" },
                      { id: 3, value: 15, label: "Componentes" },
                    ],
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
          {/* Card */}
          <div className="card bg-secondary p-4 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Preferencias de Compra por Grupo de Edad
              </h2>
              <BarChart
                colors={cheerfulFiestaPalette}
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["18-25 años", "26-35 años", "36-50 años"],
                    label: "Grupos de Edad",
                  },
                ]}
                series={[
                  {
                    data: [40, 35, 25],
                    label: "Bicicletas de montaña",
                  },
                  {
                    data: [20, 50, 30],
                    label: "Bicicletas de carretera",
                  },
                  {
                    data: [10, 30, 40],
                    label: "Accesorios",
                  },
                ]}
                width={500}
                height={300}
              />
            </div>
          </div>
          {/* Card */}
          <div className="card bg-secondary p-4 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Relación entre Gasto Promedio y Productos Adquiridos
              </h2>
              <ScatterChart
                colors={cheerfulFiestaPalette}
                width={500}
                height={300}
                series={[
                  {
                    label: "Clientes Frecuentes",
                    data: [
                      { x: 2, y: 100, id: 1 }, // 2 productos, $100 de gasto promedio
                      { x: 5, y: 250, id: 2 }, // 5 productos, $250 de gasto promedio
                      { x: 8, y: 400, id: 3 }, // 8 productos, $400 de gasto promedio
                      { x: 3, y: 120, id: 4 }, // 3 productos, $120 de gasto promedio
                    ],
                  },
                  {
                    label: "Clientes Ocasionales",
                    data: [
                      { x: 1, y: 50, id: 5 }, // 1 producto, $50 de gasto promedio
                      { x: 2, y: 80, id: 6 }, // 2 productos, $80 de gasto promedio
                      { x: 1, y: 60, id: 7 }, // 1 producto, $60 de gasto promedio
                      { x: 3, y: 150, id: 8 }, // 3 productos, $150 de gasto promedio
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
