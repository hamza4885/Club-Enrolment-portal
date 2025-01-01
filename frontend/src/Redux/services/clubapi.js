import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const HOST ="http://localhost:4000/api";

export const clubapi = createApi({
  reducerPath: "clubapi",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    credentials: "include",
    prepareHeaders: (headers, { endpointName }) => {
      // DO NOT set multipart manually
      if (!["register", "registerClub", "someMultipartEndpoint", "clubs"].includes(endpointName)) {
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

