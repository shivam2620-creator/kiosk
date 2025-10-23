// src/Redux/availabilitySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],            // array of artist objects from the API
  selectedArtistId: null,
};

const slice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    // payload: array of artist objects
    setAvailability(state, action) {
        console.log("Reducer setAvailability called with", action.payload);
      const list = Array.isArray(action.payload.allArtistSlots
) ? action.payload.allArtistSlots
 : [];
      state.list = list;
      // auto-select first artist if none selected
      if (!state.selectedArtistId && list.length > 0) {
        state.selectedArtistId = list[0].artistId;
      }
    },
    clearAvailability(state) {
      state.list = [];
      state.selectedArtistId = null;
    },
    // payload: artistId (string or null)
    setSelectedArtist(state, action) {
      state.selectedArtistId = action.payload ?? null;
    },
  },
});

export const { setAvailability, clearAvailability, setSelectedArtist } = slice.actions;
export default slice.reducer;
