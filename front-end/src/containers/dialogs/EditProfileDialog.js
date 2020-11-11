import React, {useContext, useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {EditProfileName} from "../../helpers";
import {DataContext} from "../../contexts/Context";


export function EditProfileDialog(props) {
    console.log(`EditProfileDialog() is rendered.`)
    const context = useContext(DataContext)
    const [name, setName] = useState("")
    const {open, setOpen} = props;

    const closeDialog = () => setOpen(false);

    return (
        <Dialog fullwidth='true' open={open} onBackdropClick={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Profile Name</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="name" label="New Profile Name" type="text"
                           onChange={e => setName(e.target.value)} fullWidth='true' autoComplete='off'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => EditProfileName(context, name, setOpen)}
                        color="primary">Save</Button>
                <Button onClick={closeDialog} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}