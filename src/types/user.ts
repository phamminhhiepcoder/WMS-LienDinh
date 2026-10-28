export interface Address {
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface UserAddress {
  _id?: string;
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  isDefault: boolean;
}

export type UserRole = 'employee' | 'admin';

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  address?: Address;
  addresses?: UserAddress[];
  createdAt?: string;
  updatedAt?: string;
}
