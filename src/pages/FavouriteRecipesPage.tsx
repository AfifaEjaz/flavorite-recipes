import { RecipesType } from "../store";

const FavouriteRecipesPage = () => {

    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    console.log(storedFavourites);

    // const { favourites } = useFavorites();

    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
                <div className="bg-success rounded p-4" style={{ height: '85vh', width: "80%", overflowY: 'auto' }}>
                    {
                        storedFavourites.map((favourite: RecipesType) =>
                            <div className='d-flex align-items-center mb-3 border-bottom pb-3' key={favourite.idMeal}>
                                <div className="me-3">
                                    <img
                                        className="img-fluid rounded"
                                        src={favourite.strMealThumb}
                                        alt="recipe"
                                        style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <h5>{favourite.strMeal}</h5>
                                    <p className="text-white mb-0" style={{ flex: 1 }}>
                                        {favourite.strInstructions.substring(0, 300)}...
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </>
    )
}

export default FavouriteRecipesPage