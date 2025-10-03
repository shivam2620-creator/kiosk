import { configureStore } from '@reduxjs/toolkit';
import customTattooReducer from "./CustomTattooDetailSlice"
import flashTattooReducer from "./FlashTattoDetailSlice"
import coverTattooReducer from "./CoverUpTattooDetailSlice"
import piercingReducer from "./PiercingSlice"
import appointmentDetailReducer from './AppointmentDetailSlice';

export const store = configureStore({
  reducer: {
    customTattoo : customTattooReducer,
    flashTattoo : flashTattooReducer,
    coverupTattoo : coverTattooReducer,
    piercing : piercingReducer,
    appointment : appointmentDetailReducer
  },

});
