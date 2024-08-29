import Item from "./Components/Item"
import "./ListIngredient.scss"

export default function ListIngredient({allIngredient}){


    const boxList = [
        {specialClass:"protein", text:"Protéines"},
        {specialClass:"glucid", text:"Glucides"},
        {specialClass:"lipid", text:"Lipides"},
    ]

    return(
        <div className="listIngredient">
            {boxList.map(box => (

                <div key={box.specialClass} className={`${box.specialClass} layout`}>
                    <div className="title">{box.text}</div>
                    <div className="ingredients">
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