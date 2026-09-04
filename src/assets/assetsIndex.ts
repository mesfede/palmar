// Centralized assets index for El Palmar Multiespacio

// Official Logo
import logoImg from '../components/El_palmar_logo_ok.png';

// Video
import heroVideo from '../components/palmar_videook.mp4';
import heroVideoAlt from '../components/video_palmar.mp4';

// Venue Images (El Lugar)
import lugar1 from '../components/palmar_lugar1.jpg';
import lugar2 from '../components/palmar_lugar2.jpg';
import lugar3 from '../components/palmar_lugar3.jpg';
import lugar4 from '../components/palmar_lugar4.jpg';
import lugar5 from '../components/palmar_lugar5.jpg';
import lugar6 from '../components/palmar_lugar6.jpg';
import lugar7 from '../components/palmar_lugar7.jpg';
import lugar8 from '../components/palmar_lugar8.jpg';
import lugar9 from '../components/palmar_lugar9.jpg';
import lugar10 from '../components/palmar_lugar10..jpg';

// Celebration Images (Festejos)
import festejo1 from '../components/palmar_festejo (1).jpg';
import festejo2 from '../components/palmar_festejo (2).jpg';
import festejo3 from '../components/palmar_festejo (3).jpg';
import festejo4_1 from '../components/palmar_festejo4 (1).jpg';
import festejo4_2 from '../components/palmar_festejo4 (2).jpg';
import festejo4_3 from '../components/palmar_festejo4 (3).jpg';

export const ASSETS = {
  logo: logoImg,
  video: heroVideo,
  videoAlt: heroVideoAlt,
  lugar: [
    { id: 1, src: lugar1, title: 'Salón Principal', desc: 'Living capitoné, iluminación y espacio climatizado' },
    { id: 2, src: lugar2, title: 'Pelotero & Laberinto', desc: 'Área de juegos con redes de seguridad y tobogán' },
    { id: 3, src: lugar3, title: 'Sector Parrilla Techada', desc: 'Asador equipado con conexión directa al salón' },
    { id: 4, src: lugar4, title: 'Mesas & Vajilla', desc: 'Mobiliario completo con mantelería y puffs' },
    { id: 5, src: lugar5, title: 'Estructura & Atrio', desc: 'Ambiente luminoso y moderno en Villa Elisa' },
    { id: 6, src: lugar6, title: 'Sanitarios de Diseño', desc: 'Baños impecables y funcionales' },
    { id: 7, src: lugar7, title: 'Sector Living & Puffs', desc: 'Sillones capitoné de ecocuero' },
    { id: 8, src: lugar8, title: 'Plaza de Juegos', desc: 'Piso antigolpes y juegos seguros' },
    { id: 9, src: lugar9, title: 'Comedor & Celebración', desc: 'Amplia capacidad para grandes y chicos' },
    { id: 10, src: lugar10, title: 'Instalaciones Integrales', desc: 'Todo preparado para tu fiesta' },
  ],
  festejos: [
    { id: 1, src: festejo1, title: 'Shows & Animación', desc: 'Burbujas gigantes, monociclo y risas en vivo' },
    { id: 2, src: festejo2, title: 'Cumpleaños Temáticos', desc: 'Decoración personalizada y disfraces' },
    { id: 3, src: festejo3, title: 'Mesa Dulce & Torta', desc: 'El momento más esperado del festejo' },
    { id: 4, src: festejo4_1, title: 'Diversión en el Pelotero', desc: 'Los chicos disfrutando con total seguridad' },
    { id: 5, src: festejo4_2, title: 'Festejos Familiares', desc: 'Bautismos, comuniones y 1er añito' },
    { id: 6, src: festejo4_3, title: 'Momentos Inolvidables', desc: 'Alegría compartida con familia y amigos' },
  ],
};
