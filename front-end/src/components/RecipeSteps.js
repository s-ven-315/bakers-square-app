import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { useStyles } from '../containers/styles';
import Button from '@material-ui/core/Button';
import {DataContext} from "../contexts/Context";
import {EditStepDialog} from "../containers/dialogs/EditStepDialog";



export default function RecipeSteps() {
    console.log("RecipeSteps() is rendered.")
    const {authUser, recipe} = useContext(DataContext)

    // Computed Variables
    const baker = recipe.user;
    const isAuthUser = authUser.userId === baker.userId;
    const steps = recipe.steps

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ol className={classes.rList}>
                {steps.map(step => <li key={step.no}>{step.text}</li>)}
            </ol>
            <div>
                {isAuthUser ? <>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>Edit</Button>
                    <EditStepDialog steps={steps} open={open} onClose={handleClose}/> </> : null}
            </div>
        </>
    )
}

