import { useEffect, useState } from "react"
import styles from "./NewIngredient.module.scss"
import { useMutation } from "@apollo/client"
import { CREATE_INGREDIENT } from "@Query/Ingredient/CreateIngredient"
import { useDispatch } from "react-redux"
import { add_all } from "@Redux/Slices/Ingredients"
import Input from "@Components/Input"

export default function NewIngredient(){

    const dispatch = useDispatch()
    const [saveIngredient, {data, loading, error}] = useMutation(CREATE_INGREDIENT)

    useEffect(() => {
        if(data && !loading && !error){
            dispatch(add_all(data.createIngredient.newIngredient))
        }
    }, [data, loading, error])

    const [inputList, setInputList] = useState({
        name: {id:0 ,specialClass:"name", placeholder:"Carotte", text:"Nom", value:""},
        calorie: {id:1, specialClass:"calorie", placeholder:"100", text:"Calorie", value:""},
        protein: {id:2, specialClass:"protein", placeholder:"5", text:"Protéine", value:""},
        glucid: {id:3, specialClass:"glucid", placeholder:"7", text:"Glucide", value:""},
        lipid: {id:4, specialClass:"lipid", placeholder:"0.5", text:"Lipide", value:""},
        weight: {id:5, specialClass:"weight", placeholder:"1000", text:"Poid", value:"1000", defaultValue:"1000"},
    })

    
    const updateValue = (key, newValue) => {
        const copyInputList = {...inputList}
        copyInputList[key].value = newValue
        setInputList(copyInputList)
    }

    const calculRange = () => {
        const informations = {
            protein:parseFloat(inputList.protein.value),
            glucid:parseFloat(inputList.glucid.value),
            lipid:parseFloat(inputList.lipid.value),
        }

        const range = Object.keys(informations).reduce((maxKey, currentKey) => {
            return informations[currentKey] > informations[maxKey] ? currentKey : maxKey
        }, Object.keys(informations)[0])

        return range
    }

    const submit = (e) => {
        e.preventDefault()
        // On détermine parmis les protéines, glucides, lipides, lequel est le plus élever pour désigner sa range
        const range = calculRange()
        const payload = {
            range,
            name:inputList.name.value,
            calorie:parseFloat(inputList.calorie.value),
            weight:parseFloat(inputList.weight.value),
            protein:parseFloat(inputList.protein.value),
            glucid:parseFloat(inputList.glucid.value),
            lipid:parseFloat(inputList.lipid.value),
        }
        saveIngredient({variables:payload})
        setInputList(current => {
            const copyCurrent = {...current}
            Object.keys(copyCurrent).map(key => {
                if(key !== "weight"){
                    copyCurrent[key].value = ""
                }
            })
            return copyCurrent
        })
    }

    return(
        <form className={styles.newIngredientLayout} onSubmit={submit}>

            <div className={styles.inputs}>
                {Object.keys(inputList).map(key => (
                    <div key={inputList[key].id} className={styles.line}>
                        <div className={`${styles.category} ${styles[inputList[key].specialClass]}`}>{inputList[key].text}</div>
                        <Input
                            type={"text"}
                            required={true}
                            handleChange={(newValue) => updateValue(key, newValue)}
                            placeholder={inputList[key].placeholder}
                            specialClass={`${styles.value} ${styles[inputList[key].specialClass]} ${inputList[key].defaultValue ? styles.filled : ""} ${inputList[key].value !== "" ? styles.filled : ""}`}
                            value={inputList[key].defaultValue ? inputList[key].defaultValue : inputList[key].value}
                        />
                    </div>
                ))}

                <Input specialClass={styles.submit} type={"submit"} value={"Enregistrer"}/>

            </div>



        </form>
    )
}