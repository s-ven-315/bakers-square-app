import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";


export function WarningDialog({ title, msg, open, setOpen, onConfirm }) {
    console.log(`WarningDialog() is rendered (title: ${title}).`)
    return (
        <Dialog open={open} onBackdropClick={() => setOpen(false)} fullWidth maxWidth='sm'>
            <DialogTitle>{title}</DialogTitle>
            <Divider />
            <DialogContent>{msg}</DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpen(false); onConfirm()}} color="primary">Confirm</Button>
                <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
        </DialogActions>
        </Dialog>
    );
}