import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { useStyles } from '../containers/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CTE from "react-click-to-edit"
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';


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
            <Table className={classes.rTable}>
                <TableBody >
                    {steps === [] ? null :

                        steps.map((step, idx) => (
                            <TableRow key={step.no}>
                                <TableCell className={classes.rTableBorderNone} align="right">{idx + 1}.</TableCell>
                                <TableCell className={classes.rTableBorderNone} component="th" scope="row">
                                    {step.text}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div>
                {isAuthUser ? <>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>Edit</Button>
                    <EditStepDialog steps={steps} open={open} onClose={handleClose}/> </> : null}
            </div>
        </>
    )
}

