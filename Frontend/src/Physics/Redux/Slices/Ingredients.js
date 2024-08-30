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
    },
    delete_ingredient:(state,action) => {
      const index = state.all.findIndex(ingredient => ingredient.id === action.payload)
      state.all.splice(index, 1)
    }
  },
});

export const { 
    set_all,
    add_all,
    delete_ingredient
} = IngredientsSlice.actions;

export const IngredientsReducer = IngredientsSlice.reducer;