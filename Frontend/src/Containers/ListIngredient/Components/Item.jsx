import styles from "./Item.module.scss"
import { useEffect, useState } from "react"
import Input from "@Components/Input"
import { UPDATE_INGREDIENT } from "@Query/Ingredient/UpdateIngredient"
import { useMutation } from "@apollo/client"
import Button from "@Components/Button"

export default function Item({ingredient}){

    const [modificationDetected, setModificationDetected] = useState(false)
    const [updateIngredient, {data, loading, error}] = useMutation(UPDATE_INGREDIENT)
    // Contient les valeurs stocker en BDD de l'ingredient
    const [ingredientComparison, setIngredientComparison] = useState({
        id:ingredient.id,
        name:ingredient.name,
        range:ingredient.range,
        calorie:ingredient.informations.calorie,
        weight:ingredient.informations.weight,
        protein:ingredient.informations.protein,
        glucid:ingredient.informations.glucid,
        lipid:ingredient.informations.lipid,
    })
    
    // Miroir des modification apporter par l'utilisateur
    const [ingredientState, setIngredientState] = useState({...ingredientComparison})

    // Compare les modifications apporter par l'utilisateur avec les véritables données 
    // donne la possibilité d'enregistrer les modifications si un changement est détecter
    useEffect(() => {
        setModificationDetected(false)
        Object.keys(ingredientState).map(key => {
            if(ingredientState[key].toString() !== ingredientComparison[key].toString()){setModificationDetected(true)}
        })
    }, [ingredientState])

    const saveModification = () => {
        updateIngredient({variables:ingredientState})
    }

    useEffect(() => {
        if(data && !loading && !error){
            setModificationDetected(false)
            const updateIngredient = data.updateIngredient.updateIngredient
            setIngredientComparison(updateIngredient)
            setIngredientState(updateIngredient)
        }
    }, [data])

    const handleChange = (key, newValue) => {
        setIngredientState(current => {
            const copy = {...current}
            copy[key] = parseInt(newValue) ? parseInt(newValue) : newValue
            return copy
        })
    }
    

    return(
        <div className={`${styles.layout} ${styles[ingredient.range]}`}>
            <div className={styles.nameBox}>
                <Input 
                    handleChange={(newValue) => handleChange("name", newValue)}
                    specialClass={styles.name}
                    type={"text"}
                    value={ingredientState.name} />
                <Button onClick={saveModification} specialClass={modificationDetected ? styles.active : styles.inactive}>
                    <i className='fa-solid fa-floppy-disk' ></i>
                </Button>
            </div>
            <div className={styles.informationsBox}>
                {Object.entries(ingredient.informations)
                .filter(([key]) => key !== "__typename")
                .map(information => (
                    <Input 
                        key={information[0]}
                        handleChange={(newValue) => handleChange(information[0], newValue)}
                        specialClass={`${styles[information[0]]} ${styles.information} ${information[0] === ingredient.range ? styles.contrast : ""}`}
                        type={"text"}
                        value={ingredientState[information[0]]} />
                ))}
            </div>
        </div>
    )
}