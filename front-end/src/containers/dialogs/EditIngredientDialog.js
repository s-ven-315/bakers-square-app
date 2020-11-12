import {useStyles} from "../styles";
import React, {useContext, useEffect, useState} from "react";
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
import {DataContext} from "../../contexts/Context";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import InputLabel from '@material-ui/core/InputLabel';
import {SaveRecipeIngr} from "../../helpers";
import {ClickToEdit} from "../ClickToEdit";
import DialogTitle from "@material-ui/core/DialogTitle";

const emptyIngr = {
    id: 0,
    name: '',
    qty: '',
    unit: '',
    remark: '',
}


export function EditIngredientDialog(props) {
    console.log(`EditIngredientDialog() is rendered.`)

    const context = useContext(DataContext)
    const { authUser } = context
    const classes = useStyles();
    const { onClose, open, ingrList } = props;
    const [tempList, setTempList] = useState(ingrList)
    const [ingrOptions, setIngrOptions] = useState([])
    const allowedUnit = ['pc', 'gram', 'kg', 'oz', 'litre', 'tbsp', 'tsp', 'millilitre', 'pinch', 'stick', 'cup']

    useEffect(() => setTempList(ingrList), [ingrList])

    const handleRemove = (idx) => {
        let clonedList = [...tempList]
        clonedList.splice(idx, 1)
        setTempList(clonedList)
    }

    const handleAdd = (e) => {
        setTempList([...tempList, emptyIngr])
    }

    function handleClose() {
        setTempList(ingrList)
        onClose();
    }

    const handleSave = () => {
        SaveRecipeIngr(context, tempList, handleClose)
    }

    const handleChange = (idx, value, key) => {
        const ingrToEdit = tempList[idx]
        if (key === 'name') {
            ingrToEdit.id = value
            ingrToEdit.name = ingrOptions.find(i => i.id === value).name
        }
        else if (key === 'qty') {
            ingrToEdit.qty = value
        }
        else if (key === 'unit') {
            ingrToEdit.unit = value
        }
        else if (key === 'remark') {
            ingrToEdit.remark = value
        }
        tempList[idx] = ingrToEdit
        setTempList([...tempList])
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
        <Dialog onBackdropClick={handleClose} open={open} className='ingredient-dialog'>
            <DialogTitle id="simple-dialog-title">Recipe Ingredients</DialogTitle>
            <TableContainer className='ingredient-dialog-table'>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.rTableHead} align="left">Ingredients</TableCell>
                            <TableCell className={classes.rTableHead} align="right">Quantity</TableCell>
                            <TableCell className={classes.rTableHead} align="right">Unit</TableCell>
                            <TableCell className={classes.rTableHead} align="left">Remark</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tempList ? tempList.map((ingr, idx) => (
                            <TableRow key={idx} padding='none'>
                                <TableCell className='ingredient-dialog-cell' align='left' width='40%'>
                                    <div className="table-ingr-name-container">
                                        <HighlightOffRoundedIcon className={classes.rDeleteBtn} onClick={() => handleRemove(idx)} style={{display: 'inline'}}/>
                                        <Select value={ingr.id}
                                                onChange={(event) => handleChange(idx, event.target.value, 'name')}
                                                className='inline'
                                        >
                                            {ingrOptions.map(l => <MenuItem value={l.id} key={l.id}>{l.name}</MenuItem>)}
                                        </Select>
                                    </div>
                                </TableCell>
                                <TableCell className='ingredient-dialog-cell' align='right' width='20%'>
                                    <TextField value={ingr.qty}
                                               onChange={(e) => handleChange(idx, e.target.value, 'qty')}
                                               className='inline'
                                    />
                                </TableCell>
                                <TableCell className='ingredient-dialog-cell' align='right' width='10%'>
                                    <Select value={ingr.unit}
                                            onChange={(event) => handleChange(idx, event.target.value, 'unit')}
                                            className='inline'>
                                        {allowedUnit.map(l => <MenuItem value={l} key={l}>{l}</MenuItem>)}
                                    </Select>
                                </TableCell>
                                <TableCell className='ingredient-dialog-cell' align='left' width='20%'>
                                   <TextField value={ingr.remark}
                                              onChange={(e) => handleChange(idx, e.target.value, 'remark')}
                                              className='inline'
                                   />
                                </TableCell>
                            </TableRow>
                        )) : null
                        }
                    </TableBody>
                </Table>
                <div className="ingredient-dialog-table-blank"/>
            </TableContainer>
            <Divider />
            <div className={classes.rButtonDiv}>
                <Button variant="contained" color="primary" className={classes.rButton} onClick={handleSave}>Save</Button>
                <Button variant="contained" className={classes.rButtonClose} onClick={handleClose}>Close</Button>
            </div>
            <AddCircleRoundedIcon onClick={handleAdd} className='floating-button'/>
        </Dialog >
    );
}

EditIngredientDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};