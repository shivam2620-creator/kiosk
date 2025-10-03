import { createSlice } from "@reduxjs/toolkit";


const initialState ={
        service : "appointment",
        fullName : "",
        mobileNumber : "",
        email : "",
        date : "",
        time : ""
}
const appointmentDetailSlice = createSlice({
    name : "appointment",
    initialState,
    reducers : {
        setAppointmentFullName : (state,action) => {
                state.fullName = action.payload
        }
        ,
        setAppointmentMobileNumber : (state,action) => {
            state.mobileNumber = action.payload;
        },
        setAppointmentEmail : (state,action) => {
            state.email = action.payload
        },
        setAppointmentDate : (state,action) => {
            state.date = action.payload
        },
        setAppointmentTime : (state,action) => {
            state.time = action.payload
        },
         onChangeAppointmentDetails : (state,action) => {
            state[action.payload.name] = action.payload.value
        }
        ,

        resetAppointmentValue : () => initialState
             
        
    }
})

export const  {onChangeAppointmentDetails, setAppointmentFullName,setAppointmentMobileNumber,setAppointmentEmail,setAppointmentDate,setAppointmentTime,resetAppointmentValue} = appointmentDetailSlice.actions
export default appointmentDetailSlice.reducer