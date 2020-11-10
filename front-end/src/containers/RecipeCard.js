import React, {useState} from "react";
import { useHistory } from "react-router-dom"

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import {UserListDialog} from "./dialogs/UserListDialog";
import {DeleteRecipe, Like} from "../helpers";



export default function RecipeCard({recipe, loggedIn, setDeleted}) {
    const [likeOpen, setLikeOpen] = useState(false)
    const history = useHistory()

    const [likes, setLikes] = useState(recipe.likes)
    const isLike = likes.find(e => e.userId === loggedIn.userId)

    const goToRecipePage = () => history.push(`/recipes/${recipe.id}`);
    const goToUserPage = () => history.push(`/users/${recipe.user.userId}`);

    console.log(`RecipeCard likes: ${isLike}`)

    return (
        <div className="recipe-container" key={recipe.id}>
            <UserListDialog className='recipe-img' title={"Likes"} users={likes} open={likeOpen} setOpen={setLikeOpen}/>
            <img className='recipe-img' src={recipe.img_url} alt="" onClick={goToRecipePage}/>
            <div className="recipe-details-container">
                <div className="recipe-name" onClick={goToRecipePage}>{recipe.name}</div>
                <div className="recipe-baker" onClick={goToUserPage}>by {recipe.user.name}</div>
                <div className="recipe-following-container">
                    <Button color="inherit" onClick={() => setLikeOpen(true)}>{likes.length} Likes</Button>
                    <Button color="inherit">{recipe.comments.length} Comments</Button>
                </div>
            </div>
            <div className="recipe-button-container">
                {recipe.user.name === loggedIn.name ?
                    <div className="recipe-button-icon-container">
                        <button className="recipe-button recipe-button-icon"><EditIcon /></button>
                        <button className="recipe-button recipe-button-icon" onClick={() => DeleteRecipe(loggedIn, recipe.id, setDeleted)}><DeleteIcon /></button>
                    </div> : null
                }
                <button className="recipe-button">Start Baking</button>
                {isLike ?
                    <button className="recipe-button"
                            onClick={() => Like(recipe.id, loggedIn, false, likes, setLikes)}>Liked</button> :
                    <button className="recipe-button"
                            onClick={() => Like(recipe.id, loggedIn, true, likes, setLikes)}>Like</button>
                }
            </div>
        </div>);
}