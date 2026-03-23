import { baseApi } from "@/redux/baseApi";
import type { IResponse, IUserResponse } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<IResponse<IUserResponse[]>, unknown>({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params
      }),
      providesTags: ["USER", "WALLET"],
    })
  }),
});

export const {
  useGetAllUserQuery
} = userApi;