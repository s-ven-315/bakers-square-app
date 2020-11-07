import React, { useState, useEffect } from "react";
import axios from "axios"
import PropTypes from 'prop-types';
import { useStyles } from '../containers/styles'
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



function EditList(props) {
    const { onClose, open, ingrList, setIngrList, setSubmitted } = props;
    const [newItem, setNewItem] = useState("")
    const classes = useStyles();
    const [tempList, setTempList] = useState(ingrList)


    const handleRemove = (idx) => {
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }
    const handleInput = (e) => {
        setNewItem(e.target.value)
    }
    const handleAdd = (e) => {
        e.preventDefault()
        console.log(newItem)
        setTempList([...tempList, newItem])
        setNewItem("")
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
        <Dialog onClose={handleClose} fullwidth='true' aria-labelledby="edit-list-dialog" open={open}>
            <DialogTitle id="simple-dialog-title">Edit Ingredients List</DialogTitle>
            <List>
                {console.log(tempList)}
                {tempList ? tempList.map((ingr, idx) => (
                    <ListItem key={idx}>
                        <Avatar button="true" className={classes.rAvatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.rList} primary={ingr.name} />
                    </ListItem>
                )) : null}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <form onSubmit={handleAdd}>
                                <TextField className={classes.rForm} autoComplete='off' id="input-with-icon-grid" label="Add Ingredient" value={newItem} onChange={handleInput} />
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
            <Divider />
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
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [ingrList, setIngrList] = useState([])
    const [submitted, setSubmitted] = useState(false)
    console.log(ingrList)

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
                setIngrList(response.data.data.ingredients)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <ul className={classes.rList}>
                {ingrList == [] ? null :

                    ingrList.map((ingr) => {
                        return (
                            <li>{ingr.name}</li>
                        )
                    })
                }

            </ul>
            <div>
                {loggedIn.userId == baker.userId ?
                    <>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Edit
                </Button>
                        <EditList ingrList={ingrList} setIngrList={setIngrList} open={open} onClose={handleClose} setSubmitted={setSubmitted} />
                    </> : null}
            </div>
        </>
    )
}