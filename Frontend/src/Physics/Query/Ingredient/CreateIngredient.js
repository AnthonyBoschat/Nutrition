import { gql } from '@apollo/client';

export const CREATE_INGREDIENT = gql`
    mutation CreateIngredient(
        $range: String!,
        $name: String!,
        $calorie: Float!,
        $weight: Float!,
        $protein: Float!,
        $glucid: Float!,
        $lipid: Float!
    ){
        createIngredient(
            range: $range,
            name: $name,
            calorie: $calorie,
            weight: $weight,
            protein: $protein,
            glucid: $glucid,
            lipid: $lipid
        ){
            newIngredient{
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
    }
`