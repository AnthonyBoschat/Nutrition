import { gql } from '@apollo/client';

export const UPDATE_INGREDIENT = gql`
    mutation UpdateIngredient(
        $id: String!,
        $range: String!,
        $name: String!,
        $calorie: Float!,
        $weight: Float!,
        $protein: Float!,
        $glucid: Float!,
        $lipid: Float!
    ) {
        updateIngredient(
            id: $id,
            range: $range,
            name: $name,
            calorie: $calorie,
            weight: $weight,
            protein: $protein,
            glucid: $glucid,
            lipid: $lipid
        ) {
            updateIngredient{
                id
                range
                name
                calorie
                weight
                protein
                glucid
                lipid
            }
        }
    }
`