export type Page =
  | 'home'
  | 'search'
  | 'family'
  | 'reminders'
  | 'orders'
  | 'wallet'
  | 'cart'
  | 'prescription'
  | 'domain'
  | 'history'
  | 'login';

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  condition?: string;
  avatar: string;
}

export interface Medicine {
  id: string;
  name: string;
  generic: string;
  price: number;
  qty: number;
  prescribed: boolean;
  image?: string;
}

export interface CartItem extends Medicine {
  cartQty: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  distance: string;
  rating: number;
  reviews: number;
  open: boolean;
  hours: string;
  address: string;
  phone: string;
  available: boolean;
}

export interface Reminder {
  id: string;
  medicine: string;
  time: string;
  frequency: string;
  stock: number;
  active: boolean;
}

export interface Order {
  id: string;
  date: string;
  pharmacy: string;
  items: string[];
  total: number;
  status: 'active' | 'delivered' | 'cancelled';
}
