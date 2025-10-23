import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "tattoo",
        sub_type: "custom",
        img :"",
        tattoo_option : "",
        tattoo_size : "",
        isActive : false,
      
    
}

const customTattoSlice = createSlice({
    name : "customTattoo",
    initialState,
    reducers : {
        setTattooOption : (state,action) => {
                state.tattoo_option = action.payload
        }
        ,
        setCustomTattoSize : (state,action) => {
            state.tattoo_size = action.payload;
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