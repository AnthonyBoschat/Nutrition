import { createSlice } from '@reduxjs/toolkit';



export const IngredientsSlice = createSlice({
  name: 'Ingredients',
  initialState: {
    all:[]
  },
  reducers: {
    set_ingredient:(state,action) => {
        state.all = action.payload
    },
    add_ingredient:(state, action) => {
      state.all.push(action.payload)
    },
    delete_ingredient:(state,action) => {
      const index = state.all.findIndex(ingredient => ingredient.id === action.payload)
      state.all.splice(index, 1)
    },
    update_ingredient:(state,action) => {
      const index = state.all.findIndex(ingredient => ingredient.id === action.payload.id)
      state.all[index] = action.payload
    }
  },
});

export const { 
    set_ingredient,
    add_ingredient,
    delete_ingredient,
    update_ingredient
} = IngredientsSlice.actions;

export const IngredientsReducer = IngredientsSlice.reducer;