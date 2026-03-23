import { baseApi } from "@/redux/baseApi";
import type { ILogin, ILoginResponse, IRegister, IRegisterResponse, IResponse, IUserResponse, IUserUpdate } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    userRegister: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    agentRegister: builder.mutation<IResponse<IRegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/agent/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    changePassword: builder.mutation<IResponse<null>, { oldPassword: string; newPassword: string }>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        data: payload,
      }),
    }),
    userInfo: builder.query<IUserResponse, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["WALLET", "TRANSACTION"],
      transformResponse: (res:  IResponse<IUserResponse>) => res.data
    }),

    updateUser: builder.mutation<IResponse<IUserResponse>, { userId: string; payload: IUserUpdate }>({
      query: ({ userId, payload }) => ({
        url: `/auth/${userId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["WALLET", "TRANSACTION"],
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useUserRegisterMutation,
  useAgentRegisterMutation,
  useChangePasswordMutation,
  useUserInfoQuery,
  useUpdateUserMutation
} = authApi;