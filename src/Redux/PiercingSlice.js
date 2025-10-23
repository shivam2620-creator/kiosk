import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "piercing",
      
        img : "",
        isActive : false,
        sub_type : "",
        
        
}

const piercingSlice = createSlice({
    name : "piercing",
    initialState,
    reducers : {
       setPiercingType : (state,action) => {
             state.sub_type = action.payload
       },
       setPiercingIsActive : (state,action) => {
        state.isActive = action.payload
       },
       setPiercingImg : (state,action) => {
        state.img = action.payload
       },
      
       resetPiercingValue : () => initialState
    }
})

export const  {setPiercingType,setPiercingImg,setPiercingIsActive,resetPiercingValue} = piercingSlice.actions
export default piercingSlice.reducer