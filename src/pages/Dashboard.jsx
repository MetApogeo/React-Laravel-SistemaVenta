
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
 

  const salesToday = 500;
  const totalProducts = 20;
  const registeredUsers = 5;
  const bestSellingProducts = [
    { id: 1, name: "Laptop", sold: 15 },
    { id: 2, name: "Mouse", sold: 10 },
    { id: 3, name: "Keyboard", sold: 8 }
  ];

  // 🔥 Configuración de datos para la gráfica
  const chartData = {
    labels: bestSellingProducts.map(product => product.name),
    datasets: [
      {
        label: "Cantidad Vendida",
        data: bestSellingProducts.map(product => product.sold),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="container">
      <h2 className="text-center">Dashboard</h2>

      {/* 🔥 Tarjetas de datos principales */}
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Ventas del Día</div>
            <div className="card-body">
              <h5 className="card-title">${salesToday}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total de Productos</div>
            <div className="card-body">
              <h5 className="card-title">{totalProducts}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Usuarios Registrados</div>
            <div className="card-body">
              <h5 className="card-title">{registeredUsers}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Productos más vendidos */}
      <h3 className="mt-4">Productos Más Vendidos</h3>
      <Bar data={chartData} />

      {/* 🔥 Botones de navegación rápida */}
      <div className="text-center mt-4">
        <button className="btn btn-info me-2" onClick={() => navigate("/history")}>
          Ver Historial de Compras 📜
        </button>
        <button className="btn btn-primary me-2" onClick={() => navigate("/users")}>
          Gestión de Usuarios 👥
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/products")}>
          Gestión de Productos 📦
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
