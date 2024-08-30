import ListIngredient from "@Containers/ListIngredient/index"
import NewIngredient from "@Containers/NewIngredient/index"
import styles from "./index.module.scss"

export default function MyIngredientLayout({allIngredients}){

    return(
        <div className={`${styles.layout} animationClass_OpacityIn300`}>

            <div className={styles.side}>
                <div className={`${styles.container} ${styles.newIngredient}`}>
                    <NewIngredient/>
                </div>
            </div>

            <div className={styles.side}>
                <div className={`${styles.container} ${styles.listIngredient}`}>
                    <ListIngredient allIngredient={allIngredients ? allIngredients : []}/>
                </div>
            </div>
        </div>
    )
}