import React from 'react';
import { IconMountain, IconMapPin, IconAlertTriangle, IconLeaf, IconPaw, IconHistory, IconPick } from '@tabler/icons-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cerro } from '@/data/cerros';
import { MapComponent } from '@/components/Map/MapComponent';

interface CerroDetailProps {
  cerro: Cerro;
}

export const CerroDetail: React.FC<CerroDetailProps> = ({ cerro }) => {
  return (
    <div className="space-y-8">
      {/* Header Image */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden">
        <img 
          src={cerro.image} 
          alt={cerro.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <div className="text-white">
            <Badge variant="primary" className="mb-2">{cerro.altitude} m</Badge>
            <h1 className="text-4xl font-bold mb-2">{cerro.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <IconMapPin size={20} />
              <span>{cerro.location.municipality}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ecological Value */}
          <section>
            <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
              <IconLeaf className="text-primary" /> Valor Ecológico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <IconLeaf size={18} /> Flora
                </h3>
                <ul className="list-disc list-inside text-text-muted space-y-1">
                  {cerro.ecological_value.flora.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <IconPaw size={18} /> Fauna
                </h3>
                <ul className="list-disc list-inside text-text-muted space-y-1">
                  {cerro.ecological_value.fauna.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* Cultural & Geology */}
          <section>
            <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
              <IconHistory className="text-primary" /> Historia y Geología
            </h2>
            <Card className="space-y-4">
              <div>
                <h3 className="font-semibold text-text-main mb-2">Valor Cultural</h3>
                <ul className="list-disc list-inside text-text-muted space-y-1">
                  {cerro.ecological_value.cultural.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border-soft pt-4">
                <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
                  <IconMountain size={18} /> Geología
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted block">Tipo de Roca:</span>
                    <span className="font-medium text-text-main">{cerro.geology.rock}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Era Geológica:</span>
                    <span className="font-medium text-text-main">{cerro.geology.age}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-text-muted block">Notas:</span>
                    <span className="text-text-main">{cerro.geology.notes}</span>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map */}
          <Card className="p-0 overflow-hidden">
            <MapComponent 
              cerros={[cerro]} 
              center={[cerro.location.lat, cerro.location.lng]} 
              zoom={14} 
              height="300px"
            />
          </Card>

          {/* Legal Status */}
          <Card>
            <h3 className="font-semibold text-text-main mb-3">Estatus Legal</h3>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wider">Protección Propuesta</span>
                <p className="font-medium text-primary">{cerro.legal_status.proposed_protection}</p>
              </div>
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wider">Estado Actual</span>
                <p className="text-sm text-text-main">{cerro.legal_status.status}</p>
              </div>
            </div>
          </Card>

          {/* Threats */}
          <Card className="border-red-100 bg-red-50/30">
            <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
              <IconAlertTriangle size={18} /> Amenazas
            </h3>
            <ul className="space-y-2">
              {cerro.threats.map((threat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {threat}
                </li>
              ))}
            </ul>
          </Card>

          {/* Materials */}
          <Card>
            <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
              <IconPick size={18} /> Recursos Minerales
            </h3>
            <p className="text-sm text-text-muted">
              {cerro.materials.minerals}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
