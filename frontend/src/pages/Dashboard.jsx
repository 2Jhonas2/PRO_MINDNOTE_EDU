import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";
import axios from "axios";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        const res = await axios.get("http://localhost:3001/login/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && res.data.data) {
          // Aquí podrías pedir también nombre/apellido si el backend los envía
          setUsuarioNombre(res.data.data.usuario_nombre || "Usuario");
        }
      } catch (err) {
        console.error("Error al obtener perfil:", err);
        setUsuarioNombre("Usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  // sidebar responsive
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
      <aside id="sidebar" className="sidebar-wrapper">
        <Sidebar />
      </aside>

      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar} />}

      <div className="dashboard-main">
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
          <h2>
            {loading
              ? "Cargando..."
              : `Bienvenido${usuarioNombre ? ` ${usuarioNombre}`:""}!`}
          </h2>
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
