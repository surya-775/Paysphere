import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUserResponse } from "@/types";

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllAgent: builder.query<IResponse<IUserResponse[]>, unknown>({
      query: (params) => ({
        url: "/agent",
        method: "GET",
        params
      }),
      providesTags: ["AGENT"],
    }),

    approvedAgent: builder.mutation<IResponse<IUserResponse>, string>({
      query: (id) => ({
        url: `/agent/approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["AGENT", "WALLET", "TRANSACTION"],
    }),

    suspendedAgent: builder.mutation<IResponse<IUserResponse>, string>({
      query: (id) => ({
        url: `/agent/suspend/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["AGENT", "WALLET", "TRANSACTION"],
    }),

  }),
});

export const {
  useGetAllAgentQuery,
  useApprovedAgentMutation,
  useSuspendedAgentMutation
} = agentApi;