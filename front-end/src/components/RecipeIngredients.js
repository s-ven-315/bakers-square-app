import React, {useState, useEffect, useContext} from "react";
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
import {DataContext} from "../contexts/Context";
import {EditIngredientDialog} from "../containers/dialogs/EditIngredientDialog";



export default function RecipeIngredients() {
    console.log("RecipeIngredients() is rendered.")

    const {authUser, recipe} = useContext(DataContext)

    // View State
    const [open, setOpen] = useState(false);

    // Computed Variables
    const baker = recipe.user
    const isAuthUser = authUser.userId === baker.userId


    const classes = useStyles();
    const [ingrList, setIngrList] = useState(recipe.ingredients)
    useEffect(()=> setIngrList(recipe.ingredients), [recipe.ingredients])

    const [submitted, setSubmitted] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/recipes/" + recipe.id, {
            headers: {
                Authorization: "Bearer " + authUser.access_token
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
                        {ingrList === [] ? null :

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
                {isAuthUser ?
                    <>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Edit
                        </Button>
                        <EditIngredientDialog
                            ingrList={ingrList} setIngrList={setIngrList} open={open} onClose={handleClose}
                            setSubmitted={setSubmitted} />
                    </> : null}
            </div>
        </>
    )
}