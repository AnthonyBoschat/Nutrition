import { combineReducers } from "@reduxjs/toolkit";
import { IngredientsReducer } from "./Slices/Ingredients";

const rootReducer = combineReducers({
    ingredients:IngredientsReducer
});

export default rootReducer