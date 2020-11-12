import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {CreateRecipe, EditRecipe} from "../../helpers";
import Dialog from "@material-ui/core/Dialog";
import React, {useContext, useState} from "react";
import {DataContext} from "../../contexts/Context";
import {useHistory} from 'react-router-dom';

export function RecipeDialog({title, recipe, open, setOpen, isNew}) {
    console.log(`RecipeDialog() is rendered (title: ${title}).`)

    const context = useContext(DataContext)
    const history = useHistory()
    const [name, setName] = useState(recipe.name)
    const [serving, setServing] = useState(recipe.serving)
    const [preparationTime, setPreparationTime] = useState(recipe.preparation_time)
    const [cookingTime, setCookingTime] = useState(recipe.cooking_time)
    const onCloseDialog = () => setOpen(false);

    const onSave = (name) => {
        if (!isNew) return EditRecipe(context, name, serving, preparationTime, cookingTime, setOpen)
        else return CreateRecipe(context, name, serving, preparationTime, cookingTime, setOpen, history)
    }

    return (
    <Dialog fullwidth='true' open={open} onBackdropClick={onCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Recipe Name"
                type="email"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth='true'
                autoComplete='off'
            />
            <TextField
                margin="dense"
                id="name"
                label="Serving"
                type="number"
                value={serving}
                onChange={e => setServing(e.target.value)}
                fullWidth='true'
                autoComplete='off'
            />
            <TextField
                margin="dense"
                id="name"
                label="Preparation Time"
                type="number"
                value={preparationTime}
                onChange={e => setPreparationTime(e.target.value)}
                fullWidth='true'
                autoComplete='off'
            />
            <TextField
                margin="dense"
                id="name"
                label="Cooking Time"
                type="number"
                value={cookingTime}
                onChange={e => setCookingTime(e.target.value)}
                fullWidth='true'
                autoComplete='off'
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => onSave(name)} color="primary">{(isNew)? 'Create':'Save'}</Button>
            <Button onClick={onCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
    </Dialog>
    )
}