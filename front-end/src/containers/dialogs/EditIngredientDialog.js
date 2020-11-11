import { useStyles } from "../styles";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { DataContext } from "../../contexts/Context";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CTE from "react-click-to-edit"
import InputLabel from '@material-ui/core/InputLabel';
import { SaveRecipeIngr } from "../../helpers";


export function EditIngredientDialog(props) {
    console.log(`EditIngredientDialog() is rendered.`)

    const context = useContext(DataContext)
    const { authUser, recipe } = context
    const classes = useStyles();
    const { onClose, open, ingrList } = props;
    const [newItemId, setNewItemId] = useState(0)
    const [qty, setQty] = useState("")
    const [unit, setUnit] = useState("Unit")
    const [tempList, setTempList] = useState(ingrList)
    const [ingrOptions, setIngrOptions] = useState([])
    const allowedUnit = ['pc', 'gram', 'kg', 'oz', 'litre', 'tbsp', 'tsp', 'millilitre', 'pinch']

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
        SaveRecipeIngr(context, tempList)
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
        <Dialog onClose={handleClose} fullwidth="true" aria-labelledby="edit-list-dialog" open={open}>
            <List>
                <TableContainer className={classes.rTable}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.rTableHead} align="left">Ingredients</TableCell>
                                <TableCell className={classes.rTableHead} align="right">Quantity</TableCell>
                                <TableCell className={classes.rTableHead} align="right">Unit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tempList ? tempList.map((ingr, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className={classes.rEditTable} component="th" scope="row">
                                        <HighlightOffRoundedIcon className={classes.rDeleteBtn} onClick={() => handleRemove(idx)} />
                                        <CTE wrapperCLass="wrapper" textClass="text" initialValue={`${ingr.name}`} />
                                    </TableCell>
                                    <TableCell align="right">{ingr.qty}</TableCell>
                                    <TableCell align="right">{ingr.unit === "" ? <span>-</span> : <span>{ingr.unit}</span>}</TableCell>
                                </TableRow>
                            )) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {tempList ? tempList.map((ingr, idx) => (
                    <ListItem key={idx}>
                        <Avatar button="true" className={classes.rAvatarSmall} onClick={() => handleRemove(idx)}>
                            <RemoveIcon />
                        </Avatar>
                        <ListItemText className={classes.rList} primary={ingr.name + "," + ingr.qty + ingr.unit} />
                    </ListItem>
                )) : null} */}
                <ListItem>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <div className="ingredient-add-form">
                                <form >
                                    <InputLabel shrink className={classes.rShrink} id="demo-simple-select-placeholder-label-label">
                                        Ingredient
                                    </InputLabel>
                                    <Select className={classes.rDefault} onChange={handleSelect} value={newItemId}>
                                        <MenuItem value={0}>Select an Ingredient</MenuItem>
                                        {ingrOptions ? ingrOptions.map(ingr => (
                                            <MenuItem value={ingr.id} key={ingr.id}>{ingr.name}</MenuItem>
                                        )) : null}
                                    </Select>
                                    <TextField InputLabelProps={{
                                        shrink: true,
                                    }} className={classes.rQty} label="Quantity" value={qty} onChange={handleQty} />
                                </form>
                                <form>
                                    <InputLabel shrink className={classes.rShrink} id="demo-simple-select-placeholder-label-label">
                                        Unit
                                    </InputLabel>
                                    <Select className={classes.rDefault} onChange={handleUnit} value={unit}>
                                        <MenuItem value={unit}>Unit</MenuItem>
                                        {allowedUnit ? allowedUnit.map(unit => (
                                            <MenuItem value={unit}>{unit}</MenuItem>
                                        )) : null}
                                    </Select>
                                </form>

                            </div>
                        </Grid>
                        <Grid item >
                            <AddCircleRoundedIcon className={classes.rAddBtn} onClick={handleAdd} />
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