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
import { red } from '@material-ui/core/colors'


const useStyles = makeStyles((theme) => ({
    avatarSmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        backgroundColor: red[500],
        marginRight: 10,
        cursor: 'pointer'
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer'
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
    }

}));

function EditList(props) {
    const [newItem, setNewItem] = useState("")
    const classes = useStyles();
    const { onClose, open, ingrList, setIngrList } = props;
    const [tempList, setTempList] = useState(ingrList)


    const handleRemove = (idx) => {
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }
    const handleInput = (e) => {
        setNewItem(e.target.value)
    }
    const handleAdd = () => {
        console.log(newItem)
        setNewItem("")
        setTempList([...tempList, newItem])
    }
    const handleClose = () => {
        setTempList(ingrList)
        onClose();
    };
    const handleSave = () => {
        setIngrList(tempList)
        handleClose()
    }
    return (
        <Dialog onClose={handleClose} aria-labelledby="edit-list-dialog" open={open}>
            <DialogTitle id="simple-dialog-title">Edit Ingredients List</DialogTitle>
            <List>
                {tempList.map((ingr, idx) => (
                    <ListItem key={idx}>
                        <Avatar button className={classes.avatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.list} primary={ingr} />
                    </ListItem>
                ))}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <form>
                                <TextField autoComplete='off' id="input-with-icon-grid" label="Add Ingredient" value={newItem} onChange={handleInput} />
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
            <Divider />
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
export default function RecipeIngredients({ ingrList, setIngrList }) {
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
            <ul className={classes.list}>
                {ingrList.map((ingr) => {
                    return (
                        <li>{ingr}</li>
                    )
                })}
            </ul>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Edit
      </Button>
                <EditList ingrList={ingrList} setIngrList={setIngrList} open={open} onClose={handleClose} />
            </div>
        </>
    )
}