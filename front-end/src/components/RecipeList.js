import React, {useContext} from "react"
import RecipeCard from "../containers/RecipeCard";
import {DataContext} from "../contexts/Context";


export default function RecipeList({recipes, emptyText}) {
    return (
        <>
            {recipes ?
                <>
                    { recipes.length !== 0 ?
                        recipes.slice(0).reverse().map(recipe => <RecipeCard recipe={recipe}
                                                                             key={recipe.id}
                                                                             hideComments={false}
                                                                             hideEdit={true}
                        />)
                        : <h2>{emptyText}</h2>
                    }
                </>
                :
                null}
        </>
    )
}