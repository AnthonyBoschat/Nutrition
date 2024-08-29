import { PATH } from "@Constants/Path"
import styles from "./Header.module.scss"
import Button from "@Components/Button"
import { useLocation, useNavigate } from "react-router-dom"

export default function Header(){

    const navigate = useNavigate()
    const location = useLocation()
    
    const navigateTo = (destination) => {
        if(location.pathname === `/${destination}`){
            navigate(PATH.Home)
            return
        }
        navigate(destination)
    }

    return(
        <div className={styles.headerLayout}>
            <Button onClick={() => navigateTo(PATH.MyIngredients)} text={"Mes ingrédients"}>Mes ingrédients</Button>
        </div>
    )
}