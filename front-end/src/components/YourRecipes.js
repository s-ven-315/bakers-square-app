import React, {useContext, useState} from "react"
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
import DeleteIcon from '@material-ui/icons/Delete';
import RecipeCard from "../containers/RecipeCard";
import {DataContext} from "../contexts/Context";
import {RecipeDialog} from "../containers/dialogs/RecipeDialog";


export default function YourRecipes() {
    console.log("YourRecipes() is rendered.")
    const {authUser, user} = useContext(DataContext)
    const classes = useStyles();

    // View State
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <>
            {user.recipes ?
                <>
                    <div className='add-new-recipe-button'>
                        {user.userId === authUser.userId ?
                            <>
                                <Button className={classes.yRButton} variant="contained" color="primary"
                                        onClick={() => setCreateOpen(true)}>
                                    <AddCircleOutlineOutlinedIcon />
                                    <span className={classes.yRSpan} >Add New Recipe</span>
                                </Button>
                                <RecipeDialog title={"Create New Recipe"} open={createOpen} setOpen={setCreateOpen} isNew={true}/>
                            </> : null
                        }
                    </div>
                    { user.recipes.length !== 0 ?
                        user.recipes.slice(0).reverse().map(recipe => <RecipeCard recipe={recipe} key={recipe.id}/>)
                        : <h2>This user has not published any recipes</h2>
                    }
                </>
                :
                null}
        </>
    )
}