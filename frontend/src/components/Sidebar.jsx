import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Confirmar antes de cerrar sesión
    const confirmar = window.confirm("¿Deseas cerrar sesión?");
    if (!confirmar) return;

    // 🔹 Limpiar completamente la sesión
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("usuario_nombre"); // si lo usas todavía

    // 🔹 (Opcional) limpiar sesión del servidor si la manejas con cookies
    // await axios.post("http://localhost:3001/logout");

    // 🔹 Redirigir al login
    navigate("/login", { replace: true });

    // 🔹 Forzar recarga para limpiar estados en memoria (opcional)
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <h2>MindNote.EDU</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">🏠 Inicio</Link>
          </li>
          <li>
            <Link to="/tasks">📝 Tareas</Link>
          </li>
          <li>
            <Link to="/notificaciones">🔔 Notificaciones</Link>
          </li>
          <li
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              color: "red",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
              🚪 Cerrar sesión
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
