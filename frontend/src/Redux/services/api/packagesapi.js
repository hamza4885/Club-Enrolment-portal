import { clubapi } from "../clubapi";

export const ClubApi = clubapi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: ({ clubId, name, amount }) => ({
        url: `/packages/createPackage/${clubId}`, // Include clubId in the URL
        method: 'POST',
        body: { name, amount }, // Send name and amount in the body
      }),
    }),
    
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/deletePackage/${id}`,
        method: "DELETE",
      }),
    }),

    getsinglePackage: builder.query({
      query: (id) => ({
        url: `/packages/getsinglePackage/${id}`,
        method: "GET",
      }),
    }),

    getAllPackages: builder.query({
      query: (clubId) => ({
        url: `/packages/getAllPackages/${clubId}`,
        method: "GET",
      }),
    }),

    updatePackage: builder.mutation({
      query: (event) => ({
        url: `/packages/updatePackage/${event._id}`,
        method: "PUT",
        body: event,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetsinglePackageQuery,  // Fixed incorrect casing
  useGetAllPackagesQuery,
  useUpdatePackageMutation
} = ClubApi; // Corrected export source
