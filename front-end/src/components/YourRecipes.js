import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useStyles } from '../containers/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router-dom"
import { Like, Unlike, AddNewRecipe } from '../helpers'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


function LikesDialog(props) {
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

export default function YourRecipes({ loggedIn, user }) {
    const classes = useStyles();
    const [likeOpen, setLikeOpen] = React.useState(false);
    const history = useHistory()
    // create new recipe
    const [createOpen, setCreateOpen] = useState(false);
    const [input, setInput] = useState("")
    const [like, setLike] = useState(false)
    const [unlike, setUnlike] = useState(false)

    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleCreate = () => {
        setCreateOpen(true);
    };
    const handleCreateClose = () => {
        setCreateOpen(false);
    };
    const userId = user.userId
    return (
        <>
            {user.recipes ?
                <>
                    <div className='add-new-recipe-button'>
                        {user.name === loggedIn.name ?
                            <>
                                <Button className={classes.yRButton} variant="contained" color="primary" onClick={handleCreate}>
                                    <AddCircleOutlineOutlinedIcon />
                                    <span className={classes.yRSpan} >Add New Recipe</span>
                                </Button>
                                <Dialog fullwidth='true' open={createOpen} onClose={handleCreateClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Add New Recipe</DialogTitle>
                                    <DialogContent>

                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="New Recipe Name"
                                            type="email"
                                            onChange={handleInput}
                                            fullWidth='true'
                                            autoComplete='off'
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => AddNewRecipe(loggedIn, userId, input, setCreateOpen, history)} color="primary">
                                            Create
                    </Button>
                                        <Button onClick={handleCreateClose} color="primary">
                                            Cancel
                    </Button>
                                    </DialogActions>
                                </Dialog> </>
                            : null
                        }
                    </div>
                    { user.recipes.length != 0 ?
                        user.recipes.slice(0).reverse().map(recipe => {

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
                                            <LikesDialog open={likeOpen} recipe={recipe.likes} onClose={handleLikeClose} />
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
                                                <a className="recipe-button" onClick={() => Unlike(recipeId, loggedIn, like, setLike)}>Liked</a> :
                                                <a className="recipe-button" onClick={() => Like(recipeId, loggedIn, unlike, setUnlike)}>Like</a>
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