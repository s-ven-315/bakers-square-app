import React, { useContext, useEffect, useState } from "react"
import { useParams, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import RecipeList from '../components/RecipeList';
import EditIcon from '@material-ui/icons/Edit';
import { Follow, GetRecipe, GetUser } from '../helpers'
import { useStyles } from '../containers/styles'
import { UserListDialog } from "../containers/dialogs/UserListDialog";
import { DataContext, emptyRecipe, emptyUser } from "../contexts/Context";
import { EditProfileDialog } from "../containers/dialogs/EditProfileDialog";
import { EditImgDialog } from "../containers/dialogs/EditImgDialog";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { RecipeDialog } from "../containers/dialogs/RecipeDialog";


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


export default function Profile() {
    console.log("Profile() is rendered.")

    const context = useContext(DataContext)
    const { authUser, user, setUser, setRecipe, isLoading } = context
    const { userId } = useParams()


    // Computed Variables
    const isAuthUser = authUser.userId === user.userId

    const [error, setError] = useState(null)
    const classes = useStyles();

    // edit profile name
    const [editOpen, setEditOpen] = useState(false);
    // edit profile img
    const [editImgOpen, setEditImgOpen] = useState(false);
    const [previewImg, setPreviewImg] = useState(null)
    const [imageFile, setImageFile] = useState({})
    const isProfile = true

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
    const canEdit = authUser.userId === user.userId

    // followers / following dialog
    const [followerOpen, setFollowerOpen] = useState(false);
    const [followingOpen, setFollowingOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    // axios get
    useEffect(() => {
        if (userId === context.authUser.userId) {
            setUser(context.authUser)
            GetUser(context, context.authUser.userId)
        }
        else if (userId !== context.user.userId) {
            GetUser(context, userId)
        }
        if (context.recipe.id) {
            setRecipe(emptyRecipe)
        }
    }, [userId])
    if (!authUser.access_token) {
        return <Redirect to="/" />
    }

    return (
        <>
            <UserListDialog title={"Followers"} users={user.followers} open={followerOpen} setOpen={setFollowerOpen} />
            <UserListDialog title={"Following"} users={user.following} open={followingOpen} setOpen={setFollowingOpen} />
            <EditImgDialog title={"Change Profile Picture"} open={editImgOpen} setOpen={setEditImgOpen}
                previewImg={previewImg} setPreviewImg={setPreviewImg} imageFile={imageFile} setImageFile={setImageFile} isProfile={isProfile} />

            {(!user.userId) ?
                ((isLoading)? null : <h1>User not found</h1>) :
                <>
                    <div className="profile-page-container">
                        <div className="profile-container">
                            <div className="profile-container-inner">
                                <div className={(canEdit)? 'profile-img profile-img-hover' : 'profile-img'}>
                                    <img src={user.img_url} style={{ backgroundColor: '#e6e6e6' }}
                                         onClick={() => (canEdit)? setEditImgOpen(true): null} />
                                </div>
                                <div className="profile-details">
                                    <div className="profile-name">{user.name}
                                        {isAuthUser ?
                                            <>
                                                <EditIcon color="primary" onClick={handleEdit} />
                                                <EditProfileDialog open={editOpen} setOpen={setEditOpen} />
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
                                        {!isAuthUser ?
                                            followers ?
                                                followers.find(e => e.userId === authUser.userId) ?
                                                    <Button variant="contained" color="primary" className="profile-button" onClick={() => Follow(context, false)} >Unfollow</Button>
                                                    : <Button variant="contained" color="primary" className="profile-button" onClick={() => Follow(context, true)} >Follow</Button>
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
                                {user.userId === authUser.userId ?
                                    <>
                                        <Button className={classes.yRButton} variant="contained" color="primary"
                                            onClick={() => setCreateOpen(true)}>
                                            <AddCircleOutlineOutlinedIcon />
                                            <span className={classes.yRSpan} >Add New Recipe</span>
                                        </Button>
                                        <RecipeDialog title={"Create New Recipe"} recipe={emptyRecipe} open={createOpen} setOpen={setCreateOpen} isNew={true} />
                                    </> : null
                                }
                            </div>
                            <div className="tab-panel-container">
                                <TabPanel className={classes.pTabs} value={value} index={0}>
                                    <RecipeList recipes={user.recipes} emptyText={'This user has not created any recipes'} />
                                </TabPanel>
                                <TabPanel className={classes.pTabs} value={value} index={1}>
                                    <RecipeList recipes={user.liked_recipes} emptyText={'This user has not liked any recipes'} />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}