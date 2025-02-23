import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // 🔥 Importamos el contexto del carrito
import { FaBoxOpen, FaUsers, FaShoppingCart, FaSignOutAlt } from "react-icons/fa"; // 🔥 Íconos para mejor apariencia
import { NavDropdown } from "react-bootstrap"; // 🔥 Importamos el dropdown de Bootstrap

export function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // 🔥 Obtenemos el carrito para contar los productos
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">POS System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

            {/* 🔥 Menú desplegable "Catálogos" */}
            <NavDropdown title="Catálogos" id="catalog-dropdown">
              <NavDropdown.Item as={Link} to="/products">
                <FaBoxOpen className="me-2" /> Productos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/users">
                <FaUsers className="me-2" /> Usuarios
              </NavDropdown.Item>
            </NavDropdown>

            {isAuthenticated && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart className="me-1" /> Carrito 
                    {cart.length > 0 && (
                      <span className="badge bg-danger ms-1">{cart.length}</span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isAuthenticated && (
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
