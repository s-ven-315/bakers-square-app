import React, { useState } from "react"
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import Divider from '@material-ui/core/Divider';
import { red } from '@material-ui/core/colors';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    avatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: red[500],
        marginRight: 10,
        cursor: 'pointer'
    },
    dialog: {
        width: '65%',
        maxWidth: 'auto'
    },
    arrow: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
        marginRight: 10,
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer',
        marginRight: 10
    },
    list: {
        textTransform: "capitalize"
    },
    margin: {
        margin: theme.spacing(1),
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        width: "100%",
    },
    buttonClose: {
        width: "100%",
        backgroundColor: red[500],
        color: "white"
    },
    form: {
        width: '30rem'
    }
}));

function EditList(props) {
    const { onClose, open, steps, setSteps } = props;
    const [newItem, setNewItem] = useState("")
    const classes = useStyles();
    const [tempList, setTempList] = useState(steps)


    const handleInput = (e) => {
        setNewItem(e.target.value)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        console.log(newItem)
        setNewItem("")
        setTempList([...tempList, newItem])
    }
    const handleRemove = (idx) => {
        console.log(idx)
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }
    const handleClose = () => {
        setTempList(steps)
        onClose();
    };
    const handleSave = () => {
        setSteps(tempList)
        handleClose()
    }

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

    return (
        <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="edit-list-dialog" open={open}>
            <DialogTitle id="simple-dialog-title">Edit Steps</DialogTitle>
            <List>
                {tempList.map((step, idx) => (
                    <ListItem key={idx}>
                        <Avatar button className={classes.avatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.list} primary={step} />
                        <Avatar button className={classes.arrow} onClick={() => handleMove(step, idx, UP)}>
                            <ExpandLessIcon />
                        </Avatar>
                        <Avatar button className={classes.arrow} onClick={() => handleMove(step, idx, DOWN)}>
                            <ExpandMoreIcon />
                        </Avatar>
                    </ListItem>
                ))}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end" justify="space-between">
                        <Grid item>
                            <form onSubmit={handleAdd}>
                                <TextField className={classes.form} autoComplete='off' size='medium' id="input-with-icon-grid" label="Add Step" value={newItem} onChange={handleInput} />
                            </form>
                        </Grid>
                        <Grid item >
                            <Avatar className={classes.avatar} onClick={handleAdd} >
                                <AddIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <div className={classes.buttonDiv}>
                <Button variant="contained" color="primary" className={classes.button} onClick={handleSave}>Save</Button>
                <Button variant="contained" className={classes.buttonClose} onClick={handleClose}>Close</Button>
            </div>
        </Dialog>
    );
}

EditList.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default function RecipeIngredients({ steps, setSteps }) {
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
            <ol className={classes.list}>
                {steps.map((step) => {
                    return (
                        <li>{step}</li>
                    )
                })}
            </ol>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Edit
      </Button>
                <EditList steps={steps} setSteps={setSteps} open={open} onClose={handleClose} />
            </div>
        </>
    )
}

