import React from "react"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from "react-router-dom"
import { Like, Unlike } from '../helpers'

function FollowerDialog(props) {
    const history = useHistory()

    const { onClose, selectedValue, open, recipe } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClick={handleClose} aria-labelledby="likes-dialog-title" open={open}>
            <DialogTitle id="followers-dialog-title">Likes</DialogTitle>
            <List>

                {recipe ?
                    recipe.map((r) => (
                        <ListItem button onClick={() => history.push(`/users/${r.userId}`)} key={r}>
                            <ListItemText primary={r.userId} />
                        </ListItem>
                    )) : null}
            </List>
        </Dialog>
    );
}

export default function LikedRecipes({ user, loggedIn }) {
    const [likeOpen, setLikeOpen] = React.useState(false);
    const history = useHistory()

    return (
        <>
            {user.liked_recipes ?
                <>

                    { user.liked_recipes.length != 0 ?
                        user.liked_recipes.map(recipe => {

                            const handleLikeOpen = () => {
                                setLikeOpen(true);
                            };

                            const handleLikeClose = () => {
                                setLikeOpen(false);
                            }
                            // temp recipeId
                            const recipeId = recipe.id

                            return (
                                <div className="recipe-container">
                                    <a href="">
                                        <img className='recipe-img' src="#" alt="" />
                                    </a>
                                    <div className="recipe-details-container">
                                        <div className="recipe-name"><span onClick={() => history.push(`/recipes/${recipe.id}`)}>{recipe.name}</span></div>
                                        <div className="recipe-baker">by {user.name}</div>
                                        <div className="recipe-following-container">
                                            <Button color="inherit" onClick={() => handleLikeOpen()}>{recipe.likes.length} Likes</Button>
                                            <FollowerDialog open={likeOpen} recipe={recipe.likes} onClose={handleLikeClose} />
                                            <Button color="inherit">{recipe.comments.length} Comments</Button>
                                        </div>
                                    </div>
                                    <div className="recipe-button-container">

                                        <a className="recipe-button" href="#">Start Baking</a>
                                        {
                                            recipe.likes.find(e => e.userId === loggedIn.userId) ?
                                                <a className="recipe-button" onClick={() => Unlike(recipeId, loggedIn)}>Liked</a> :
                                                <a className="recipe-button" onClick={() => Like(recipeId, loggedIn)}>Like</a>
                                        }
                                    </div>
                                </div>
                            )
                        }) : <h2>This user has not published any recipes</h2>
                    }
                </>
                :
                null}
        </>
    )
}