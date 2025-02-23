import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([
    { email: "admin@gmail.com", password: "1234", name: "Admin", birthDate: "1990-01-01", gender: "male" },
    { email: "otis@gmail.com", password: "qwerty", name: "Otis", birthDate: "1995-06-15", gender: "male" }
  ]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const userFound = users.find(user => user.email === email && user.password === password);

    if (userFound) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    } else {
      return false;
    }
  };

  const register = (email, password, userData) => {
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return false;
    }

    // 🔥 Guardamos todos los datos del usuario
    setUsers((prevUsers) => [...prevUsers, { email, password, ...userData }]);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
