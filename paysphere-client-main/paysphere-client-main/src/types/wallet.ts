import type { TRole } from "./auth"

export interface IWalletResponse {
  _id: string
  userId: UserId
  balance: number
  currency: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface UserId {
  _id: string
  name: string
  role: TRole
}

export interface IAddMoney {
  amount: number
}
export interface ITransferMoney {
  walletId: string;
  amount: number;
}

export type TTransactionType = "add_money" | "send_money" | "fee" | "withdraw" | "cash_in" | "cash_out" | "receive_money"

export interface IMoneyResponse {
  _id: string
  fromWalletId?: string
  toWalletId: string
  type: TTransactionType
  amount: number
  currentBalance: number
  initiatedBy: string
  purpose: string
  createdAt: string
  updatedAt: string
}