import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "coverup-tattoo",
        img :"",
        placement: "",
        size : "",
        color: "",
        isActive : false,
        location : {
            name : "",
            id : ""
        },
    
}

const coverupTattoSlice = createSlice({
    name : "coverupTattoo",
    initialState,
    reducers : {
        setCoverupTattooPlacement : (state,action) => {
                state.placement = action.payload
        }
        ,
        setCoverupTattoSize : (state,action) => {
            state.size = action.payload;
        },
        setCoverupTattooImg : (state,action) => {
            state.img = action.payload
        },
        setCoverTattooColor : (state,action) => {
            state.color = action.payload
        },
        setCoverupTattooIsActive: (state,action) => {
            state.isActive = action.payload
        },
        setCoveruptattooLocation : (state,action) => {
            state.location = action.payload
        },
        resetCoverupTattooValue : () => initialState
             
        
    }
})

export const  {setCoveruptattooLocation,setCoverTattooColor,setCoverupTattoSize,setCoverupTattooPlacement,setCoverupTattooIsActive,setCoverupTattooImg,resetCoverupTattooValue} = coverupTattoSlice.actions
export default coverupTattoSlice.reducer