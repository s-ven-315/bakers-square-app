import React, { useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom";
import axios from "axios"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import YourRecipes from '../components/YourRecipes';
import LikedRecipes from '../components/LikedRecipes';
import ProfileImg from '../assets/images/profile-placeholder.png'
import EditIcon from '@material-ui/icons/Edit';

function FollowerDialog(props) {
    const followers = ['test100', 'test101'];
    const { onClose, selectedValue, open } = props;

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
                {followers.map((follower) => (
                    <ListItem button onClick={() => handleListItemClick(follower)} key={follower}>
                        <ListItemText primary={follower} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

function FollowingDialog(props) {
    const following = ['test100', 'test101'];
    const { onClose, selectedValue, open } = props;

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
                {following.map((follow) => (
                    <ListItem button onClick={() => handleListItemClick(follow)} key={follow}>
                        <ListItemText primary={follow} />
                    </ListItem>
                ))}
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

//follow user
const follow = (userId, loggedIn) => {
    console.log(userId)
    console.log(loggedIn)
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/subscribe`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error.response)
        })
}

//unfollow user
const unfollow = (userId, loggedIn) => {
    console.log(userId)
    console.log(loggedIn)
    axios({
        method: 'POST',
        url: `http://localhost:5000/api/users/${loggedIn.userId}/unsubscribe`,
        headers: {
            Authorization: "Bearer " + loggedIn.access_token
        },
        data: {
            'userId': userId
        }
    })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.error(error.response)
        })
}

export default function Profile({ loggedIn }) {
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const classes = useStyles();
    const { userId } = useParams()


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
                                            <EditIcon color="primary" /> : null
                                        }
                                    </div>
                                    <div className="profile-id">@{user.userId}</div>
                                    <div class="profile-following-container">
                                        <div>
                                            {user.recipes ? user.recipes.length == 1 ? <><span>1</span>Recipe</> : <><span>{user.recipes.length}</span>Recipes</> : <><span>0</span>Recipes</>}
                                        </div>
                                        <div>
                                            <div onClick={handleFollowerOpen}>
                                                {user.followers ? user.followers.length == 1 ? <><span>1</span>Follower</> : <><span>{user.followers.length}</span>Followers</> : <><span>0</span>Followers</>}
                                            </div>

                                            <FollowerDialog open={followerOpen} onClose={handleFollowerClose} />
                                        </div>
                                        <div>
                                            <div onClick={handleFollowingOpen}>
                                                <span>{user.following ? user.following.length : "0"}</span>Following
                                            </div>

                                            <FollowingDialog open={followingOpen} onClose={handleFollowingClose} />
                                        </div>
                                    </div>
                                    <div className="profile-button-container">
                                        {user.name !== loggedIn.name ?
                                            user.followers ?
                                                user.followers.find(e => e.userId === loggedIn.userId) ?
                                                    <Button variant="contained" color="primary" className="profile-button" onClick={() => unfollow(userId, loggedIn)} >Unfollow</Button>
                                                    : <Button variant="contained" color="primary" className="profile-button" onClick={() => follow(userId, loggedIn)} >Follow</Button>
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
                                    <Tab label={`${user.name}'s Recipes`} />
                                    <Tab label={`${user.name}'s Liked Recipes`} />
                                </Tabs>
                            </div>
                            <div class="tab-panel-container">
                                <TabPanel value={value} index={0}>
                                    <YourRecipes user={user} loggedIn={loggedIn} />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <LikedRecipes />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}