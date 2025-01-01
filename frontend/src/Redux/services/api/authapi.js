import { clubapi } from "../clubapi";

export const authApi = clubapi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
        formData: true, 
      }),
    }),
    
    forgotpassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/password/forgot",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...credentials }) => ({
        url: `/auth/password/reset/${token}`, // ✅ Correct dynamic URL
        method: "PUT",
        body: credentials,
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/auth/userdetail",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutQuery, 
  useForgotpasswordMutation,
  useResetPasswordMutation,
  useGetUserDetailsQuery
} = authApi;
