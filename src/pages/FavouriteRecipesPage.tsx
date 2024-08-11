import { RecipesType, useFavorites } from "../store"

interface props {
    favourites: RecipesType[]
}

const FavouriteRecipesPage = ({ favourites }: props) => {

    // const { favourites } = useFavorites()
    console.log(favourites);

    return (
        <>
            <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh', width: "100%" }}>
                <div style={{ height: '85vh', width: "80%" }} className="bg-success rounded">
                    {
                        favourites.map((favourite) =>
                            <div className='d-flex' key={favourite.idMeal}>
                                <img src={favourite.strMealThumb} alt="image" />
                                <p>{favourite.strInstructions.substring(60, 0)}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default FavouriteRecipesPage