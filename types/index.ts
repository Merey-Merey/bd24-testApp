export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  bitrix_contact_id?: number;
  created_at: string;
}

export interface Order {
  id: number;
  title: string;
  status: string;
  amount: number;
  date: string;
}

export interface Payment {
  id: number;
  title: string;
  status: 'completed' | 'pending' | 'failed';
  amount: number;
  date: string;
}