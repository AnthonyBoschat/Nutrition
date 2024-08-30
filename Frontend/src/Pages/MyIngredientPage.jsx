import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { set_all } from '@Redux/Slices/Ingredients';
import MyIngredientLayout from '@Layout/MyIngredient/index';
import { GET_ALL_INGREDIENT } from '@Query/Ingredient/GetAll';

const MyIngredientsPage = () => {
  
  const { data, loading, error } = useQuery(GET_ALL_INGREDIENT);
  const allIngredients = useSelector((store) => store.ingredients.all);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !error && data) {
      dispatch(set_all(data.allIngredient));
    }
  }, [data, loading, error]);

  return (
    <MyIngredientLayout allIngredients={allIngredients ? allIngredients : []} />
  );
};

export default MyIngredientsPage;