import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './AgendaPage.module.css';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  provider: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const AgendaPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Consulta médica',
      date: '2025-01-22',
      time: '10:00',
      provider: 'Dr. Juan Pérez',
      service: 'Consulta general',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Cita odontológica',
      date: '2025-01-22',
      time: '14:30',
      provider: 'Dra. María García',
      service: 'Limpieza dental',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Sesión de fisioterapia',
      date: '2025-01-23',
      time: '09:15',
      provider: 'Lic. Carlos López',
      service: 'Rehabilitación',
      status: 'confirmed'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    provider: '',
    service: ''
  });

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Editar cita existente
      const updatedAppointments = appointments.map(app =>
        app.id === editingAppointment.id
          ? { ...app, ...newAppointment }
          : app
      );
      setAppointments(updatedAppointments);
      setEditingAppointment(null);
    } else {
      // Agregar nueva cita
      const appointment: Appointment = {
        id: Date.now().toString(),
        ...newAppointment,
        status: 'pending'
      };
      setAppointments([...appointments, appointment]);
    }
    
    setNewAppointment({ title: '', date: '', time: '', client: '', service: '' });
    setShowForm(false);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment({
      title: appointment.title,
      date: appointment.date,
      time: appointment.time,
      provider: appointment.provider,
      service: appointment.service
    });
    setShowForm(true);
  };

  const handleDeleteClick = (appointmentId: string) => {
    setAppointmentToDelete(appointmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter(app => app.id !== appointmentToDelete));
      setAppointmentToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setAppointmentToDelete(null);
    setShowDeleteModal(false);
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    const updatedAppointments = appointments.map(app =>
      app.id === appointmentId ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedAppointments);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingAppointment(null);
    setNewAppointment({ title: '', date: '', time: '', provider: '', service: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  return (
    <Layout>
      <div className={styles.agendaContainer}>
        <div className={styles.header}>
          <h1>Mi Agenda</h1>
          <button 
            onClick={() => setShowForm(true)}
            className={styles.addBtn}
          >
            ➕ Nueva cita
          </button>
        </div>

        {showForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>{editingAppointment ? 'Editar Cita' : 'Nueva Cita'}</h3>
              <form onSubmit={handleAddAppointment}>
                <input
                  type="text"
                  placeholder="Título"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                  required
                />
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  required
                />
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Profesional/Doctor"
                  value={newAppointment.provider}
                  onChange={(e) => setNewAppointment({...newAppointment, provider: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Servicio"
                  value={newAppointment.service}
                  onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                  required
                />
                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.saveBtn}>
                    {editingAppointment ? 'Guardar Cambios' : 'Guardar'}
                  </button>
                  <button type="button" onClick={closeForm} className={styles.cancelBtn}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className={styles.confirmModal}>
            <div className={styles.confirmContent}>
              <h3>¿Eliminar cita?</h3>
              <p>Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar esta cita?</p>
              <div className={styles.confirmButtons}>
                <button onClick={confirmDelete} className={styles.confirmDeleteBtn}>
                  Eliminar
                </button>
                <button onClick={cancelDelete} className={styles.cancelDeleteBtn}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.appointmentsList}>
          {appointments.map((appointment) => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.appointmentHeader}>
                <h3>{appointment.title}</h3>
                <span 
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <div className={styles.appointmentDetails}>
                <p><strong>📅 Fecha:</strong> {new Date(appointment.date).toLocaleDateString('es-ES')}</p>
                <p><strong>🕐 Hora:</strong> {appointment.time}</p>
                <p><strong>�‍⚕️ Profesional:</strong> {appointment.provider}</p>
                <p><strong>💼 Servicio:</strong> {appointment.service}</p>
              </div>
              <div className={styles.cardActions}>
                <button 
                  onClick={() => handleEditAppointment(appointment)}
                  className={styles.editBtn}
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={() => handleDeleteClick(appointment.id)}
                  className={styles.deleteBtn}
                >
                  🗑️ Eliminar
                </button>
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                  style={{ 
                    padding: '6px 8px', 
                    borderRadius: '6px', 
                    border: '1px solid #ccc',
                    fontSize: '12px'
                  }}
                >
                  <option value="pending">Pendiente</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="completed">Completada</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className={styles.empty}>
            <p>No tienes citas programadas</p>
            <button onClick={() => setShowForm(true)} className={styles.addBtn}>
              Agendar primera cita
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AgendaPage;
