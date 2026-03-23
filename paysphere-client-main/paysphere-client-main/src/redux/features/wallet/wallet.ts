import { baseApi } from "@/redux/baseApi";
import type { IAddMoney, IMoneyResponse, IResponse, ITransferMoney, IWalletResponse } from "@/types";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMoney: builder.mutation<IResponse<IMoneyResponse>, IAddMoney>({
      query: (amount) => ({
        url: "/wallet/add-money",
        method: "POST",
        data: amount,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    sendMoney: builder.mutation<IResponse<IMoneyResponse>, ITransferMoney>({
      query: (sendMoneyData) => ({
        url: "/wallet/send",
        method: "POST",
        data: sendMoneyData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    withdrawMoney: builder.mutation<IResponse<IMoneyResponse>, ITransferMoney>({
      query: (withdrawMoneyData) => ({
        url: "/wallet/cash-out",
        method: "POST",
        data: withdrawMoneyData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    cashIn: builder.mutation<IResponse<IMoneyResponse>, ITransferMoney>({
      query: (cashInData) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: cashInData,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),
    blockedWallet: builder.mutation<IResponse<IWalletResponse>, string>({
      query: (id) => ({
        url: `/wallet/block/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER", "AGENT", "WALLET", "TRANSACTION"],
    }),
    unblockedWallet: builder.mutation<IResponse<IWalletResponse>, string>({
      query: (id) => ({
        url: `/wallet/unblock/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["USER", "AGENT", "WALLET", "TRANSACTION"],
    }),
  }),
});

export const {
  useAddMoneyMutation,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
  useCashInMutation, 
  useBlockedWalletMutation,
  useUnblockedWalletMutation
} = walletApi;