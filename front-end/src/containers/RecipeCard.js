import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserListDialog } from "./dialogs/UserListDialog";
import { DeleteRecipe, Like } from "../helpers";
import { DataContext } from "../contexts/Context";
import Avatar from "@material-ui/core/Avatar";
import { WarningDialog } from "./dialogs/WarningDialog";
import servingIcon from './../assets/serving-time-icon.png';
import preparationTimeIcon from './../assets/preparation-time-icon.png';
import cookingTimeIcon from './../assets/baking-time-icon.png';
import { RecipeDialog } from "./dialogs/RecipeDialog";
import { EditImgDialog } from "../containers/dialogs/EditImgDialog";


export default function RecipeCard({ recipe, hideComments, hideEdit }) {
    console.log(`RecipeCard() is rendered (recipeId: ${recipe.id}).`)

    const context = useContext(DataContext)
    const { authUser } = context

    const [likeOpen, setLikeOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [recipeOpen, setRecipeOpen] = useState(false)
    const history = useHistory()

    // edit Image
    const [editImgOpen, setEditImgOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState(null)
    const [imageFile, setImageFile] = useState({})

    const [likes, setLikes] = useState(recipe.likes)
    useEffect(() => setLikes(recipe.likes), [recipe.likes])

    const isLike = likes.find(e => e.userId === authUser.userId)
    const baker = recipe.user
    const isOwner = authUser.userId === baker.userId
    const canEdit = !hideEdit && isOwner

    const goToRecipePage = () => history.push(`/recipes/${recipe.id}`);
    const goToUserPage = () => history.push(`/users/${recipe.user.userId}`);

    console.log(`RecipeCard likes: ${isLike}`)

    return (
        <div className="recipe-container" key={recipe.id}>
            <UserListDialog title={"Likes"} users={likes} open={likeOpen} setOpen={setLikeOpen} />
            <RecipeDialog title={"Edit Recipe"} recipe={recipe} open={recipeOpen} setOpen={setRecipeOpen} isNew={false} />
            <EditImgDialog title={"Change Recipe Picture"} open={editImgOpen} setOpen={setEditImgOpen}
                previewImg={previewImg} setPreviewImg={setPreviewImg} imageFile={imageFile} setImageFile={setImageFile} isProfile={false} />
            <WarningDialog title={"Confirm Delete"} msg={"Are you sure you want to delete this recipe?"}
                open={confirmOpen} setOpen={setConfirmOpen} onConfirm={() => DeleteRecipe(context, recipe, history, true)} />
            <div className={(canEdit)? 'recipe-img recipe-img-hover' : 'recipe-img'}>
                <img src={recipe.img_url} alt="" onClick={() => (canEdit)? setEditImgOpen(true): goToRecipePage()} />
            </div>
            <div className="recipe-details-container">
                <div className="recipe-details-top-container">
                    <div className="recipe-details-top-left-container">
                        <div className="recipe-name" onClick={goToRecipePage}>{recipe.name}</div>
                        <div className="recipe-baker-row" onClick={goToUserPage}>
                            <div className="recipe-baker-button">
                                <Avatar className='recipe-baker-icon' alt={`${baker.userId}`} src={baker.img_url} style={{ backgroundColor: '#e6e6e6' }} />
                                {baker.name} <span className='recipe-baker-userId'>@{baker.userId}</span>
                            </div>
                        </div>
                    </div>
                    <div className="recipe-details-top-right-container">
                        <div className="recipe-info-block">
                            <img src={servingIcon} alt="" className="recipe-info-image" />
                            <div className="recipe-info-text">{recipe.serving} Servings</div>
                        </div>
                        <div className="recipe-info-block">
                            <img src={preparationTimeIcon} alt="" className="recipe-info-image" />
                            <div className="recipe-info-text">{recipe.preparation_time} Minutes</div>
                        </div>
                        <div className="recipe-info-block">
                            <img src={cookingTimeIcon} alt="" className="recipe-info-image" />
                            <div className="recipe-info-text">{recipe.cooking_time} Minutes</div>
                        </div>
                    </div>
                </div>
                <div className="recipe-following-container">
                    <Button color="inherit" onClick={() => setLikeOpen(true)}>{likes.length} Likes</Button>
                    <Button color="inherit">{recipe.comments.length} Comments</Button>
                </div>
                {(hideComments) ? null :
                    <div className="recipe-comment-container">
                        {recipe.comments.slice(0, 2).map(c => <div className='recipe-comment'>
                            <span className='recipe-comment-profile'>{c.user.name}</span>{c.text}
                        </div>)}
                    </div>
                }
            </div>
            <div className="recipe-button-container">
                {canEdit ?
                    <div className="recipe-button-icon-container">
                        <button className="recipe-button recipe-button-icon" onClick={() => setRecipeOpen(true)}><EditIcon /></button>
                        <button className="recipe-button recipe-button-icon" onClick={() => setConfirmOpen(true)}><DeleteIcon /></button>
                    </div> : null
                }
                <button className="recipe-button" onClick={() => history.push(`/recipes/${recipe.id}/sessions`)}>Start Baking</button>
                {isLike ?
                    <button className="recipe-button"
                        onClick={() => Like(context, false, recipe, setLikes)}>Liked</button> :
                    <button className="recipe-button"
                        onClick={() => Like(context, true, recipe, setLikes)}>Like</button>
                }
            </div>
        </div>);
}