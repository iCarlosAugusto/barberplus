export interface Haircut {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl?: string;
}

// Mock data for haircut services
const HAIRCUT_SERVICES: Haircut[] = [
  {
    id: 'haircut-1',
    name: 'Corte Clássico',
    description: 'Corte tradicional com tesoura e máquina',
    price: 45.00,
    duration: 30,
    imageUrl: '/images/classic-haircut.jpg'
  },
  {
    id: 'haircut-2',
    name: 'Barba Completa',
    description: 'Modelagem e hidratação da barba',
    price: 35.00,
    duration: 25,
    imageUrl: '/images/beard-trim.jpg'
  },
  {
    id: 'haircut-3',
    name: 'Combo Corte + Barba',
    description: 'Corte de cabelo e tratamento completo da barba',
    price: 70.00,
    duration: 50,
    imageUrl: '/images/combo-haircut-beard.jpg'
  },
  {
    id: 'haircut-4',
    name: 'Corte Degradê',
    description: 'Corte moderno com transição de comprimento',
    price: 55.00,
    duration: 35,
    imageUrl: '/images/fade-haircut.jpg'
  },
  {
    id: 'haircut-5',
    name: 'Hidratação Capilar',
    description: 'Tratamento profundo para cabelos danificados',
    price: 60.00,
    duration: 40,
    imageUrl: '/images/hair-treatment.jpg'
  }
];

/**
 * Get all available haircut services
 * @returns Array of haircut services
 */
export const getServices = (): Haircut[] => {
  return HAIRCUT_SERVICES;
};

/**
 * Get a specific haircut service by ID
 * @param id The ID of the haircut service
 * @returns The haircut service or undefined if not found
 */
export const getServiceById = (id: string): Haircut | undefined => {
  return HAIRCUT_SERVICES.find(service => service.id === id);
};

/**
 * Get services by search term
 * @param searchTerm The search term to filter services
 * @returns Filtered array of haircut services
 */
export const searchServices = (searchTerm: string): Haircut[] => {
  const term = searchTerm.toLowerCase();
  return HAIRCUT_SERVICES.filter(
    service => 
      service.name.toLowerCase().includes(term) || 
      service.description.toLowerCase().includes(term)
  );
};

/**
 * Get services filtered by price range
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @returns Filtered array of haircut services
 */
export const getServicesByPriceRange = (minPrice: number, maxPrice: number): Haircut[] => {
  return HAIRCUT_SERVICES.filter(
    service => service.price >= minPrice && service.price <= maxPrice
  );
};

/**
 * Get services filtered by duration
 * @param maxDuration Maximum duration in minutes
 * @returns Filtered array of haircut services
 */
export const getServicesByDuration = (maxDuration: number): Haircut[] => {
  return HAIRCUT_SERVICES.filter(service => service.duration <= maxDuration);
}; 