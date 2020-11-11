import React, {useContext, useEffect, useState} from "react";
import {useStyles} from "../styles";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import RemoveIcon from "@material-ui/icons/Remove";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {DataContext} from "../../contexts/Context";
import {SaveRecipeSteps} from "../../helpers";


export function EditStepDialog(props) {
    console.log(`EditStepDialog() is rendered.`)

    const context = useContext(DataContext)
    const {authUser, recipe} = context

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
        let reList = items.filter((i) => i !== step)
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
            <DialogTitle id="simple-dialog-title">Edit Steps</DialogTitle>
            <List>
                {tempList.map((step, idx) => (
                    <ListItem key={idx}>
                        <Avatar button className={classes.rAvatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.rList} primary={step} />
                        <Avatar button className={classes.rArrow} onClick={() => handleMove(step, idx, UP)}>
                            <ExpandLessIcon />
                        </Avatar>
                        <Avatar button className={classes.rArrow} onClick={() => handleMove(step, idx, DOWN)}>
                            <ExpandMoreIcon />
                        </Avatar>
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
                            <Avatar className={classes.rAvatar} onClick={handleAdd} >
                                <AddIcon />
                            </Avatar>
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