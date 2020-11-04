import React, { useEffect } from "react"
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

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function Profile({ loggedIn }) {
    const classes = useStyles();
    const { name } = useParams()

    // tab change
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // followers dialog
    const [followerOpen, setFollowerOpen] = React.useState(false);

    const handleFollowerOpen = () => {
        setFollowerOpen(true);
    };

    const handleFollowerClose = (value) => {
        setFollowerOpen(false);
    };

    // following dialog
    const [followingOpen, setFollowingOpen] = React.useState(false);

    const handleFollowingOpen = () => {
        setFollowingOpen(true);
    };

    const handleFollowingClose = (value) => {
        setFollowingOpen(false);
    };

    if (!loggedIn) {
        return <Redirect to="/" />
    }

    // useEffect(() => {
    //     if (name == loggedIn.name) {
    //         axios.get("http://localhost:5000/api/users/" + name, {
    //             headers: {
    //                 Authorization: "Bearer " + loggedIn.access_token
    //             }
    //         })
    //             .then((response) => {
    //                 console.log(response)
    //             })
    //     } else {
    //         axios.get("http://localhost:5000/api/users/" + name)
    //             .then((response) => {
    //                 console.log(response)
    //             })
    //     }
    // }, [])
    return (
        <>
            <div className="profile-container">
                <a href="#">
                    <img className='profile-img' src="#" alt="" />
                </a>
                <div className="profile-details-container">
                    <div className="profile-name">{loggedIn.name}</div>
                    <div className="profile-id">@{loggedIn.userId}</div>
                    <div className="profile-following-container">
                        <Button color="inherit" onClick={handleFollowerOpen}>2 Followers</Button>
                        <FollowerDialog open={followerOpen} onClose={handleFollowerClose} />
                        <Button color="inherit" onClick={handleFollowingOpen}>3 Following</Button>
                        <FollowingDialog open={followingOpen} onClose={handleFollowingClose} />
                    </div>
                </div>
                <div className="profile-button-container">
                    {loggedIn ?
                        <a className="profile-button" href="#">Update Details</a> :
                        <a className="profile-button" href="#">Follow</a>
                    }
                </div>
            </div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Your Recipes" />
                    <Tab label="Liked Recipes" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <div className="profile-container">
                    <a href="">
                        <img className='profile-img' src="#" alt="" />
                    </a>
                    <div className="profile-details-container">
                        <div className="profile-name">Mango Cake</div>
                        <div className="profile-id">by {loggedIn.name}</div>
                        <div className="profile-following-container">
                            <Button color="inherit" onClick={handleFollowerOpen}>3 Likes</Button>
                            <FollowerDialog open={followerOpen} onClose={handleFollowerClose} />
                            <Button color="inherit" onClick={handleFollowingOpen}>5 Comments</Button>
                            <FollowingDialog open={followingOpen} onClose={handleFollowingClose} />
                        </div>
                    </div>
                    <div className="profile-button-container">
                        {loggedIn ?
                            <a className="profile-button" href="#">Start Baking</a>
                            :
                            <a className="profile-button" href="#">Follow</a>
                        }
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="recipe-container">
                    <a href="">
                        <img className='recipe-img' src="#" alt="" />
                    </a>
                    <div className="recipe-details-container">
                        <div className="recipe-name">Red Velvet Cake</div>
                        <div className="recipe-id">by anonymous</div>
                        <div className="recipe-following-container">
                            <Button color="inherit" onClick={handleFollowerOpen}>3 Likes</Button>
                            <FollowerDialog open={followerOpen} onClose={handleFollowerClose} />
                            <Button color="inherit" onClick={handleFollowingOpen}>5 Comments</Button>
                            <FollowingDialog open={followingOpen} onClose={handleFollowingClose} />
                        </div>
                    </div>
                    <div className="profile-button-container">
                        <a className="profile-button" href="#">Start Baking</a>
                    </div>
                </div>
                <div className="recipe-container">
                    <a href="">
                        <img className='recipe-img' src="#" alt="" />
                    </a>
                    <div className="recipe-details-container">
                        <div className="recipe-name">Red Velvet Cake</div>
                        <div className="recipe-id">by anonymous</div>
                        <div className="recipe-following-container">
                            <Button color="inherit" onClick={handleFollowerOpen}>3 Likes</Button>
                            <FollowerDialog open={followerOpen} onClose={handleFollowerClose} />
                            <Button color="inherit" onClick={handleFollowingOpen}>5 Comments</Button>
                            <FollowingDialog open={followingOpen} onClose={handleFollowingClose} />
                        </div>
                    </div>
                    <div className="profile-button-container">
                        <a className="profile-button" href="#">Start Baking</a>
                    </div>
                </div>
            </TabPanel>
        </>
    )
}