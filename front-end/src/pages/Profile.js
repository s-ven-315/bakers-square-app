import React, { useEffect, useState } from "react"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios"
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import YourRecipes from '../components/YourRecipes';
import LikedRecipes from '../components/LikedRecipes';
import ProfileImg from '../assets/images/profile-placeholder.png'
import EditIcon from '@material-ui/icons/Edit';
import { Follow, EditProfileName } from '../helpers'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useStyles } from '../containers/styles'
import {UserListDialog} from "../containers/dialogs/UserListDialog";


function EditProfileDialog(props) {
    const [name, setName] = useState("")
    const {open, setOpen, loggedIn, user, setUser} = props;

    const closeDialog = () => setOpen(false);

    return (
        <Dialog fullwidth='true' open={open} onBackdropClick={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Change Profile Name</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="name" label="New Profile Name" type="text"
                           onChange={e => setName(e.target.value)} fullWidth='true' autoComplete='off'/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => EditProfileName(loggedIn, name, setName, user, setUser, setOpen)}
                        color="primary">Save</Button>
                <Button onClick={closeDialog} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
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
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const classes = useStyles();
    const { userId } = useParams()
    const [deleted, setDeleted] = useState(false)
    // edit profile name
    const [editOpen, setEditOpen] = useState(false);

    const recipesNum = (user.recipes) ? user.recipes.length : 0;
    const likedRecipesNum = (user.liked_recipes) ? user.liked_recipes.length : 0;
    const followers = (user.followers) ? user.followers : [];

    const handleEdit = () => {
        setEditOpen(true);
    };

    // change tab
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // followers / following dialog
    const [followerOpen, setFollowerOpen] = useState(false);
    const [followingOpen, setFollowingOpen] = useState(false);

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
    }, [userId, deleted])

    if (!loggedIn) {
        return <Redirect to="/" />
    }

    return (
        <>
            <UserListDialog title={"Followers"} users={user.followers} open={followerOpen} setOpen={setFollowerOpen}/>
            <UserListDialog title={"Following"} users={user.following} open={followingOpen} setOpen={setFollowingOpen}/>

            {(user === {})?
                <h1>User not found</h1> :
                <>
                    <div className="profile-page-container">
                        <div className="profile-container">
                            <div className="profile-container-inner">
                                <div className="profile-img">
                                    <img src={user.img_url} style={{backgroundColor: '#e6e6e6'}}/>
                                </div>
                                <div className="profile-details">
                                    <div className="profile-name">{user.name}
                                        {/*{console.log(followers)}*/}
                                        {user.userId === loggedIn.userId ?
                                            <>
                                                <EditIcon color="primary" onClick={handleEdit} />
                                                <EditProfileDialog open={editOpen}
                                                                   setOpen={setEditOpen}
                                                                   loggedIn={loggedIn}
                                                                   user={user}
                                                                   setUser={setUser}
                                                />
                                            </> : null
                                        }
                                    </div>
                                    <div className="profile-id">@{user.userId}</div>
                                    <div className="profile-following-container">
                                        <div>
                                            <div onClick={() => setFollowerOpen(true)}>
                                                {user.followers ? user.followers.length === 1 ? <><span>1</span>Follower</> : <><span>{user.followers.length}</span>Followers</> : <><span>0</span>Followers</>}
                                            </div>
                                        </div>
                                        <div>
                                            <div onClick={() => setFollowingOpen(true)}>
                                                <span>{user.following ? user.following.length : "0"}</span>Following
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-button-container">
                                        {user.name !== loggedIn.name ?
                                            followers ?
                                                followers.find(e => e.userId === loggedIn.userId) ?
                                                    <Button variant="contained" color="primary" className="profile-button" onClick={() => Follow(userId, loggedIn, false, user, setUser)} >Unfollow</Button>
                                                    : <Button variant="contained" color="primary" className="profile-button" onClick={() => Follow(userId, loggedIn, true, user, setUser)} >Follow</Button>
                                                : null
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="recipe-container-outer">
                            <div className="tab-container">
                                <Tabs
                                    className={classes.pTabs}
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    centered
                                >
                                    <Tab className={classes.pTabs} label={`${user.name}'s Recipes (${recipesNum})`} />
                                    <Tab className={classes.pTabs} label={`${user.name}'s Liked Recipes (${likedRecipesNum})`} />
                                </Tabs>
                            </div>
                            <div className="tab-panel-container">
                                <TabPanel className={classes.pTabs} value={value} index={0}>
                                    <YourRecipes user={user} loggedIn={loggedIn} setDeleted={setDeleted} />
                                </TabPanel>
                                <TabPanel className={classes.pTabs} value={value} index={1}>
                                    <LikedRecipes user={user} loggedIn={loggedIn} setDeleted={setDeleted} />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}