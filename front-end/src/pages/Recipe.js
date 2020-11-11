import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {useParams, useHistory, Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import RecipeDetails from '../components/RecipeDetails'
import {Like, EditRecipe, DeleteRecipe, GetRecipe} from '../helpers'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Comments from "../components/Comments"
import { useStyles } from "../containers/styles"
import {UserListDialog} from "../containers/dialogs/UserListDialog";
import DeleteIcon from '@material-ui/icons/Delete';
import {DataContext, emptyRecipe, emptyUser} from "../contexts/Context";
import {RecipeDialog} from "../containers/dialogs/RecipeDialog";
import RecipeCard from "../containers/RecipeCard";



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export default function Recipe() {
    console.log("Recipe() is rendered.")

    const { recipeId } = useParams()
    const context = useContext(DataContext)
    const {authUser, recipe, setUser} = context

    const classes = useStyles();

    // change tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (context.recipe.id !== recipeId){
            GetRecipe(context, recipeId)
        }
        if (context.user.userId){
            setUser(emptyUser)
        }
    }, [recipeId])
    if (!authUser.access_token) {
        return <Redirect to="/" />
    }

    return (
        <>
            {!recipe.id?
                <h1>Recipe not found</h1> :
                <div style={{display:'flex', flexFlow: 'column nowrap', alignItems: 'center', maxWidth: '1080px', margin: '0 auto'}}>
                    <RecipeCard recipe={recipe}
                                key={recipe.id}
                                hideComments={true}
                                hideEdit={false}
                    />
                    <div className="recipe-page-container-outer">
                        <Tabs
                            value={value}
                            className={classes.rTabs}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="The Recipe" />
                            <Tab label="Comments" />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <RecipeDetails />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Comments />
                        </TabPanel>
                    </div>
                </div>
            }
        </>
    )
}