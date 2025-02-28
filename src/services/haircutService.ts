export interface Haircut {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
}

export const fetchHaircuts = async (): Promise<Haircut[]> => {
  try {
    const response = await fetch('http://localhost:3001/haircuts');
    if (!response.ok) {
      throw new Error('Failed to fetch haircuts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching haircuts:', error);
    throw error;
  }
}; 