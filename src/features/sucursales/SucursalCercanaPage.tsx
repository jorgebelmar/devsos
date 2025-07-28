import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './SucursalCercanaPage.module.css';

interface Sucursal {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviews: number;
  phone: string;
  services: string[];
  openTime: string;
  closeTime: string;
  isOpen: boolean;
  category: string;
}

const SucursalCercanaPage = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [filteredSucursales, setFilteredSucursales] = useState<Sucursal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo
  const mockSucursales: Sucursal[] = [
    {
      id: '1',
      name: 'Centro Médico Las Condes',
      address: 'Av. Las Condes 123, Las Condes',
      distance: 0.8,
      rating: 4.8,
      reviews: 124,
      phone: '+56 2 2345 6789',
      services: ['Medicina General', 'Cardiología', 'Pediatría'],
      openTime: '08:00',
      closeTime: '20:00',
      isOpen: true,
      category: 'medico'
    },
    {
      id: '2',
      name: 'Salón de Belleza Glamour',
      address: 'Providencia 456, Providencia',
      distance: 1.2,
      rating: 4.6,
      reviews: 89,
      phone: '+56 2 2987 6543',
      services: ['Corte de Cabello', 'Manicure', 'Pedicure', 'Maquillaje'],
      openTime: '09:00',
      closeTime: '19:00',
      isOpen: true,
      category: 'belleza'
    },
    {
      id: '3',
      name: 'Clínica Dental Sonrisa',
      address: 'Ñuñoa 789, Ñuñoa',
      distance: 2.1,
      rating: 4.9,
      reviews: 156,
      phone: '+56 2 2456 7890',
      services: ['Limpieza Dental', 'Ortodoncia', 'Implantes'],
      openTime: '08:30',
      closeTime: '18:30',
      isOpen: false,
      category: 'dental'
    },
    {
      id: '4',
      name: 'Spa & Wellness Center',
      address: 'Vitacura 321, Vitacura',
      distance: 3.5,
      rating: 4.7,
      reviews: 203,
      phone: '+56 2 2654 3210',
      services: ['Masajes', 'Tratamientos Faciales', 'Reflexología'],
      openTime: '10:00',
      closeTime: '21:00',
      isOpen: true,
      category: 'spa'
    },
    {
      id: '5',
      name: 'Centro Fisioterapia Activa',
      address: 'Maipú 654, Maipú',
      distance: 4.2,
      rating: 4.5,
      reviews: 67,
      phone: '+56 2 2321 9876',
      services: ['Fisioterapia', 'Rehabilitación', 'Kinesiología'],
      openTime: '07:00',
      closeTime: '20:00',
      isOpen: true,
      category: 'fisioterapia'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadSucursales = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSucursales(mockSucursales);
      setFilteredSucursales(mockSucursales);
      setIsLoading(false);
    };

    loadSucursales();
  }, []);

  useEffect(() => {
    let filtered = sucursales;

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(sucursal => sucursal.category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(sucursal =>
        sucursal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sucursal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sucursal.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredSucursales(filtered);
  }, [sucursales, searchTerm, selectedCategory]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className={styles.stars}>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
      </div>
    );
  };

  const handleAgendarCita = (sucursal: Sucursal) => {
    // Aquí se podría abrir un modal o navegar a una página de agendamiento
    alert(`Agendar cita en: ${sucursal.name}`);
  };

  const handleVerDetalles = (sucursal: Sucursal) => {
    // Aquí se podría abrir un modal con más detalles
    alert(`Ver detalles de: ${sucursal.name}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <p>Buscando sucursales cercanas...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.sucursalesContainer}>
        <div className={styles.header}>
          <h1>Sucursales Cercanas</h1>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre, dirección o servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="todos">Todas las categorías</option>
            <option value="medico">Médico</option>
            <option value="dental">Dental</option>
            <option value="belleza">Belleza</option>
            <option value="spa">Spa & Wellness</option>
            <option value="fisioterapia">Fisioterapia</option>
          </select>
        </div>

        {filteredSucursales.length > 0 ? (
          <div className={styles.sucursalesList}>
            {filteredSucursales.map((sucursal) => (
              <div key={sucursal.id} className={styles.sucursalCard}>
                <div className={styles.sucursalHeader}>
                  <h3 className={styles.sucursalName}>{sucursal.name}</h3>
                  <span className={styles.distanceBadge}>
                    {sucursal.distance.toFixed(1)} km
                  </span>
                </div>

                <div className={styles.sucursalInfo}>
                  <div className={styles.infoItem}>
                    📍<strong>{sucursal.address}</strong>
                  </div>
                  <div className={styles.infoItem}>
                    📞<strong>{sucursal.phone}</strong>
                  </div>
                  <div className={styles.infoItem}>
                    🕐<strong>{sucursal.openTime} - {sucursal.closeTime}</strong>
                    <span className={`${styles.openStatus} ${sucursal.isOpen ? styles.open : styles.closed}`}>
                      {sucursal.isOpen ? ' • Abierto' : ' • Cerrado'}
                    </span>
                  </div>
                </div>

                <div className={styles.rating}>
                  {renderStars(sucursal.rating)}
                  <span className={styles.ratingText}>
                    {sucursal.rating} ({sucursal.reviews} reseñas)
                  </span>
                </div>

                <div className={styles.servicesList}>
                  {sucursal.services.map((service, index) => (
                    <span key={index} className={styles.serviceTag}>
                      {service}
                    </span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button 
                    className={styles.primaryBtn}
                    onClick={() => handleAgendarCita(sucursal)}
                    disabled={!sucursal.isOpen}
                  >
                    {sucursal.isOpen ? 'Agendar Cita' : 'Cerrado'}
                  </button>
                  <button 
                    className={styles.secondaryBtn}
                    onClick={() => handleVerDetalles(sucursal)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No se encontraron sucursales que coincidan con tu búsqueda</p>
            <p>Intenta con otros términos o cambia el filtro de categoría</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SucursalCercanaPage;
