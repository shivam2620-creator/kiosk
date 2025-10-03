import { createSlice } from "@reduxjs/toolkit";


const initialState = {

        service : "piercing",
        img : "",
        isActive : false,
        type : "",
        
    
}

const piercingSlice = createSlice({
    name : "piercing",
    initialState,
    reducers : {
       setPiercingType : (state,action) => {
             state.type = action.payload
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