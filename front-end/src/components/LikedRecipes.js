import React from "react"
import RecipeCard from "../containers/RecipeCard";


export default function LikedRecipes({ user, loggedIn, setDeleted }) {
    return (
        <>
            {user.liked_recipes ?
                <>
                    { user.liked_recipes.length !== 0 ?
                        user.liked_recipes.slice(0).reverse().map(recipe => <RecipeCard recipe={recipe} loggedIn={loggedIn} setDeleted={setDeleted}  key={recipe.id}/>)
                        : <h2>This user has not liked any recipes</h2>
                    }
                </>
                :
                null}
        </>
    )
}