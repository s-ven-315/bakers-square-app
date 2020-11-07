import React, { useEffect, useState } from "react"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import YourRecipes from '../components/YourRecipes';
import LikedRecipes from '../components/LikedRecipes';
import ProfileImg from '../assets/images/profile-placeholder.png'
import EditIcon from '@material-ui/icons/Edit';
import { Follow, Unfollow, EditProfileName } from '../helpers'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

function FollowerDialog(props) {
    const history = useHistory()
    const { onClose, selectedValue, followers, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClick={handleClose} aria-labelledby="followers-dialog-title" open={open}>
            <DialogTitle id="followers-dialog-title">Followers</DialogTitle>
            <List>
                {followers ?
                    followers.map((follower) => (
                        <ListItem button onClick={() => history.push(`/users/${follower.userId}`)} key={follower}>
                            <ListItemText primary={follower.userId} />
                        </ListItem>
                    )) : null}
            </List>
        </Dialog>
    );
}

function FollowingDialog(props) {
    const history = useHistory()
    const { onClose, selectedValue, following, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClick={handleClose} aria-labelledby="following-dialog-title" open={open}>
            <DialogTitle id="following-dialog-title">Following</DialogTitle>
            <List>
                {following ?
                    following.map((f) => (
                        <ListItem button onClick={() => history.push(`/users/${f.userId}`)} key={f}>
                            <ListItemText primary={f.userId} />
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#fff",
        border: theme.palette.secondary.main,
    },
}));


export default function Profile({ loggedIn }) {
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const classes = useStyles();
    const { userId } = useParams()
    const [recipesNum, setRecipesNum] = useState(0)
    const [likedRecipesNum, setLikedRecipesNum] = useState(0)

    // edit profile name
    const [editOpen, setEditOpen] = useState(false);
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

    // change tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // followers dialog
    const [followerOpen, setFollowerOpen] = useState(false);

    const handleFollowerOpen = () => {
        setFollowerOpen(true);
    };

    const handleFollowerClose = (value) => {
        setFollowerOpen(false);
    };

    // following dialog
    const [followingOpen, setFollowingOpen] = useState(false);

    const handleFollowingOpen = () => {
        setFollowingOpen(true);
    };

    const handleFollowingClose = (value) => {
        setFollowingOpen(false);
    };

    // axios get
    useEffect(() => {
        axios.get("http://localhost:5000/api/users/" + userId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                console.log(response)
                setUser(response.data.data)
                setRecipesNum(response.data.data.recipes.length)
                setLikedRecipesNum(response.data.data.liked_recipes.length)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
            })
    }, [userId])

    if (!loggedIn) {
        return <Redirect to="/" />
    }

    return (
        <>
            {error !== null ?
                <h1>User not found</h1> :
                <>
                    <div class="profile-page-container">
                        <div class="profile-container">
                            <div class="profile-container-inner">
                                <div class="profile-img"><img src={ProfileImg} /></div>
                                <div class="profile-details">
                                    <div className="profile-name">{user.name}
                                        {user.name === loggedIn.name ?
                                            <>
                                                <EditIcon color="primary" onClick={handleEdit} />
                                                <Dialog fullwidth='true' open={editOpen} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                                                    <DialogTitle id="form-dialog-title">Change Profile Name</DialogTitle>
                                                    <DialogContent>

                                                        <TextField
                                                            autoFocus
                                                            margin="dense"
                                                            id="name"
                                                            label="New Profile Name"
                                                            type="email"
                                                            onChange={handleInput}
                                                            fullWidth='true'
                                                            autoComplete='off'
                                                        />
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => EditProfileName(loggedIn, userId, input)} color="primary">
                                                            Save
                                            </Button>
                                                        <Button onClick={handleEditClose} color="primary">
                                                            Cancel
                                            </Button>
                                                    </DialogActions>
                                                </Dialog> </> : null
                                        }
                                    </div>
                                    <div className="profile-id">@{user.userId}</div>
                                    <div class="profile-following-container">

                                        <div>
                                            <div onClick={handleFollowerOpen}>
                                                {user.followers ? user.followers.length == 1 ? <><span>1</span>Follower</> : <><span>{user.followers.length}</span>Followers</> : <><span>0</span>Followers</>}
                                            </div>

                                            <FollowerDialog open={followerOpen} onClose={handleFollowerClose} followers={user.followers} />
                                        </div>
                                        <div>
                                            <div onClick={handleFollowingOpen}>
                                                <span>{user.following ? user.following.length : "0"}</span>Following
                                            </div>

                                            <FollowingDialog open={followingOpen} onClose={handleFollowingClose} following={user.following} />
                                        </div>
                                    </div>
                                    <div className="profile-button-container">
                                        {user.name !== loggedIn.name ?
                                            user.followers ?
                                                user.followers.find(e => e.userId === loggedIn.userId) ?
                                                    <Button variant="contained" color="primary" className="profile-button" onClick={() => Unfollow(userId, loggedIn)} >Unfollow</Button>
                                                    : <Button variant="contained" color="primary" className="profile-button" onClick={() => Follow(userId, loggedIn)} >Follow</Button>
                                                : null
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="recipe-container-outer">
                            <div class="tab-container">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    centered
                                >
                                    <Tab label={`${user.name}'s Recipes (${recipesNum})`} />
                                    <Tab label={`${user.name}'s Liked Recipes (${likedRecipesNum})`} />
                                </Tabs>
                            </div>
                            <div class="tab-panel-container">
                                <TabPanel value={value} index={0}>
                                    <YourRecipes user={user} loggedIn={loggedIn} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <LikedRecipes user={user} loggedIn={loggedIn} />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}