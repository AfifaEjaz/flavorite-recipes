import { create } from "zustand";

export interface RecipesType {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
}

interface FetchResponse {
    recipes: RecipesType[];
    error: string | null;
    loading: Boolean,
    fetchResponse: () => Promise<void>;
}

const useRecipes = create<FetchResponse>((set) => ({
    recipes: [],
    error: null,
    loading: false,
    fetchResponse: async () => {
        const alphabets = "abcdefghijklmnopqrstuvwxyz";
        const allRecipes: RecipesType[] = [];
        try {
            set({ loading: true })
            for (const letter of alphabets) {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
                const data = await response.json();

                if (data.meals) {
                    allRecipes.push(...data.meals);
                }
            }
            console.log(allRecipes);
            set({ recipes: allRecipes, loading: false });
        } catch (error: any) {
            set({ error: error.message });
            console.error("Error fetching data:", error.message);
        }
    },
}));

interface FetchSearchResponse {
    searchedRecipe: RecipesType[];
    sError: string | null;
    isloading: Boolean,
    fetchSearchResponse: (query: string) => Promise<void>;
}

const useSearchRecipe = create<FetchSearchResponse>((set) => ({
    searchedRecipe: [],
    sError: null,
    isloading: false,
    fetchSearchResponse: async (query: string) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            const data = await response.json()
            console.log(data.meals);
            set({ searchedRecipe: data.meals })
        } catch (error) {
            console.log("error");
        }
    }
}))


interface FetchMealByIdResponse {
    meal: RecipesType | null;
    errors: string | null;
    loadingg: boolean;
    fetchMealById: (id: string) => Promise<void>;
}

const useRecipeID = create<FetchMealByIdResponse>((set) => ({
    meal: null,
    errors: null,
    loadingg: false,
    fetchMealById: async (id: string) => {
        set({ loadingg: true, errors: null });
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            const data = await response.json()
            const meal = data.meals[0];
            set({ meal: meal, loadingg: false })
        } catch (error: any) {
            set({ errors: error.message, loadingg: false });
            console.log("error", error);
        }
    }
}))

interface FetchFavoriteResponse {
    favourites: RecipesType[];
    AddFavouriteRecipe: (recipe: RecipesType) => void;
}

const useFavorites = create<FetchFavoriteResponse>((set) => ({
    favourites: [],
    AddFavouriteRecipe: (recipe: RecipesType) => {
        set((state) => {
            const updatedFavourites = [...state.favourites, recipe];
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // Save updated list to localStorage
            // console.log(updatedFavourites); // Log the updated favourites array
            return { favourites: updatedFavourites };
        });
    }
}))

export { useRecipes, useSearchRecipe, useRecipeID, useFavorites };

