import { gql } from '@apollo/client';

export const GET_ALL_INGREDIENT = gql`
    query GetAllIngredient{
        allIngredient {
            id
            name
            range
            informations {
                calorie
                weight
                protein
                glucid
                lipid
            }
        }
    }
`