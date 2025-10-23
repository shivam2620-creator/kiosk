import { createSlice } from "@reduxjs/toolkit";
import { setTattooOption } from "./CustomTattooDetailSlice";


const initialState = {

        service : "tattoo",
        sub_type: "flash",
        tattooOption : "",
        img :"",
        tattoo_color : "",
        tattoo_size : "",
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
            state.tattoo_size = action.payload;
        },
        setFlashTattooImg : (state,action) => {
            state.img = action.payload
        },
        setFlashTattooIsActive: (state,action) => {
            state.isActive = action.payload
        },
        setFlashTattooColor : (state,action) => {
            state.tattoo_color = action.payload
        },
        resetFlashTattooValue : () => initialState
    }
})

export const  {setFlashTattooOption,setFlashTattooColor,setFlashTattoSize,setFlashTattooIsActive,setFlashTattooImg,resetFlashTattooValue} = flashTattoSlice.actions
export default flashTattoSlice.reducer