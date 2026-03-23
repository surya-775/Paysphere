import { baseApi } from "@/redux/baseApi";
import type { IDashboardStatsResponse, IResponse, ITransactionAmountResponse, ITransactionResponse, ITransactionSummaryResponse } from "@/types";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query<IResponse<ITransactionResponse[]>, unknown>({
      query: (params) => ({
        url: "/transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTION"],
    }),
    
    getMyTransaction: builder.query<IResponse<ITransactionResponse[]>, unknown>({
      query: (params) => ({
        url: "/transaction/my-transaction",
        method: "GET",
        params
      }),
      providesTags: ["TRANSACTION"],
    }),

    getDashboardStats: builder.query<IResponse<IDashboardStatsResponse>, unknown>({
      query: () => ({
        url: "/stats/dashboard-stats",
        method: "GET",
      }),
      providesTags: ["TRANSACTION", "WALLET", "USER", "AGENT"],
    }),
    
    getMyTransactionAmount: builder.query<IResponse<ITransactionAmountResponse>, unknown>({
      query: () => ({
        url: "/stats/transaction-amount",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

    getAllTransactionSummary: builder.query<IResponse<ITransactionSummaryResponse>, unknown>({
      query: () => ({
        url: "/stats/transaction-summary",
        method: "GET",
      }),
      providesTags: ["TRANSACTION"],
    }),

  }),
});

export const {
  useGetAllTransactionQuery,
  useGetMyTransactionQuery,
  useGetDashboardStatsQuery,
  useGetMyTransactionAmountQuery,
  useGetAllTransactionSummaryQuery,
} = transactionApi;