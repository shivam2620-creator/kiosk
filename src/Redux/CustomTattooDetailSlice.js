import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "custom-tattoo",
        img :"",
        tattooOption : "",
        size : "",
        isActive : false,
    
}

const customTattoSlice = createSlice({
    name : "customTattoo",
    initialState,
    reducers : {
        setTattooOption : (state,action) => {
                state.tattooOption = action.payload
        }
        ,
        setCustomTattoSize : (state,action) => {
            state.size = action.payload;
        },
        setCustomTattooImg : (state,action) => {
            state.img = action.payload
        },
        setCustomTattooIsActive: (state,action) => {
            state.isActive = action.payload
        },
        resetCustomTattooValue : () => initialState
    }
})

export const  {setTattooOption,setCustomTattoSize,setCustomTattooImg,setCustomTattooIsActive,resetCustomTattooValue} = customTattoSlice.actions
export default customTattoSlice.reducer