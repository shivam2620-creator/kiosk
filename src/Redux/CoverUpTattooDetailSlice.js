import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "tattoo",
        sub_type : "coverup_rework",
        img :"",
        tattoo_placement: "",
        tattoo_size : "",
        tattoo_color: "",
        isActive : false,
      
    
}

const coverupTattoSlice = createSlice({
    name : "coverupTattoo",
    initialState,
    reducers : {
        setCoverupTattooPlacement : (state,action) => {
                state.tattoo_placement = action.payload
        }
        ,
        setCoverupTattoSize : (state,action) => {
            state.tattoo_size = action.payload;
        },
        setCoverupTattooImg : (state,action) => {
            state.img = action.payload
        },
        setCoverTattooColor : (state,action) => {
            state.tattoo_color = action.payload
        },
        setCoverupTattooIsActive: (state,action) => {
            state.isActive = action.payload
        },

        resetCoverupTattooValue : () => initialState
             
        
    }
})

export const  {setCoverTattooColor,setCoverupTattoSize,setCoverupTattooPlacement,setCoverupTattooIsActive,setCoverupTattooImg,resetCoverupTattooValue} = coverupTattoSlice.actions
export default coverupTattoSlice.reducer