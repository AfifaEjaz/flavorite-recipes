import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import SingleMealPage from "./pages/SingleMealPage"
import FavouriteRecipesPage from "./pages/FavouriteRecipesPage"
import { useFavorites } from "./store"

function App() {

  const { favourites } = useFavorites()
  console.log(favourites);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/meal/:id" element={<SingleMealPage/>}/>
        <Route path="/favourite-recipes" element={<FavouriteRecipesPage favourites={favourites}/>}/>
      </Routes>
    </>
  )
}

export default App
