import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './AgendaPage.module.css';

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  client: string;
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
      client: 'Juan Pérez',
      service: 'Consulta general',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Revisión',
      date: '2025-01-22',
      time: '14:30',
      client: 'María García',
      service: 'Revisión anual',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Tratamiento',
      date: '2025-01-23',
      time: '09:15',
      client: 'Carlos López',
      service: 'Fisioterapia',
      status: 'confirmed'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    client: '',
    service: ''
  });

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'pending'
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({ title: '', date: '', time: '', client: '', service: '' });
    setShowForm(false);
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
              <h3>Nueva Cita</h3>
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
                  placeholder="Cliente"
                  value={newAppointment.client}
                  onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
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
                  <button type="submit" className={styles.saveBtn}>Guardar</button>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>
                    Cancelar
                  </button>
                </div>
              </form>
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
                <p><strong>👤 Cliente:</strong> {appointment.client}</p>
                <p><strong>💼 Servicio:</strong> {appointment.service}</p>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className={styles.empty}>
            <p>No tienes citas programadas</p>
            <button onClick={() => setShowForm(true)} className={styles.addBtn}>
              Agregar primera cita
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AgendaPage;
