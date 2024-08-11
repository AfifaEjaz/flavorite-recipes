import { useEffect } from "react"
import { RecipesType, useFavorites, useRecipes, useSearchRecipe } from '../store';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const HomePage = () => {

    const { error, recipes, fetchResponse, loading } = useRecipes()
    const { searchedRecipe, sError, isloading } = useSearchRecipe()
    const { favourites, AddFavouriteRecipe } = useFavorites()
 

    useEffect(() => {
        fetchResponse()
    }, [])

    const addToFav = (meal: RecipesType) => {
        AddFavouriteRecipe(meal)
    }

    return (
        <>

            <div className="container">
                {searchedRecipe.length > 0 && <div className="row" >
                    <h3 className="mt-4">Searched Results...</h3>
                    {isloading && <p>Loading...</p>}
                    {sError && <p>{sError}</p>}
                    {
                        searchedRecipe.map((searchRecipe) =>
                            <div className="col-md-3 mt-2" key={searchRecipe.idMeal} >
                                <Link className='text-decoration-none' to={`/meal/${searchRecipe.idMeal}`}>
                                    <div className="border border-rounded">
                                        <img className="img img-fluid" src={searchRecipe.strMealThumb} alt="recipe-img" />
                                    </div>
                                    <h5 className="text-success">{searchRecipe.strMeal}</h5>
                                    <p className="text-dark">{searchRecipe.strInstructions.substring(100, 0)}...</p>
                                </Link>
                            </div>
                        )
                    }
                </div>}

                <div className="row">
                    <h3 className="text-center mt-4">The Best Recipes</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {
                        recipes.map((recipe) =>
                            <div className="col-md-3 mt-2" key={recipe.idMeal} >
                                <Link className='text-decoration-none' to={`/meal/${recipe.idMeal}`}>
                                    <div className="border border-rounded">
                                        <img className="img img-fluid" src={recipe.strMealThumb} alt="recipe-img" />
                                    </div>
                                </Link>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6 className="text-success">{recipe.strMeal}</h6>
                                    <Button className="btn btn-success" onClick={() => addToFav(recipe)}>Fav</Button>
                                </div>
                                <p className="text-dark">{recipe.strInstructions.substring(100, 0)}...</p>

                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default HomePage