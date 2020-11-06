import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom"
import { Like, Unlike } from '../helpers'

const useStyles = makeStyles({
    span: {
        marginLeft: 5,
    },
    button: {
        marginTop: '1rem',
    }
});

function FollowerDialog(props) {
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
                This is {recipe.id}
                {recipe.likes.map((like) => (
                    <>
                        {like.name}
                    </>
                ))}
            </List>
        </Dialog>
    );
}

export default function YourRecipes({ loggedIn, user }) {
    const classes = useStyles();
    const [likeOpen, setLikeOpen] = React.useState(false);
    const history = useHistory()
    // like dialog

    return (
        <>
            {user.recipes ?
                <>
                    <div className='add-new-recipe-button'>
                        {user.name === loggedIn.name ?
                            <Button className={classes.button} variant="contained" color="primary"><AddCircleOutlineOutlinedIcon /> <span className={classes.span} >Add New Recipe</span></Button> : null
                        }
                    </div>
                    { user.recipes.length != 0 ?
                        user.recipes.map(recipe => {

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
                                            <FollowerDialog open={likeOpen} recipe={recipe} onClose={handleLikeClose} />
                                            <Button color="inherit">{recipe.comments.length} Comments</Button>
                                        </div>
                                    </div>
                                    <div className="recipe-button-container">
                                        {user.name === loggedIn.name ?
                                            <>
                                                <a className="recipe-button" href="#"><EditIcon /></a>
                                            </> :
                                            null
                                        }
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