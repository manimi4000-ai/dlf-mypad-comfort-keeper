export interface Room {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  size: string;
  occupancy: string;
  price: string;
  features: string[];
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: "Suite" | "Lounge" | "Spa" | "Detail";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
