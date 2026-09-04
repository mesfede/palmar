export interface VenueItem {
  id: string;
  title: string;
  category: 'salon' | 'juegos' | 'parrilla' | 'comedor' | 'instalaciones';
  description: string;
  tag: string;
  highlights: string[];
  specs?: string;
}

export interface CelebrationItem {
  id: string;
  title: string;
  category: 'shows' | 'tematicas' | 'decoracion' | 'momentos';
  subtitle: string;
  description: string;
  badge: string;
}

export interface ReservationFormData {
  fullName: string;
  phone: string;
  eventType: string;
  date: string;
  timeSlot: string;
  guestCount: string;
  includedServices: string[];
  message: string;
}
