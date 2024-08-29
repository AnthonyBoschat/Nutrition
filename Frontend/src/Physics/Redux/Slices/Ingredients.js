import { createSlice } from '@reduxjs/toolkit';



export const IngredientsSlice = createSlice({
  name: 'Ingredients',
  initialState: {
    all:[]
  },
  reducers: {
    set_all:(state,action) => {
        state.all = action.payload
    },
    add_all:(state, action) => {
      state.all.push(action.payload)
    }
  },
});

export const { 
    set_all,
    add_all
} = IngredientsSlice.actions;

export const IngredientsReducer = IngredientsSlice.reducer;