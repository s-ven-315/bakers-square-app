import React, {useContext} from "react"
import RecipeCard from "../containers/RecipeCard";
import {DataContext} from "../contexts/Context";


export default function LikedRecipes() {
    const {user} = useContext(DataContext);
    return (
        <>
            {user.liked_recipes ?
                <>
                    { user.liked_recipes.length !== 0 ?
                        user.liked_recipes.slice(0).reverse().map(recipe => <RecipeCard recipe={recipe} key={recipe.id}/>)
                        : <h2>This user has not liked any recipes</h2>
                    }
                </>
                :
                null}
        </>
    )
}