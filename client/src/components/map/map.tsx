import { useEffect, useRef } from 'react';
import L, { Map as LeafletMap, Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityOffer, OfferLocation } from '../../types/offer';

// Исправление иконок для Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

// Создаем кастомные иконки
const defaultIcon = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
  shadowUrl: '', // убираем тень если файла нет
});

const activeIcon = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
  shadowUrl: '',
});

type MapPoint = {
  id: string;
  location: OfferLocation;
};

type MapProps = {
  city: CityOffer;
  points: MapPoint[];
  className: string;
  selectedPoint?: MapPoint;
};

function Map({ city, points, className, selectedPoint }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  // ДЕБАГ: Выводим пропсы
  console.log('=== MAP COMPONENT DEBUG ===');
  console.log('City:', city);
  console.log('Points count:', points?.length);
  console.log('Points:', points);
  console.log('Selected point:', selectedPoint);
  console.log('CSS Class:', className);

  // Проверяем валидность данных
  if (!city || !city.location) {
    console.error('Map: Invalid city data!', city);
    return <div className={`${className} map`} style={{ height: '500px', backgroundColor: '#eee' }}>
      <p style={{ textAlign: 'center', padding: '20px' }}>City data is missing</p>
    </div>;
  }

  // Инициализация карты - ТОЛЬКО ОДИН РАЗ
  useEffect(() => {
    console.log('Map useEffect: Initializing map...');
    
    if (!mapRef.current) {
      console.error('Map: mapRef.current is null!');
      return;
    }

    if (mapInstanceRef.current) {
      console.log('Map: Already initialized, skipping...');
      return;
    }

    try {
      console.log('Creating Leaflet map with center:', [city.location.latitude, city.location.longitude]);
      
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: city.location.zoom,
        zoomControl: false, // убираем стандартные контролы
      });

      // Добавляем тайлы
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Добавляем кастомный контрол зума
      L.control.zoom({
        position: 'topright'
      }).addTo(mapInstanceRef.current);

      console.log('Map: Successfully initialized!');

    } catch (error) {
      console.error('Map: Failed to initialize!', error);
    }

    // Очистка при размонтировании
    return () => {
      console.log('Map: Cleaning up...');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, []); // Пустой массив зависимостей - инициализируем только один раз

  // Обновление маркеров и центра при изменении данных
  useEffect(() => {
    console.log('Map useEffect: Updating markers and view...');
    
    const map = mapInstanceRef.current;
    if (!map) {
      console.log('Map: Map not ready yet, skipping markers...');
      return;
    }

    // Устанавливаем центр и зум
    try {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      console.log('Map: View set to', [city.location.latitude, city.location.longitude], 'zoom:', city.location.zoom);
    } catch (error) {
      console.error('Map: Failed to set view!', error);
    }

    // Удаляем старые маркеры
    console.log('Map: Removing', markersRef.current.length, 'old markers');
    markersRef.current.forEach((marker) => {
      try {
        marker.remove();
      } catch (error) {
        console.warn('Map: Failed to remove marker', error);
      }
    });
    markersRef.current = [];

    // Проверяем есть ли точки для отображения
    if (!points || points.length === 0) {
      console.warn('Map: No points to display');
      return;
    }

    // Добавляем новые маркеры
    console.log('Map: Adding', points.length, 'new markers');
    points.forEach((point) => {
      try {
        // Проверяем что у точки есть координаты
        if (!point.location || typeof point.location.latitude !== 'number' || typeof point.location.longitude !== 'number') {
          console.warn('Map: Invalid point location:', point);
          return;
        }

        const isActive = selectedPoint && point.id === selectedPoint.id;
        const marker = L.marker([point.location.latitude, point.location.longitude], {
          icon: isActive ? activeIcon : defaultIcon,
        }).addTo(map);
        
        markersRef.current.push(marker);
        
        console.log(`Map: Added marker for ${point.id} at`, [point.location.latitude, point.location.longitude], 'active:', isActive);
      } catch (error) {
        console.error('Map: Failed to add marker for point:', point, error);
      }
    });

  }, [city, points, selectedPoint]); // Зависимости: обновляем при изменении данных

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
      style={{ 
        height: '500px', 
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
}

export { Map };