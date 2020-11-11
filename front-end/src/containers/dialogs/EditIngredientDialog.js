import {useStyles} from "../styles";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import RemoveIcon from "@material-ui/icons/Remove";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {DataContext} from "../../contexts/Context";

export function EditIngredientDialog(props) {
    console.log(`EditIngredientDialog() is rendered.`)

    const {authUser, recipe} = useContext(DataContext)
    const classes = useStyles();
    const { onClose, open, ingrList, setSubmitted } = props;
    const [newItemId, setNewItemId] = useState(0)
    const [qty, setQty] = useState("")
    const [unit, setUnit] = useState("")
    const [tempList, setTempList] = useState(ingrList)
    const [ingrOptions, setIngrOptions] = useState([])
    useEffect(() => setTempList(ingrList), [ingrList])
    const handleRemove = (idx) => {
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const newIngr = ingrOptions.find(ingr => ingr.id === newItemId)
        if (newIngr) {
            setTempList([...tempList, { id: newItemId, name: newIngr.name, qty: qty, unit: unit }])
        }
        setNewItemId(0)
        setQty("")
        setUnit("")
    }
    const handleClose = () => {
        setTempList(ingrList)
        onClose();
    };
    const handleSelect = (e) => {
        setNewItemId(e.target.value)
    }
    const handleQty = (e) => {
        setQty(e.target.value)
    }
    const handleUnit = (e) => {
        setUnit(e.target.value)
    }
    const handleSave = () => {
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/recipes/${recipe.id}/ingredients`,
            headers: {
                Authorization: "Bearer " + authUser.access_token
            },
            data: {
                ingredientList: tempList
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

    //get all ingredients
    useEffect(() => {
        axios.get("http://localhost:5000/api/ingredients/", {
            headers: {
                Authorization: "Bearer " + authUser.access_token
            }
        })
            .then((response) => {
                console.log(response.data.data)
                setIngrOptions(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <Dialog onClose={handleClose} fullwidth='true' aria-labelledby="edit-list-dialog" open={open}>
            <DialogTitle id="simple-dialog-title">Ingredient List</DialogTitle>
            <List>
                {tempList ? tempList.map((ingr, idx) => (
                    <ListItem key={idx}>
                        <Avatar button="true" className={classes.rAvatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.rList} primary={ingr.name + "," + ingr.qty + ingr.unit} />
                    </ListItem>
                )) : null}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <form className="ingredient-add-form" onSubmit={handleAdd}>
                                <Select onChange={handleSelect} value={newItemId}>
                                    <MenuItem value={0}>Select an Ingredient</MenuItem>
                                    {ingrOptions ? ingrOptions.map(ingr => (
                                        <MenuItem value={ingr.id} key={ingr.id}>{ingr.name}</MenuItem>
                                    )) : null}
                                </Select>
                                <TextField className={classes.rQty} label="quantity" value={qty} onChange={handleQty} />
                                <TextField className={classes.rUnit} label="unit" value={unit} onChange={handleUnit} />
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
        </Dialog >
    );
}

EditIngredientDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};