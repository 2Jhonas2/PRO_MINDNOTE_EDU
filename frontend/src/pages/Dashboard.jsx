import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css"; // asegúrate que el archivo sea en minúsculas

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cerrar el sidebar al cambiar a desktop (evita que quede abierto si se redimensiona)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? "is-sidebar-open" : ""}`}>
      {/* Sidebar fija en desktop / off-canvas en móvil */}
      <Sidebar />

      {/* Backdrop sólo en móvil cuando el sidebar está abierto */}
      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}

      <div className="dashboard-main">
        {/* Botón hamburguesa visible en ≤768px */}
        <button
          className="sidebar-toggle"
          aria-label="Abrir menú"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={toggleSidebar}
        >
          <span />
          <span />
          <span />
        </button>

        <Header />

        <div className="dashboard-content">
          <h2>Bienvenido a Nuestro Sitio</h2>
          <p>Has iniciado sesión correctamente.</p>

          <div className="cards-container">
            <div className="card">
              <h3>📝 Tareas</h3>
              <p>Organiza y administra tus tareas pendientes.</p>
            </div>
            <div className="card">
              <h3>🔔 Notificaciones</h3>
              <p>Consulta tus últimas alertas y recordatorios.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
