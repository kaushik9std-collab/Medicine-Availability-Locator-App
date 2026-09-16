import type { FamilyMember, Pharmacy, Reminder, Order, CartItem } from './types';

export const familyMembers: FamilyMember[] = [
  { id: '1', name: 'Arjun Kumar', age: 35, relation: 'Self', condition: 'Hypertension', avatar: 'AK' },
  { id: '2', name: 'Priya Kumar', age: 32, relation: 'Wife', condition: 'Diabetes Type 2', avatar: 'PK' },
  { id: '3', name: 'Rajan Kumar', age: 68, relation: 'Father', condition: 'Arthritis', avatar: 'RK' },
  { id: '4', name: 'Meena Kumar', age: 65, relation: 'Mother', condition: 'Thyroid', avatar: 'MK' },
  { id: '5', name: 'Aanya Kumar', age: 8, relation: 'Daughter', avatar: 'AK' },
];

export const pharmacies: Pharmacy[] = [
  { id: '1', name: 'Apollo Pharmacy', distance: '0.3 km', rating: 4.8, reviews: 1243, open: true, hours: '8:00 AM – 10:00 PM', address: '12 MG Road, Bengaluru', phone: '+91 80234 56789', available: true },
  { id: '2', name: 'MedPlus Health', distance: '0.7 km', rating: 4.5, reviews: 876, open: true, hours: '9:00 AM – 9:00 PM', address: '45 Brigade Road, Bengaluru', phone: '+91 80876 54321', available: true },
  { id: '3', name: 'Wellness Forever', distance: '1.2 km', rating: 4.2, reviews: 432, open: false, hours: '10:00 AM – 8:00 PM', address: '78 Residency Road, Bengaluru', phone: '+91 80123 45678', available: false },
  { id: '4', name: 'Frank Ross Pharmacy', distance: '1.8 km', rating: 4.6, reviews: 654, open: true, hours: '8:30 AM – 10:30 PM', address: '22 Commercial Street, Bengaluru', phone: '+91 80987 65432', available: false },
  { id: '5', name: "Netmeds Store", distance: '2.1 km', rating: 4.3, reviews: 321, open: true, hours: '9:00 AM – 9:30 PM', address: '5 Cunningham Road, Bengaluru', phone: '+91 80654 32109', available: true },
];

export const reminders: Reminder[] = [
  { id: '1', medicine: 'Amlodipine 5mg', time: '8:00 AM', frequency: 'Daily', stock: 12, active: true },
  { id: '2', medicine: 'Metformin 500mg', time: '1:00 PM', frequency: 'Twice daily', stock: 5, active: true },
  { id: '3', medicine: 'Thyronorm 50mcg', time: '7:00 AM', frequency: 'Daily (empty stomach)', stock: 28, active: false },
];

export const orders: Order[] = [
  { id: 'ORD-2024-001', date: '28 Jul 2026', pharmacy: 'Apollo Pharmacy', items: ['Paracetamol 500mg x2', 'Vitamin D3 x1'], total: 142, status: 'active' },
  { id: 'ORD-2024-002', date: '25 Jul 2026', pharmacy: 'MedPlus Health', items: ['Amlodipine 5mg x30'], total: 285, status: 'active' },
  { id: 'ORD-2024-003', date: '20 Jul 2026', pharmacy: 'Wellness Forever', items: ['Metformin 500mg x60', 'Glimepiride 2mg x30'], total: 420, status: 'delivered' },
  { id: 'ORD-2024-004', date: '10 Jul 2026', pharmacy: 'Apollo Pharmacy', items: ['Aspirin 75mg x30'], total: 98, status: 'delivered' },
];

export const defaultCart: CartItem[] = [
  { id: '1', name: 'Paracetamol 500mg', generic: 'Acetaminophen', price: 32, qty: 10, prescribed: false, cartQty: 2 },
  { id: '2', name: 'Vitamin D3 1000IU', generic: 'Cholecalciferol', price: 180, qty: 30, prescribed: false, cartQty: 1 },
];

export const walletTransactions = [
  { id: '1', type: 'credit', desc: 'Cashback – Order #ORD-2024-003', amount: 42, date: '20 Jul 2026' },
  { id: '2', type: 'debit', desc: 'Order #ORD-2024-002 Payment', amount: 285, date: '25 Jul 2026' },
  { id: '3', type: 'credit', desc: 'Top Up via PhonePe', amount: 500, date: '15 Jul 2026' },
  { id: '4', type: 'debit', desc: 'Order #ORD-2024-001 Payment', amount: 142, date: '28 Jul 2026' },
];
