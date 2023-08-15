import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {throwOnApiError} from '@flat-peak/javascript-sdk';

export const fetchProviderList = createAsyncThunk(
  "providers/fetch",
  async ({ keyword, countryCode, apiKey }) => {

    const qs = new URLSearchParams({
      ...(keyword && { keywords: keyword }),
      ...(countryCode && { country_code: countryCode }),
      ...(apiKey && { key: apiKey }),
      sort_order: "code_name",
      limit: "100",
    });

    const request = await fetch(`/api/providers?${qs.toString()}`);
    const result = await request.json();
    return throwOnApiError(result);
  }
);

export const providersSlice = createSlice({
  name: "providers",
  initialState: {
    loading: false,
    providers: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProviderList.fulfilled, (state, action) => {
      state.providers = action.payload.data;
    });
  },
});

export const { setLoading, setProviders } = providersSlice.actions;

export const selectLoading = (state) => state.providers.loading;
export const selectProviders = (state) => state.providers.providers;

export default providersSlice.reducer;
