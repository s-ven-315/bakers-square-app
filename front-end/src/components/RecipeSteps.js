import React, { useState, useEffect } from "react"
import axios from "axios"
import PropTypes from 'prop-types';
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


function EditList(props) {
    const { onClose, open, steps, setSubmitted, recipeId, loggedIn } = props;
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
        let reList = items.filter((i) => i != step)
        reList.splice(position + direction, 0, item)
        console.log(reList)
        setTempList(reList)
    }
    const handleSave = () => {
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/recipes/${recipeId}/steps`,
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            },
            data: {
                steps: tempList
            }
        })
            .then(response => {
                console.log(response)
                setSubmitted(true)
            })
            .catch(error => {
                console.error(error.response)
            })
        setSubmitted(false)
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

EditList.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default function RecipeIngredients({ recipeId, loggedIn, baker }) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [steps, setSteps] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/recipes/" + recipeId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                console.log(response)
                setSteps(response.data.data.steps)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [submitted])
    return (
        <>
            <ol className={classes.rList}>
                {steps.map((step) => {
                    return (
                        <li key={step.no}>{step.text}</li>
                    )
                })}
            </ol>
            <div>
                {loggedIn.userId == baker.userId ? <>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Edit
      </Button>
                    <EditList steps={steps} open={open} onClose={handleClose} setSubmitted={setSubmitted} recipeId={recipeId} loggedIn={loggedIn} /> </> : null}
            </div>
        </>
    )
}

