import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Modal from "../components/Modal";
import "./../styles/Tasks.css";

const Tasks = () => {
  const [formData, setFormData] = useState({
    tarea_titulo: "",
    tarea_descripcion: "",
    tarea_fechaLimite: "",
    tarea_hora: "",
    estado_id: "",
    prioridad_id: "",
    usuario_id: localStorage.getItem("user_id"),
    tipo_id: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "", message: "" });

  // 📌 Nuevo estado para guardar las tareas
  const [tareas, setTareas] = useState([]);

  // 📌 Función para cargar tareas del usuario logueado
  const fetchTareas = async () => {
    try {
      const response = await fetch("http://localhost:3001/tareas");
      if (response.ok) {
        const data = await response.json();
        const userId = Number(localStorage.getItem("user_id"));

        // Filtrar solo las tareas del usuario logueado
        const userTasks = data.filter((tarea) => tarea.usuario_id === userId);
        setTareas(userTasks);
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
    }
  };

  // 📌 Cargar tareas cuando se monta el componente
  useEffect(() => {
    fetchTareas();
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setModalInfo({
          title: "¡Éxito!",
          message: "Tarea registrada con éxito ✅",
        });
        setModalOpen(true);

        setFormData({
          tarea_titulo: "",
          tarea_descripcion: "",
          tarea_fechaLimite: "",
          tarea_hora: "",
          estado_id: "",
          prioridad_id: "",
          usuario_id: localStorage.getItem("user_id"),
          tipo_id: "",
        });

        // 📌 Volver a cargar la lista de tareas después de crear una nueva
        fetchTareas();
      } else {
        setModalInfo({
          title: "Error",
          message: "Error al registrar la tarea ❌",
        });
        setModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalInfo({
        title: "Error",
        message: "Error de conexión con el servidor ❌",
      });
      setModalOpen(true);
    }
  };

  return localStorage.getItem("user_id") === null ? (
    <div>no autenticado</div>
  ) : (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <h2>Gestión de Tareas</h2>

          <div className="tasks-container">
            {/* Formulario */}
            <form className="task-form" onSubmit={handleSubmit}>
              <h2>Registrar Nueva Tarea</h2>
              <input
                type="text"
                name="tarea_titulo"
                value={formData.tarea_titulo}
                onChange={handleChange}
                placeholder="Título de la tarea"
                required
              />

              <textarea
                name="tarea_descripcion"
                value={formData.tarea_descripcion}
                onChange={handleChange}
                placeholder="Descripción de la tarea"
                required
              />

              <label>Fecha Límite:</label>
              <input
                type="date"
                name="tarea_fechaLimite"
                value={formData.tarea_fechaLimite}
                onChange={handleChange}
                required
              />

              <label>Hora:</label>
              <input
                type="time"
                name="tarea_hora"
                value={formData.tarea_hora}
                onChange={handleChange}
                required
              />

              <label>Estado:</label>
              <select
                name="estado_id"
                value={formData.estado_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="1">Pendiente</option>
                <option value="2">En Progreso</option>
                <option value="3">Completado</option>
                <option value="4">Cancelada</option>
              </select>

              <label>Prioridad:</label>
              <select
                name="prioridad_id"
                value={formData.prioridad_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione prioridad</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
                <option value="4">Crítica</option>
              </select>

              <label>Tipo:</label>
              <select
                name="tipo_id"
                value={formData.tipo_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione tipo</option>
                <option value="1">Academico</option>
                <option value="2">Personal</option>
                <option value="3">Recordatorio</option>
              </select>

              <button type="submit">Guardar Tarea</button>
            </form>

            {/* 📌 Lista de tareas */}
            <div className="tasks-list">
              <h3>📌 Lista de Tareas</h3>
              {tareas.length === 0 ? (
                <p>No tienes tareas registradas.</p>
              ) : (
                <ul>
                  {tareas.map((tarea) => (
                    <li key={tarea.tarea_id}>
                      <strong>{tarea.tarea_titulo}</strong> <br />
                      {tarea.tarea_descripcion} <br />
                      ⏰ {new Date(tarea.tarea_hora).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - 📅{" "}
                      {new Date(tarea.tarea_fechaLimite).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={modalOpen}
        title={modalInfo.title}
        message={modalInfo.message}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Tasks;
