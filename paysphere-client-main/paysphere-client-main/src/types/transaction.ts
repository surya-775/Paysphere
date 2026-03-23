import type { TRole } from "./auth"

export interface ITransactionResponse {
  _id: string
  fromWalletId: FromWalletId
  toWalletId: ToWalletId
  type: string
  amount: number
  commission: number
  currentBalance: number
  initiatedBy: InitiatedBy
  purpose: string
  createdAt: string
  updatedAt: string
}

export interface InitiatedBy {
  _id?: string
  name?: string
  role?: TRole
}

export interface UserId {
  _id: string
  phone: string
}
export interface UserId2 {
  _id: string
  phone: string
}

export interface FromWalletId {
  _id: string
  userId: UserId
  balance: number
  currency: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ToWalletId {
  _id: string
  userId: UserId2
  balance: number
  currency: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface ITransactionAmountResponse {
  last7Days: number
  last30Days: number
}
export interface ITransactionSummaryResponse {
  totalFee: number
  totalAddMoney: number
  totalSendMoney: number
  totalReceiveMoney: number
  totalCashIn: number
  totalCashOut: number
  totalWithdraw: number
}

export interface IDashboardStatsResponse {
  walletBalance: number
  totalUsers: number
  totalAgents: number
  totalTransactions: number
}