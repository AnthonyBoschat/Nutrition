import ListIngredient from "@Containers/ListIngredient/ListIngredient"
import NewIngredient from "@Containers/NewIngredient/NewIngredient"
import "./MyIngredientLayout.scss"

export default function MyIngredientLayout({allIngredients}){

    return(
        <div className="MyIngredientsLayout animationClass_OpacityIn300">

            <div className="side">
                <div className="layout leftSide">
                    <NewIngredient/>
                </div>
            </div>

            <div className="side">
                <div className="layout rightSide">
                    <ListIngredient allIngredient={allIngredients ? allIngredients : []}/>
                </div>
            </div>
        </div>
    )
}