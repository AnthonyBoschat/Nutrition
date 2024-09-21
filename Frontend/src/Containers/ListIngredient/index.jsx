import Item from "./Components/Item"
import styles from "./index.module.scss"

export default function ListIngredient({allIngredient}){

    console.log("coucou 2", allIngredient)

    const boxList = [
        {specialClass:"protein", text:"Protéines"},
        {specialClass:"glucid", text:"Glucides"},
        {specialClass:"lipid", text:"Lipides"},
    ]

    return(
        <div className={styles.layout}>
            {boxList.map(box => (

                <div key={box.specialClass} className={`${styles[box.specialClass]}`}>
                    <div className={styles.title}>{box.text}</div>
                    <div className={styles.container}>
                        {allIngredient.map(ingredient => {
                        
                        if(ingredient.range === box.specialClass){
                            return(
                                <Item key={ingredient.id} ingredient={ingredient}/>
                            )}
                        })}
                    </div>
                </div>
                
            ))}
        </div>
    )
}