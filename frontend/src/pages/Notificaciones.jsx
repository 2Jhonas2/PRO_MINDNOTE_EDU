import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import '../styles/Notificaciones.css'

const API_BASE = 'http://localhost:3001'

function Notificaciones() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [items, setItems] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [filter, setFilter] = useState('all') // all | unread
  const [q, setQ] = useState('')

  const toggleSidebar = () => setSidebarOpen((v) => !v)
  const closeSidebar = () => setSidebarOpen(false)

  // Cerrar sidebar al redimensionar
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [sidebarOpen])

  // Traer notificaciones del backend (usuario del token)
  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        setLoading(true)
        setErr('')

        const token = localStorage.getItem('token')
        if (!token) {
          setErr('No autenticado.')
          setLoading(false)
          return
        }

        const res = await axios.get(`${API_BASE}/notificaciones`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = Array.isArray(res.data?.data) ? res.data.data : []
        setItems(
          data.map((n) => ({
            id: n.notificacion_id,
            mensaje: n.notificacion_mensaje,
            fecha: n.notificacion_fechaEnvio,
            entregado: n.notificacion_entregado,
            tarea_id: n.tarea_id,
          }))
        )
      } catch (e) {
        console.error(e)
        setErr('Error al cargar notificaciones.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotificaciones()
  }, [])

  // Filtros + búsqueda
  useEffect(() => {
    let out = [...items]
    if (filter === 'unread') out = out.filter((n) => !n.entregado)
    if (q.trim()) {
      const ql = q.trim().toLowerCase()
      out = out.filter((n) => (n.mensaje || '').toLowerCase().includes(ql))
    }
    setFiltered(out)
  }, [items, filter, q])

  const unreadCount = useMemo(
    () => items.filter((n) => !n.entregado).length,
    [items]
  )

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `${API_BASE}/notificaciones/${id}`,
        { notificacion_entregado: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, entregado: true } : n))
      )
    } catch (e) {
      console.error(e)
      alert('No se pudo marcar como leída.')
    }
  }

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `${API_BASE}/notificaciones/marcar-todas`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setItems((prev) => prev.map((n) => ({ ...n, entregado: true })))
    } catch (e) {
      console.error(e)
      alert('No se pudieron marcar todas como leídas.')
    }
  }

  const formatDate = (iso) => {
    try {
      const d = new Date(iso)
      return d.toLocaleString()
    } catch {
      return iso ?? ''
    }
  }

  return (
    <div
      className={`dashboard-container ${sidebarOpen ? 'is-sidebar-open' : ''}`}
    >
      <aside id="sidebar" className="sidebar-wrapper">
        <Sidebar />
      </aside>

      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar} />
      )}

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
          <div className="page-header">
            <h2>🔔 Notificaciones</h2>
            <div className="page-actions">
              <button
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'btn active' : 'btn'}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={filter === 'unread' ? 'btn active' : 'btn'}
              >
                No leídas ({unreadCount})
              </button>
              <button onClick={markAllAsRead} className="btn">
                Marcar todas como leídas
              </button>
            </div>
          </div>

          <div className="toolbar">
            <input
              type="search"
              placeholder="Buscar notificaciones…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input"
            />
          </div>

          {loading && <p>Cargando notificaciones…</p>}
          {err && !loading && <p style={{ color: 'red' }}>{err}</p>}

          {!loading && !err && filtered.length === 0 && (
            <div className="empty">
              <p>
                No hay notificaciones {filter === 'unread' ? 'no leídas' : ''}.
              </p>
            </div>
          )}

          {!loading && !err && filtered.length > 0 && (
            <div className="list">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className={`notif-card ${n.entregado ? 'read' : 'unread'}`}
                >
                  <div className="notif-header">
                    <span className="badge">
                      {n.entregado ? 'Leída' : 'Nueva'}
                    </span>
                    <span className="date">{formatDate(n.fecha)}</span>
                  </div>
                  <div className="notif-body">
                    <p className="message">{n.mensaje}</p>
                    {!!n.tarea_id && (
                      <p className="meta">
                        Tarea relacionada: <strong>#{n.tarea_id}</strong>
                      </p>
                    )}
                  </div>
                  {!n.entregado && (
                    <div className="notif-actions">
                      <button className="btn" onClick={() => markAsRead(n.id)}>
                        Marcar como leída
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
