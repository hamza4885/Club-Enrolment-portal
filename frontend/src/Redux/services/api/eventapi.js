import { clubapi } from "../clubapi";

export const ClubApi = clubapi.injectEndpoints({
  endpoints: (builder) => ({
    CreateEvent: builder.mutation({
      query: ({ clubId, eventData }) => ({
        url: `/clubevent/createEvent/${clubId}`,
        method: "POST",
        body: eventData,
      }),
    }),

    RegisterEvent: builder.mutation({
      query: (data) => ({
        url: "/clubevent/RegisterEvent",
        method: "POST",
        body: data,
      }),
    }),
    
    
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/clubevent/deleteEvent/${id}`,
        method: "DELETE",
      }),
    }),

    getsingleEvent: builder.query({
      query: (id) => ({
        url: `/clubevent/getevent/${id}`,
        method: "GET",
      }),
    }),

    getAllEvents: builder.query({
      query: (clubId) => ({
        url: `/clubevent/getAllEvents/${clubId}`,
        method: "GET",
      }),
    }),

    updateEvent: builder.mutation({
      query: (event) => ({
        url: `/clubevent/updateEvent/${event._id}`,
        method: "PUT",
        body: event,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,  // Fixed incorrect casing
  useGetsingleEventQuery,
  useUpdateEventMutation,
  useRegisterEventMutation
} = ClubApi; // Corrected export source
