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
import {Like, EditRecipeName, DeleteRecipe, GetRecipe} from '../helpers'
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

    const history = useHistory()

    // View States
    const [editOpen, setEditOpen] = React.useState(false);
    const [likeOpen, setLikeOpen] = React.useState(false);

    // Computed Variables
    const baker = recipe.user;
    const isAuthUser = authUser.userId === baker.userId

    const [error, setError] = useState(null)

    const classes = useStyles();


    // Computed Variables
    const [likes, setLikes] = useState(recipe.likes)
    useEffect(() => setLikes(recipe.likes), [recipe.likes])
    const isLike = likes.find(e => e.userId === authUser.userId)

    const goToRecipePage = () => history.push(`/recipes/${recipe.id}`);
    const goToUserPage = () => history.push(`/users/${recipe.user.userId}`);

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
            {error !== null || recipe === {} ?
                <h1>Recipe not found</h1> :
                <>
                    <div className="recipe-header-container">
                        <UserListDialog title={"Likes"} users={recipe.likes} open={likeOpen} setOpen={setLikeOpen}/>
                        <img className='recipe-img' src={recipe.img_url} alt="" onClick={goToRecipePage}/>
                        <div className="recipe-details-container">
                            <div className="recipe-name" onClick={goToRecipePage}>{recipe.name}
                                {isAuthUser ?
                                    <>
                                        <EditIcon className={classes.recipeEdit} onClick={() => setEditOpen(true)} />
                                        <RecipeDialog title="Change Recipe's Title" editOpen={editOpen} setEditOpen={setEditOpen} isNew={false}/>
                                    </> : null
                                }</div>
                            <div className="recipe-baker" onClick={goToUserPage}>by {baker.name} </div>
                            <div className="recipe-following-container">
                                <Button color="inherit" onClick={() => setLikeOpen(true)}>{likes ? likes.length : 0} Likes</Button>
                                <Button color="inherit">{recipe.comments ? recipe.comments.length : 0} Comments</Button>
                            </div>
                        </div>
                        <div className="recipe-button-container">
                            <button className="recipe-button" onClick={() => DeleteRecipe(context, recipe, history, true)}><DeleteIcon /></button>
                            <button className="recipe-button" onClick={() => history.push(`/recipes/${recipeId}/sessions`)}>Start Baking</button>
                            {isLike ?
                                <button className="recipe-button"
                                        onClick={() => Like(context, false, recipe, setLikes)}>Liked</button> :
                                <button className="recipe-button"
                                        onClick={() => Like(context, true, recipe, setLikes)}>Like</button>
                            }
                        </div>
                    </div>
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
                </>
            }
        </>
    )
}