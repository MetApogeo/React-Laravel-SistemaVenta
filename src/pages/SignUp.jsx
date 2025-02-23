import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthDate: "",
    gender: ""
  });

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.birthDate || !formData.gender) {
      toast.error("⚠️ Todos los campos son obligatorios.");
      return;
    }

    // 🔥 Intentamos registrar al usuario
    const success = register(formData.email, formData.password, formData);

    if (success) {
      toast.success("✅ Registro exitoso. Redirigiendo al login...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("❌ El usuario ya existe. Intenta con otro correo.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Registro de Usuario</h2>
      <div className="mb-3">
        <input type="text" name="name" className="form-control" placeholder="Nombre" value={formData.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="email" name="email" className="form-control" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="password" name="password" className="form-control" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento</label>
        <input type="date" name="birthDate" className="form-control" value={formData.birthDate} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Sexo</label>
        <select name="gender" className="form-control" value={formData.gender} onChange={handleChange}>
          <option value="">Selecciona...</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <button className="btn btn-primary w-100" onClick={handleSignUp}>🚀 Registrarse</button>
    </div>
  );
}

export default SignUp;
