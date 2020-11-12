import React, { useState, useContext } from "react";
import { useStyles } from '../containers/styles'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DataContext } from "../contexts/Context";
import { EditIngredientDialog } from "../containers/dialogs/EditIngredientDialog";



export default function RecipeIngredients() {
    console.log("RecipeIngredients() is rendered.")

    const { authUser, recipe } = useContext(DataContext)

    // View State
    const [open, setOpen] = useState(false);

    // Computed Variables
    const baker = recipe.user
    const isAuthUser = authUser.userId === baker.userId

    const classes = useStyles();
    const ingrList = recipe.ingredients
    console.log(ingrList)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="recipe-ingredients">

            <TableContainer className={classes.rTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.rTableHead} align="left">Ingredients</TableCell>
                            <TableCell className={classes.rTableHead} align="right">Quantity</TableCell>
                            <TableCell className={classes.rTableHead} align="right">Unit</TableCell>
                            <TableCell className={classes.rTableHead} align="right">Remark</TableCell>
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
                                    <TableCell align="center">{ingr.remark === null || ingr.remark == "" ? <span>-</span> : <span>{ingr.remark}</span>}</TableCell>
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
                            ingrList={ingrList} open={open} onClose={handleClose} />
                    </> : null}
            </div>
        </div>
    )
}