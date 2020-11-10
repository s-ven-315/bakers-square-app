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
import { Like, Unlike, EditRecipeName, DeleteRecipe } from '../helpers'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Comments from "../components/Comments"
import { useStyles } from "../containers/styles"
import DeleteIcon from '@material-ui/icons/Delete';


function LikesDialog(props) {
    const history = useHistory()

    const { onClose, selectedValue, open, recipe } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };
    return (
        <Dialog onClick={handleClose} aria-labelledby="likes-dialog-title" open={open}>
            <DialogTitle id="followers-dialog-title">Likes</DialogTitle>
            <List>

                {recipe ?
                    recipe.map((r) => (
                        <ListItem button onClick={() => history.push(`/users/${r.userId}`)} key={r}>
                            <ListItemText primary={r.userId} />
                        </ListItem>
                    )) : null}
            </List>
        </Dialog>
    );
}

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
    const history = useHistory()
    const [recipe, setRecipe] = useState({})
    const [error, setError] = useState(null)
    const [baker, setBaker] = useState({})
    const { recipeId } = useParams()
    const [deleted, setDeleted] = useState(false)

    const classes = useStyles();

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
    const handleLikeOpen = () => {
        setLikeOpen(true);
    };
    const handleLikeClose = (value) => {
        setLikeOpen(false);
    };

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
                setRecipe(response.data.data)
                setBaker(response.data.data.user)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
    }, [deleted])

    return (
        <>
            {error !== null || recipe == {} ?
                <h1>Recipe not found</h1> :
                <>
                    <div className="recipe-header-container">
                        <a href="">
                            <img className='recipe-img' src="#" alt="" />
                        </a>
                        <div className="recipe-details-container">
                            <div className="recipe-name">{recipe.name}
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
                            <div className="recipe-baker">by {baker.name} </div>
                            <div className="recipe-following-container">
                                <Button color="inherit" onClick={handleLikeOpen}>{recipe.likes ? recipe.likes.length : 0} Likes</Button>
                                <LikesDialog open={likeOpen} recipe={recipe.likes} onClose={handleLikeClose} />
                                <Button color="inherit">{recipe.comments ? recipe.comments.length : 0} Comments</Button>
                            </div>
                        </div>
                        <div className="recipe-button-container">
                            <a className="recipe-button" onClick={() => DeleteRecipe(loggedIn, recipeId, setDeleted)}><DeleteIcon /></a>
                            <a className="recipe-button" onClick={() => history.push(`/recipes/${recipeId}/sessions`)}>Start Baking</a>
                            {recipe.likes ?
                                recipe.likes.find(e => e.userId === loggedIn.userId) ?
                                    <a className="recipe-button" onClick={() => Unlike(recipeId, loggedIn)}>Liked</a> :
                                    <a className="recipe-button" onClick={() => Like(recipeId, loggedIn)}>Like</a> : null
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