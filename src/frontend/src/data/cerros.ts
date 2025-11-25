import { getStaticPhoto, IMAGE_TOPICS } from '@/services/imageService';

export interface Cerro {
  id: string;
  name: string;
  altitude: number;
  location: {
    municipality: string;
    lat: number;
    lng: number;
  };
  geology: {
    rock: string;
    age: string;
    notes: string;
  };
  ecological_value: {
    flora: string[];
    fauna: string[];
    cultural: string[];
  };
  materials: {
    minerals: string;
  };
  legal_status: {
    proposed_protection: string;
    status: string;
  };
  threats: string[];
  image: string;
}

export const CERROS: Cerro[] = [
  {
    id: 'cerro-grande',
    name: 'Cerro Grande (Arewákawi)',
    altitude: 1900,
    location: {
      municipality: 'Chihuahua, Chihuahua',
      lat: 28.5950,
      lng: -106.0950,
    },
    geology: {
      rock: 'Toba ignimbrita (ígnea extrusiva)',
      age: 'Oligoceno',
      notes: 'También hay granodiorita intrusiva en la base.',
    },
    ecological_value: {
      flora: [
        'Encino chihuahuense (Quercus chihuahuensis)',
        'Cactus diversos',
        'Arbustos nativos',
      ],
      fauna: [
        'Cánidos (se han encontrado excrementos)',
        'Felinos',
        'Otras especies silvestres',
      ],
      cultural: [
        'Cuevas con pinturas rupestres (INAH)',
        '‘Ojo de agua’ como fuente de agua para fauna',
        'Importancia simbólica para la identidad de Chihuahua y como cerro sagrado Rarámuri',
      ],
    },
    materials: {
      minerals: 'Inventario de recursos minerales documenta presencia de rocas ígneas, pómice, posiblemente material volcánico útil.',
    },
    legal_status: {
      proposed_protection: 'ANP / Zona de valorización ecológica',
      status: 'Zona E en el PDU de Chihuahua según plan urbano municipal',
    },
    threats: [
      'Urbanización',
      'Destrucción del paisaje y cuevas',
      'Presión inmobiliaria',
    ],
    image: getStaticPhoto(IMAGE_TOPICS.MOUNTAINS, 1200, 800),
  },
  {
    id: 'cerro-coronel',
    name: 'Cerro Coronel (Guaguachic)',
    altitude: 1655,
    location: {
      municipality: 'Chihuahua, Chihuahua',
      lat: 28.6250,
      lng: -106.0600,
    },
    geology: {
      rock: 'Ignimbrita riolítica (volcánica extinta)',
      age: 'Oligoceno',
      notes: 'Origen volcánico según inventario geológico.',
    },
    ecological_value: {
      flora: [
        'Vegetación desértica / arbustos escasos',
      ],
      fauna: [
        'Fauna local desértica, posible riesgo de deslizamientos de rocas',
      ],
      cultural: [
        'Símbolo de la ciudad, mirador urbano',
      ],
    },
    materials: {
      minerals: 'Se reporta que antiguamente fue mina de oro.',
    },
    legal_status: {
      proposed_protection: 'ANP (Zona E para preservación ecológica según municipio)',
      status: 'Protección municipal prevista en Plan Desarrollo Urbano.',
    },
    threats: [
      'Deslizamientos por laderas fracturadas',
      'Urbanización',
      'Presión para desarrollo',
    ],
    image: getStaticPhoto(IMAGE_TOPICS.REFORESTATION, 1200, 800),
  },
  {
    id: 'picos-de-la-luna',
    name: 'Picos de la Luna',
    altitude: 1704,
    location: {
      municipality: 'Chihuahua, Chihuahua',
      lat: 28.7000,
      lng: -106.0500,
    },
    geology: {
      rock: 'Caliza',
      age: 'Cretácico',
      notes: 'Formaciones kársticas.',
    },
    ecological_value: {
      flora: [
        'Formaciones rocosas, cactus locales',
      ],
      fauna: [
        'Especies desérticas y serranas',
      ],
      cultural: [
        'Área popular para senderismo',
        'Paisaje emblemático en la sierra Nombre de Dios',
      ],
    },
    materials: {
      minerals: 'La sierra Nombre de Dios tiene explotación de caliza, toba, piedras agregadas según atlas de materias primas.',
    },
    legal_status: {
      proposed_protection: 'ANP / Zona natural protegida',
      status: 'IMPULSO por IMPLAN para declararla área protegida.',
    },
    threats: [
      'Urbanización',
      'Actividades recreativas descontroladas',
      'Explotación de material pétreo',
    ],
    image: getStaticPhoto(IMAGE_TOPICS.NATURE, 1200, 800),
  },
  {
    id: 'canon-del-marro',
    name: 'Cañón del Marro',
    altitude: 1550,
    location: {
      municipality: 'Chihuahua, Chihuahua',
      lat: 28.5500,
      lng: -106.1500,
    },
    geology: {
      rock: 'Riolita',
      age: 'Oligoceno',
      notes: 'Formación de cañón por erosión.',
    },
    ecological_value: {
      flora: [
        'Vegetación serrana, especies nativas',
      ],
      fauna: [
        'Especies de la sierra Nombre de Dios',
      ],
      cultural: [
        'Paisaje escénico, uso para senderismo',
      ],
    },
    materials: {
      minerals: 'Potencial de explotación de materiales pétreos según plan de materias primas.',
    },
    legal_status: {
      proposed_protection: 'ANP (área de preservación ecológica)',
      status: 'Incluido en propuesta para ANP de cuatro cerros según consejo municipal.',
    },
    threats: [
      'Urbanización',
      'Desarrollo de fraccionamientos',
      'Impacto recreativo',
    ],
    image: getStaticPhoto(IMAGE_TOPICS.CONSERVATION, 1200, 800),
  },
  {
    id: 'sierra-nombre-de-dios',
    name: 'Sierra Nombre de Dios',
    altitude: 1600,
    location: {
      municipality: 'Chihuahua, Chihuahua',
      lat: 28.6800,
      lng: -106.0800,
    },
    geology: {
      rock: 'Caliza y Toba',
      age: 'Cretácico / Terciario',
      notes: 'Complejo sistema montañoso.',
    },
    ecological_value: {
      flora: [
        'Cactus Echinocereus palmeri (endémico)',
        'Otras especies desertícolas',
      ],
      fauna: [
        'Pecarí de collar (Dicotyles tajacu)',
        'Halcón cola roja (Buteo jamaicensis)',
        'Cacomixtle norteño (Bassariscus astutus)',
        'Tarántula gris mexicana (Aphonopelma pallidum)',
        'Águila real (Aquila chrysaetos)',
      ],
      cultural: [
        'Pinturas rupestres en cuevas',
        'Importancia histórica y arqueológica',
      ],
    },
    materials: {
      minerals: 'Explotación de piedra caliza, arcillas, agregados pétreos, toba, sílice, perlita, carbonato de calcio.',
    },
    legal_status: {
      proposed_protection: 'Monumento Natural (ANP estatal)',
      status: 'Consulta pública iniciada para declararla ANP.',
    },
    threats: [
      'Explotación minera / canteras',
      'Urbanización irregular',
      'Incendios forestales',
    ],
    image: getStaticPhoto(IMAGE_TOPICS.BIRDS, 1200, 800),
  },
];
