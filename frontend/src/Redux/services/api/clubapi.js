import { clubapi } from "../clubapi";

export const ClubApi = clubapi.injectEndpoints({
  endpoints: (builder) => ({
    registerClub: builder.mutation({
      query: (data) => ({
        url: "/admin/registerClub",
        method: "POST",
        body: data,
      }),
    }),
    registeruserinClub: builder.mutation({
      query: ({ clubId, userId }) => ({
        url: `/admin/RegisterinClub/${clubId}`, 
        method: "POST",
        body: { userId }, 
        headers: { "Content-Type": "application/json" },
      }),
    }),
    
    
    deleteClub: builder.mutation({
      query: (id) => ({
        url: `/admin/deleteClub/${id}`,
        method: "DELETE",
      }),
    }),

    getsingleClub: builder.query({
      query: (id) => ({
        url: `/admin/getClub/${id}`,
        method: "GET",
      }),
    }),

    getAllClubs: builder.query({
      query: () => ({
        url: "/admin/getClubs",
        method: "GET",
      }),
    }),

    getClubMembers: builder.query({
      query: (clubId) => ({
        url: `/admin/getClubMembers/${clubId}`,
        method: "GET",
      }),
    }),

    getPremiumMembers: builder.query({
      query: () => ({
        url: "/members/getPremiumMember",
        method: "GET",
      }),
    }),


    removeMember: builder.mutation({
      query: (memberId) => ({
        url: `/members/removePremiummember/${memberId}`,
        method: "DELETE",
      }),
    }),

    removeClubMember: builder.mutation({
      query: ({ clubId, memberId }) => ({
        url: `/admin/removeClubMember/${clubId}`,
        method: "DELETE",
        body: { memberId },
      }),
    }),
    

    getuserClubs: builder.query({
      query: (userId) => ({
        url: `/admin/getuserClubs/${userId}`,
        method: "GET",
      }),
    }),
    
    
    updateClub: builder.mutation({
      query: (club) => ({
        url: `/admin/updateClub/${club._id}`,
        method: "PUT",
        body: club,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterClubMutation,
  useDeleteClubMutation,
  useGetsingleClubQuery, 
  useGetAllClubsQuery,
  useUpdateClubMutation,
  useRegisteruserinClubMutation,
  useGetuserClubsQuery,
  useGetPremiumMembersQuery,
  useRemoveMemberMutation,
  useGetClubMembersQuery,
  useRemoveClubMemberMutation
} = ClubApi; // Corrected export source
