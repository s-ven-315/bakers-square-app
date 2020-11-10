import React, { useState } from "react"
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useStyles } from '../containers/styles';
import { useHistory } from "react-router-dom"
import { AddNewRecipe } from '../helpers'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import RecipeCard from "../containers/RecipeCard";


export default function YourRecipes({ loggedIn, user }) {
    const classes = useStyles();
    const history = useHistory()

    // create new recipe
    const [createOpen, setCreateOpen] = useState(false);
    const [input, setInput] = useState("")

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
                    { user.recipes.length !== 0 ?
                        user.recipes.slice(0).reverse().map(recipe => <RecipeCard recipe={recipe} loggedIn={loggedIn} key={recipe.id}/>)
                        : <h2>This user has not published any recipes</h2>
                    }
                </>
                :
                null}
        </>
    )
}