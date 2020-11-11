import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {AddNewRecipe, EditRecipeName} from "../../helpers";
import Dialog from "@material-ui/core/Dialog";
import React, {useContext, useState} from "react";
import {DataContext} from "../../contexts/Context";
import {useHistory} from 'react-router-dom';

export function RecipeDialog({title, open, setOpen, isNew}) {
    console.log(`RecipeDialog() is rendered (title: ${title}).`)

    const context = useContext(DataContext)
    const history = useHistory()
    const [name, setName] = useState("")
    const onCloseDialog = () => setOpen(false);

    const onSave = (name) => {
        if (!isNew) return EditRecipeName(context, name, setOpen)
        else return AddNewRecipe(context, name, setOpen, history)
    }

    return (
    <Dialog fullwidth='true' open={open} onBackdropClick={onCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Recipe Name"
                type="email"
                onChange={e => setName(e.target.value)}
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