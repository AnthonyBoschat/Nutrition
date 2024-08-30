import { gql } from '@apollo/client';

export const DELETE_INGREDIENT = gql`
    mutation DeleteIngredient($id: ID!){
        deleteIngredient(id: $id){
            success
            id
        }
    }
`