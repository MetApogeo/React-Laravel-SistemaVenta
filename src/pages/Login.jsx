import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLock, FaBroom } from "react-icons/fa"; // 🔥 Íconos

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (!formData.username || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const isAuthenticated = login(formData.username, formData.password);
    
    if (isAuthenticated) {
      setError("");
      navigate("/"); // 🔥 Redirige a Home en vez de Dashboard
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleClear = () => {
    setFormData({ username: "", password: "" });
    setError("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">
          <FaLock className="me-2 text-warning" /> Iniciar Sesión
        </h2>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}
        
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa tu usuario"
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
        </div>
        
        <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
          <FaLock className="me-1" /> Acceder
        </button>
        <button className="btn btn-light w-100" onClick={handleClear}>
          <FaBroom className="me-1" /> Limpiar
        </button>

        {/* 🔥 Enlace al registro */}
        <p className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/signup" className="text-primary fw-bold">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
