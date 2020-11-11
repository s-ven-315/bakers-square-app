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
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    const [ingrList, setIngrList] = useState([])
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
            <ul className={classes.rList}>
                {ingrList === [] ? null :
                    ingrList.map((ingr) => {
                        return (
                            <li key={ingr.id}>{ingr.name}, {ingr.qty}{ingr.unit}</li>
                        )
                    })
                }

            </ul>
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