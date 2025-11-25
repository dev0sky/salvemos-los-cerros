import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Cerro } from '@/types';
import { Link } from 'wouter';
import { IconArrowRight } from '@tabler/icons-react';

// Fix for default marker icon in Leaflet with Vite/Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  cerros: Cerro[];
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  cerros,
  center = [28.6353, -106.0889], // Chihuahua default center
  zoom = 12,
  height = '500px',
}) => {
  // Force a resize event to ensure map renders correctly
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border-soft shadow-sm relative z-0" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cerros.map((cerro) => (
          <Marker
            key={cerro.id}
            position={[cerro.location.lat, cerro.location.lng]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-1">{cerro.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Altitud: {cerro.altitude} m
                </p>
                <Link href={`/cerros/${cerro.id}`}>
                  <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Ver detalles <IconArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
