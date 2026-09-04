import { VenueItem, CelebrationItem } from '../types';

export const VENUE_INFO = {
  name: 'El Palmar Multiespacio',
  tagline: 'Cumpleaños infantiles, bautismos, comuniones y más eventos!',
  location: 'Villa Elisa, La Plata',
  address: 'C. 419 1459, B1894 La Plata, Provincia de Buenos Aires',
  phone: '+54 221 420-4507',
  phoneRaw: '542214204507',
  instagram: 'https://www.instagram.com/elpalmarmultiespacio',
  instagramUser: '@elpalmarmultiespacio',
  coordinates: {
    lat: -34.85968674444208,
    lng: -58.08683794602629,
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-34.85968674444208,-58.08683794602629',
};

export const HIGHLIGHT_PILLS = [
  { label: 'Pelotero & Inflable', icon: 'PartyPopper' },
  { label: 'Parrilla Equipada', icon: 'Flame' },
  { label: 'Vajilla Completa', icon: 'UtensilsCrossed' },
  { label: 'Mesas, Sillas & Puffs', icon: 'Armchair' },
  { label: 'Salón Climatizado', icon: 'AirVent' },
  { label: 'Atrio Vidriado & Parque', icon: 'SunMedium' },
];

export const VENUE_SECTIONS: VenueItem[] = [
  {
    id: 'salon-principal',
    title: 'Salón Principal y Living',
    category: 'salon',
    tag: 'Espacio Central',
    description:
      'Amplio salón climatizado con ventanales de doble altura, sistema de sonido ambiental, luces de fiesta e iluminación perimetral. Incluye cómodo living con respaldos capitoné de ecocuero negro y puffs modulares combinados en verde y negro.',
    highlights: [
      'Climatización frío/calor de gran potencia',
      'Living de diseño con sillones capitoné',
      'Iluminación escénica y decorativa',
      'Sonido profesional para ambientación',
    ],
    specs: 'Capacidad para eventos familiares y festejos dinámicos',
  },
  {
    id: 'pelotero-juegos',
    title: 'Pelotero Laberinto e Inflable',
    category: 'juegos',
    tag: 'Diversión Infantil',
    description:
      'Estructura de juegos protegida con redes de seguridad integrales, túneles de ascenso, tobogán tubular cerrado, piso de goma eva encastrable antigolpes y espacio para castillo inflable y mini mesas infantiles.',
    highlights: [
      'Tobogán tubular de alta seguridad',
      'Piso de impacto acolchado',
      'Redes perimetrales de protección',
      'Espacio para inflable y juegos coordinados',
    ],
    specs: 'Especialmente diseñado para niños de todas las edades',
  },
  {
    id: 'parrilla-exterior',
    title: 'Sector Parrilla & Asador',
    category: 'parrilla',
    tag: 'Gastronomía & Asados',
    description:
      'Sector de parrilla techado de excelente tiraje con mesada de apoyo y conexión directa al parque exterior y al salón. Ideal para agasajar a los invitados con asados, pizzas a la parrilla o catering caliente.',
    highlights: [
      'Parrilla de amplia capacidad',
      'Mesada de preparación',
      'Acceso directo desde el salón y parque',
      'Sector techado protegido de la intemperie',
    ],
    specs: 'Totalmente lista para uso durante el evento',
  },
  {
    id: 'mobiliario-vajilla',
    title: 'Mesas, Sillas & Vajilla Completa',
    category: 'comedor',
    tag: 'Equipamiento Incluido',
    description:
      'Mobiliario versátil que incluye mesas redondas y rectangulares con mantelería oscura, sillas ergonómicas combinadas con detalles en verde lima y vajilla completa disponible para adultos y niños.',
    highlights: [
      'Mesas redondas y tablones con manteles',
      'Sillas resistentes y puffs livianos',
      'Vajilla completa para el servicio',
      'Sector exclusivo para mesa dulce y torta',
    ],
    specs: 'Configuraciones adaptables según el tipo de evento',
  },
  {
    id: 'sanitarios-atrio',
    title: 'Sanitarios de Diseño & Atrio Vidriado',
    category: 'instalaciones',
    tag: 'Confort & Estilo',
    description:
      'Baños modernos equipados con mesada de madera natural, bacha rectangular de losa blanca y grifería monocomando. El complejo destaca por su impactante atrio vidriado que baña de luz natural las tardes y ofrece una vista nocturna iluminada.',
    highlights: [
      'Sanitarios limpios y modernos',
      'Fachada con estructura arquitectónica vidriada',
      'Ambiente luminoso y seguro',
      'Entorno parquizado en Villa Elisa',
    ],
    specs: 'Instalaciones cuidadas al detalle',
  },
];

export const CELEBRATION_STORIES: CelebrationItem[] = [
  {
    id: 'show-animacion',
    title: 'Shows de Animación & Monociclo',
    category: 'shows',
    subtitle: 'Risas y entretenimiento garantizado',
    description:
      'El salón cuenta con el espacio ideal para shows de títeres, payasos, monociclo, malabares y el fascinante show de burbujas gigantes donde los niños y sus familias participan activamente.',
    badge: 'Animación en Vivo',
  },
  {
    id: 'cumple-tematico',
    title: 'Cumpleaños Temáticos & Superhéroes',
    category: 'tematicas',
    subtitle: 'La fiesta soñada para cada homenajeado',
    description:
      'Desde fiestas con capas de superhéroes y bailes coreográficos, hasta temáticas de Avengers, princesas o personajes favoritos, el espacio se transforma para cada celebración.',
    badge: 'Temáticas Personalizadas',
  },
  {
    id: 'mesa-torta-candy',
    title: 'Mesa Principal & Momento de la Torta',
    category: 'decoracion',
    subtitle: 'El rincón más fotografiado del festejo',
    description:
      'Ubicación destacada para la mesa dulce frente al logo de El Palmar, con espacio para candy bar, guirnaldas, globos de números, bengalas y el tradicional canto de feliz cumpleaños con toda la familia.',
    badge: 'Candy Bar & Torta',
  },
  {
    id: 'eventos-familiares',
    title: 'Bautismos, Comuniones y 1er Añito',
    category: 'momentos',
    subtitle: 'Un espacio cálido y versátil',
    description:
      'Ideal tanto para la energía de los niños como para la comodidad de abuelos, tíos y amigos en un ambiente cómodo, seguro y con excelente atención.',
    badge: 'Eventos Familiares',
  },
];

export const EVENT_TYPES = [
  'Cumpleaños infantil',
  'Primer añito',
  'Bautismo',
  'Comunión',
  'Festejo familiar',
  'Otro evento',
];

export const TIME_SLOTS = [
  'Turno Tarde (14:00 a 17:30)',
  'Turno Tarde/Noche (18:00 a 21:30)',
  'Turno Noche (20:00 a 00:00)',
  'Horario a coordinar',
];
