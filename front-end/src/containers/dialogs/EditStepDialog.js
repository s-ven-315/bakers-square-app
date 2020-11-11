import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "../styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { DataContext } from "../../contexts/Context";
import { SaveRecipeSteps } from "../../helpers";
import CTE from "react-click-to-edit"
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';


export function EditStepDialog(props) {
    console.log(`EditStepDialog() is rendered.`)

    const context = useContext(DataContext)
    const { authUser, recipe } = context

    const { onClose, open, steps } = props;
    const [newItem, setNewItem] = useState("")
    const classes = useStyles();
    const [tempList, setTempList] = useState(steps.map(s => s.text))
    useEffect(() => setTempList(steps.map(s => s.text)), [steps])

    const handleInput = (e) => {
        setNewItem(e.target.value)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        console.log(newItem)
        console.log(tempList)
        setTempList([...tempList, newItem])
        setNewItem("")
    }
    const handleRemove = (idx) => {
        console.log(idx)
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }
    const handleChange = (idx, val) => {
        console.log(tempList)
        let clonedList = [...tempList]
        console.log(clonedList)
        clonedList[idx] = val
        console.log(clonedList)
        setTempList(clonedList)
    }

    const handleClose = () => {
        setTempList(steps.map(s => s.text))
        onClose();
    };


    const UP = -1
    const DOWN = 1

    const handleMove = (step, idx, direction) => {
        console.log(idx, direction)
        let items = tempList
        let position = items.findIndex((i) => i === step)
        console.log(position)
        if (direction === UP && position === 0 || direction === DOWN && position === items.length - 1) {
            return
        }

        let item = items[position]
        console.log(item)
        let reList = items.filter((i) => i != step)
        reList.splice(position + direction, 0, item)
        console.log(reList)
        setTempList(reList)
    }
    const handleSave = () => {
        SaveRecipeSteps(context, tempList)
        handleClose()
    }
    return (
        <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="edit-list-dialog" open={open}>
            <DialogTitle id="simple-dialog-title">Recipe Steps</DialogTitle>
            <List>
                {tempList.map((step, idx) => (
                    <ListItem className={classes.rTable} key={idx}>
                        <HighlightOffRoundedIcon className={classes.rDeleteBtn} onClick={() => handleRemove(idx)} />
                        <ListItemText className={classes.rTableTh}>
                            {/* <li>{step}</li> */}
                            <CTE initialValue={step} endEditing={(val) => handleChange(idx, val)} />
                        </ListItemText>
                        {/* <ListItemText className={classes.rList} primary={step} /> */}
                        <ExpandLessIcon className={classes.rDeleteBtn} onClick={() => handleMove(step, idx, UP)} />
                        <ExpandMoreIcon className={classes.rDeleteBtn} onClick={() => handleMove(step, idx, DOWN)} />
                    </ListItem>
                ))}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end" justify="space-between">
                        <Grid item>
                            <form onSubmit={handleAdd}>
                                <TextField className={classes.rForm} autoComplete='off' size='medium' id="input-with-icon-grid" label="Add Step" value={newItem} onChange={handleInput} />
                            </form>
                        </Grid>
                        <Grid item >
                            <AddCircleRoundedIcon className={classes.rAddBtn} onClick={handleAdd} />
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <div className={classes.rButtonDiv}>
                <Button variant="contained" color="primary" className={classes.rButton} onClick={handleSave}>Save</Button>
                <Button variant="contained" className={classes.rButtonClose} onClick={handleClose}>Close</Button>
            </div>
        </Dialog>
    );
}

EditStepDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};