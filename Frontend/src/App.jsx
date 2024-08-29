import Header from "@Containers/Header/Header";
import { Route, Routes } from "react-router-dom"
import MyIngredientPage from "@Pages/MyIngredientPage"
import { PATH } from "@Constants/Path"
import "./App.scss";


export default function App() {

  
  return (
    <main>
      <Header/>
      <Routes>
            <Route path={PATH.Home} element={null}/>
            <Route path={PATH.MyIngredients} element={<MyIngredientPage/>}/>
      </Routes>
    </main>
  )
}
