import styles from "./Item.module.scss"
import { useEffect, useState } from "react"
import Input from "@Components/Input"
import { UPDATE_INGREDIENT } from "@Query/Ingredient/UpdateIngredient"
import { useMutation } from "@apollo/client"
import Button from "@Components/Button"
import { DELETE_INGREDIENT } from "@Query/Ingredient/DeleteIngredient"
import { useDispatch } from "react-redux"
import { delete_ingredient, update_ingredient } from "@Redux/Slices/Ingredients"

export default function Item({ingredient}){

    const dispatch = useDispatch()
    const [modificationDetected, setModificationDetected] = useState(false)
    // Miroir des modification apporter par l'utilisateur
    const [ingredientComparison, setIngredientComparison] = useState({...ingredient})
    

    const detectNewRange = (copyIngredientState) => {
        const infos = {
            protein:copyIngredientState.informations.protein,
            glucid:copyIngredientState.informations.glucid,
            lipid:copyIngredientState.informations.lipid,
        }
        const newRange = infos.protein >= infos.glucid && infos.protein >= infos.lipid
                        ? "protein"
                        : infos.lipid >= infos.protein && infos.lipid >= infos.glucid 
                            ? "lipid"
                            : "glucid"
        return newRange
    }

    
    // Requête pour mettre à jour un ingrédient
    const [updateIngredient, updateQuery] = useMutation(UPDATE_INGREDIENT, {
        variables:{
            id:ingredientComparison.id,
            name:ingredientComparison.name,
            range:ingredientComparison.range,
            calorie:ingredientComparison.informations.calorie,
            weight:ingredientComparison.informations.weight,
            protein:ingredientComparison.informations.protein,
            glucid:ingredientComparison.informations.glucid,
            lipid:ingredientComparison.informations.lipid,
        },
        update(cache, {data}){
            const {updateIngredient} = data.updateIngredient
            dispatch(update_ingredient(updateIngredient))
            setModificationDetected(false)
        }
    })

    // Requête pour supprimer un ingredient
    const [deleteIngredient, deleteQuery] = useMutation(DELETE_INGREDIENT, {
        update(cache, {data}){
            if (data?.deleteIngredient?.success) {
                const ingredientID = data.deleteIngredient.id
                dispatch(delete_ingredient(ingredientID))
            }
        }
    })
    
    // Compare les modifications apporter par l'utilisateur avec les véritables données 
    // donne la possibilité d'enregistrer les modifications si un changement est détecter
    useEffect(() => {
        if(ingredientComparison){
            setModificationDetected(false)
            if(ingredientComparison.name !== ingredient.name){
                setModificationDetected(true)
            }
            Object.keys(ingredientComparison.informations)
            .filter(([key]) => key !== "__typename")
            .map(key => {
                if(ingredientComparison.informations[key].toString() !== ingredient.informations[key].toString()){
                    setModificationDetected(true)
                }
            })
        }
    }, [ingredientComparison])

    const handleChange = (key, newValue) => {
        setIngredientComparison(current => {
            const copy = {...current, informations: {...current.informations}}
            if(key === "name"){
                copy["name"] = newValue
                return copy
            }
            if(parseInt(newValue)){
                copy.informations[key] = parseInt(newValue)
                copy["range"] = detectNewRange(copy)
                return copy
            }else{
                return current
            }
            
        })
    }

    return(
        <div className={`${styles.layout} ${styles[ingredient.range]}`}>
            <div className={styles.nameBox}>
                <Input 
                    handleChange={(newValue) => handleChange("name", newValue)}
                    specialClass={styles.name}
                    type={"text"}
                    value={ingredientComparison.name} />
                
                <div className={styles.buttons}>
                    <Button onClick={() => updateIngredient()} specialClass={modificationDetected ? styles.active : styles.inactive}>
                        <i className='fa-solid fa-floppy-disk' ></i>
                    </Button>
                    <Button onClick={() => {
                        const response = window.confirm(`Supprimer ${ingredient.name} ?`)
                        if(response){
                            deleteIngredient({variables:{id:ingredient.id}})
                        }
                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </div>
                
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
                        value={ingredientComparison.informations[information[0]] ? ingredientComparison.informations[information[0]] : 0} />
                ))}
            </div>
        </div>
    )
}