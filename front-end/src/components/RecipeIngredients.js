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
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import CTE from "react-click-to-edit"

function EditList(props) {
    const classes = useStyles();
    const { onClose, open, ingrList, setSubmitted, loggedIn, recipeId } = props;
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
            url: `http://localhost:5000/api/recipes/${recipeId}/ingredients`,
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
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
                Authorization: "Bearer " + loggedIn.access_token
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
            <DialogTitle id="simple-dialog-title">Ingredient List</DialogTitle>
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

EditList.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default function RecipeIngredients({ recipeId, loggedIn, baker }) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [ingrList, setIngrList] = useState([])
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
                console.log("RecipeIngredients: http://localhost:5000/api/recipes/ GET is called()")
                setIngrList(response.data.data.ingredients)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [submitted])

    return (
        <>
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
                        {ingrList == [] ? null :

                            ingrList.map((ingr) => (
                                <TableRow key={ingr.id}>
                                    <TableCell component="th" scope="row">
                                        {ingr.name}
                                    </TableCell>
                                    <TableCell align="right">{ingr.qty}</TableCell>
                                    <TableCell align="right">{ingr.unit === "" ? <span>-</span> : <span>{ingr.unit}</span>}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                {loggedIn.userId == baker.userId ?
                    <>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <EditList ingrList={ingrList} setIngrList={setIngrList} open={open} onClose={handleClose} setSubmitted={setSubmitted} loggedIn={loggedIn} recipeId={recipeId} />
                    </> : null}
            </div>
        </>
    )
}