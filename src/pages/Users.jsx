import { useState } from "react";

// 🔥 Función para generar una contraseña aleatoria segura
const generateRandomPassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", username: "juanp", email: "juan@example.com", role: "Administrador", password: "1234" },
    { id: 2, name: "María Gómez", username: "mariag", email: "maria@example.com", role: "Cajero", password: "5678" },
    { id: 3, name: "Otis Admin", username: "otis", email: "otis@gmail.com", role: "Administrador", password: "otis234" }
  ]);

  const roles = ["Administrador", "Cajero", "Vendedor", "Supervisor"];

  const [newUser, setNewUser] = useState({ name: "", username: "", email: "", role: "", password: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🔥 Mostrar/Ocultar contraseña
  const [copyMessage, setCopyMessage] = useState(""); // 🔥 Mensaje al copiar contraseña

  // 🔥 Manejar cambios en los inputs
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // 🔥 Manejar selección de rol
  const handleRoleChange = (e) => {
    setNewUser({ ...newUser, role: e.target.value });
  };

  // 🔥 Generar y asignar una contraseña segura
  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword();
    setNewUser({ ...newUser, password: generatedPassword });
    setCopyMessage(""); // 🔥 Reiniciar mensaje al generar nueva contraseña
  };

  // 🔥 Copiar contraseña al portapapeles
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(newUser.password).then(() => {
      setCopyMessage("📋 Copiado al portapapeles!");
      setTimeout(() => setCopyMessage(""), 2000); // 🔥 Mensaje desaparece después de 2 segundos
    });
  };

  // 🔥 Agregar o editar usuario
  const handleSaveUser = () => {
    if (newUser.name && newUser.username && newUser.email && newUser.role) {
      const finalPassword = newUser.password ? newUser.password : generateRandomPassword();

      if (editingUser) {
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...editingUser, ...newUser, password: finalPassword } : user
        ));
        setEditingUser(null);
      } else {
        setUsers([...users, { id: users.length + 1, ...newUser, password: finalPassword }]);
        alert(`✅ Usuario agregado con éxito\n📌 Contraseña generada: ${finalPassword}`); // 🔥 Muestra la contraseña generada
      }
      setNewUser({ name: "", username: "", email: "", role: "", password: "" });
      setCopyMessage(""); // 🔥 Reiniciar mensaje al agregar usuario
    }
  };

  // 🔥 Editar usuario
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ name: user.name, username: user.username, email: user.email, role: user.role, password: user.password });
  };

  // 🔥 Eliminar usuario
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // 🔥 Filtrar usuarios
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-center">Gestión de Usuarios</h2>

      {/* 🔥 Buscador */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar usuarios..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔥 Formulario */}
      <div className="mb-3">
        <input type="text" name="name" className="form-control" placeholder="Nombre" value={newUser.name} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="text" name="username" className="form-control" placeholder="Usuario" value={newUser.username} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="email" name="email" className="form-control" placeholder="Correo" value={newUser.email} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <select className="form-control" value={newUser.role} onChange={handleRoleChange}>
          <option value="">Selecciona un Rol</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password" 
          className="form-control me-2" 
          placeholder="Contraseña" 
          value={newUser.password} 
          onChange={handleChange} 
        />
        <button className="btn btn-secondary me-2" onClick={handleGeneratePassword}>🔄 Generar</button>
        <button className="btn btn-outline-secondary me-2" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈 Ocultar" : "👁 Mostrar"}
        </button>
        <button className="btn btn-success" onClick={handleCopyPassword} disabled={!newUser.password}>
          📋 Copiar
        </button>
      </div>
      {copyMessage && <div className="alert alert-success">{copyMessage}</div>}
      <button className={`btn ${editingUser ? "btn-warning" : "btn-primary"} mb-3`} onClick={handleSaveUser}>
        {editingUser ? "Guardar Cambios" : "Agregar Usuario"}
      </button>

      {/* 🔥 Listado de usuarios */}
      <ul className="list-group">
        {filteredUsers.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name} ({user.username}) - {user.email} - {user.role}
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditUser(user)}>✏️ Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>🗑 Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
