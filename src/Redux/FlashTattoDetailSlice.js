import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "flash-tattoo",
        img :"",
        tattooOption : "",
        color: "",
        size : "",
        location : {
            name : "",
            id : ""
        },
        isActive : false,
    
}

const flashTattoSlice = createSlice({
    name : "flashTattoo",
    initialState,
    reducers : {
        setFlashTattooOption : (state,action) => {
                state.tattooOption = action.payload
        },
        
        setFlashTattoSize : (state,action) => {
            state.size = action.payload;
        },
        setFlashTattooImg : (state,action) => {
            state.img = action.payload
        },
        setFlashTattooLocation : (state,action) => {
            state.location = action.payload
        },
        setFlashTattooIsActive: (state,action) => {
            state.isActive = action.payload
        },
        setFlashTattooColor : (state,action) => {
            state.color = action.payload
        },
        resetFlashTattooValue : () => initialState
    }
})

export const  {setFlashTattooColor,setFlashTattoSize,setFlashTattooLocation,setFlashTattooIsActive,setFlashTattooOption,setFlashTattooImg,resetFlashTattooValue} = flashTattoSlice.actions
export default flashTattoSlice.reducer