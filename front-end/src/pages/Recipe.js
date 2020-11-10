import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
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
import { Like, EditRecipeName } from '../helpers'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Comments from "../components/Comments"
import { useStyles } from "../containers/styles"
import {UserListDialog} from "../containers/dialogs/UserListDialog";


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


export default function Profile({ loggedIn }) {
    const [recipe, setRecipe] = useState({})
    const [error, setError] = useState(null)
    const [baker, setBaker] = useState({})
    const { recipeId } = useParams()
    const [ingrList, setIngrList] = useState([])
    const [steps, setSteps] = useState([])

    const classes = useStyles();
    const history = useHistory();
    console.log(classes.recipe)

    // edit recipe name dialog
    const [editOpen, setEditOpen] = React.useState(false);
    const [input, setInput] = useState("")
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const handleEdit = () => {
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };

    // like dialog
    const [likeOpen, setLikeOpen] = React.useState(false);
    const [likes, setLikes] = useState(recipe.likes || [])
    const isLike = likes.find(e => e.userId === loggedIn.userId)

    const goToRecipePage = () => history.push(`/recipes/${recipe.id}`);
    const goToUserPage = () => history.push(`/users/${recipe.user.userId}`);

    // change tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // axios get recipe
    useEffect(() => {
        axios.get("http://localhost:5000/api/recipes/" + recipeId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                console.log(response)
                const data = response.data.data
                setRecipe(data)
                setBaker(data.user)
                setIngrList(data.ingredients)
                setSteps(data.steps)
                setLikes(data.likes)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
    }, [])

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
                                {baker.name === loggedIn.name ?
                                    <>
                                        <EditIcon className={classes.recipeEdit} onClick={handleEdit} />
                                        <Dialog fullwidth='true' open={editOpen} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Change Recipe's Name</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="name"
                                                    label="New Recipe's Name"
                                                    type="email"
                                                    onChange={handleInput}
                                                    fullWidth='true'
                                                    autoComplete='off'
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => EditRecipeName(loggedIn, recipeId, input, setRecipe, recipe, setEditOpen)} color="primary">
                                                    Save
                                            </Button>
                                                <Button onClick={handleEditClose} color="primary">
                                                    Cancel
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </> :
                                    null
                                }</div>
                            <div className="recipe-baker" onClick={goToUserPage}>by {baker.name} </div>
                            <div className="recipe-following-container">
                                <Button color="inherit" onClick={() => setLikeOpen(true)}>{likes ? likes.length : 0} Likes</Button>
                                <Button color="inherit">{recipe.comments ? recipe.comments.length : 0} Comments</Button>
                            </div>
                        </div>
                        <div className="recipe-button-container">
                            {baker.name === loggedIn.name ?
                                <button className="recipe-button"><EditIcon/></button> : null
                            }
                            <button className="recipe-button">Start Baking</button>
                            {isLike ?
                                <button className="recipe-button"
                                        onClick={() => Like(recipe.id, loggedIn, false, likes, setLikes)}>Liked</button> :
                                <button className="recipe-button"
                                        onClick={() => Like(recipe.id, loggedIn, true, likes, setLikes)}>Like</button>
                            }
                        </div>
                    </div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="The Recipe" />
                        <Tab label="Comments" />
                    </Tabs>
                    <TabPanel value={value} index={0}>

                        <RecipeDetails loggedIn={loggedIn} baker={baker} recipeId={recipeId} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Comments loggedIn={loggedIn} recipeId={recipeId} />
                    </TabPanel>
                </>
            }
        </>
    )
}