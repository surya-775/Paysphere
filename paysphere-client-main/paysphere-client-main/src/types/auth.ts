export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export type TRole = "user" | "agent" | "admin"
export type TActive = "active" | "blocked"

export interface TransactionId {
  _id: string
  fromWalletId: string
  type: string
}

export interface WalletId {
  _id: string
  balance: number
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  phone: string;
  feeRate?: number;
  commissionRate?: number;
  isActive: TActive;
  isApproved: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  transactionId: TransactionId[];
  createdAt: string;
  updatedAt: string;
  walletId: WalletId;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  phone: string;
  address?: string;
  picture?: string;
  feeRate?: number;
  commissionRate?: number;
  isActive: TActive;
  isApproved: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  transactionId: string[]
  createdAt: string;
  updatedAt: string;
  walletId: string;
}

export type TWalletStatus = "active" | "blocked"

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  phone: string;
  feeRate?: number;
  address?: string;
  picture?: string;
  commissionRate?: number;
  isActive: TActive;
  isApproved: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  transactionId: string[]
  createdAt: string;
  updatedAt: string;
  walletId?: {
    _id?: string;
    balance?: number;
    status?: TWalletStatus;
  }
}

export interface IUserUpdate {
  name?: string;
  phone?: string;
  feeRate?: number;
  address?: string;
  picture?: string;
  commissionRate?: number;
  isActive?: TActive;
  isApproved?: boolean;
  isVerified?: boolean;
  isDeleted?: boolean;
}