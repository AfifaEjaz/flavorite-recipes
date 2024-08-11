import { useParams } from "react-router-dom";
import { useRecipeID } from "../store";
import { useEffect } from "react";

const SingleMealPage = () => {

    const { id } = useParams<{ id: string }>();

    const { meal, errors, loadingg, fetchMealById } = useRecipeID()

    useEffect(() => {
        if (id) fetchMealById(id); // Fetch the meal when the component mounts
    }, [id, fetchMealById]);

    if (loadingg) return <p>Loading...</p>;
    if (errors) return <p>Error: {errors}</p>;
    if (!meal) return <p>No meal found.</p>;

    const videoId = meal.strYoutube.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-sm-8">
                        <h3 className="text-success mb-3">{meal.strMeal}</h3>
                        <img className="img img-fluid" src={meal.strMealThumb} alt="" />
                        <h4 className="mt-3">Jump To Recipe</h4>
                        <p>{meal.strInstructions}</p>
                        <iframe
                            src={embedUrl}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Recipe Video"
                            width="100%"
                            height="315"
                        ></iframe>
                    </div>
                    <div className="col-sm-4">
                        <div className="border p-3 my-3 bg-success text-light">
                            <ul>
                                <li>Category: {meal.strCategory}</li>
                                <li>Tags: {meal.strTags}</li>
                            </ul>
                        </div>

                        <div className="border p-3">
                            <h5>Ingredients</h5>
                            <ul>
                                <li>{meal.strIngredient1}</li>
                                <li>{meal.strIngredient2}</li>
                                <li>{meal.strIngredient3}</li>
                                <li>{meal.strIngredient4}</li>
                                <li>{meal.strIngredient5}</li>
                                <li>{meal.strIngredient6}</li>
                                <li>{meal.strIngredient7}</li>
                                <li>{meal.strIngredient8}</li>
                                <li>{meal.strIngredient9}</li>
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default SingleMealPage