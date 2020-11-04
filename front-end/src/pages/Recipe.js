import React, { useState } from "react"
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
import RecipeDetails from '../components/RecipeDetails'

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

    // followers dialog
    const [followerOpen, setFollowerOpen] = useState(false);

    const handleFollowerOpen = () => {
        setFollowerOpen(true);
    };

    const handleFollowerClose = (value) => {
        setFollowerOpen(false);
    };

    return (
        <>
            <div className="recipe-header-container">
                <a href="">
                    <img className='recipe-img' src="#" alt="" />
                </a>
                <div className="recipe-details-container">
                    <div className="recipe-name">Mango Cake</div>
                    <div className="recipe-baker">by </div>
                    <div className="recipe-following-container">
                        <Button color="inherit" onClick={handleLikeOpen}>3 Likes</Button>
                        <FollowerDialog open={likeOpen} onClose={handleLikeClose} />
                        <Button color="inherit">5 Comments</Button>
                    </div>
                </div>
                <div className="recipe-button-container">
                    <a className="recipe-button" href="#">Edit</a>
                    <a className="recipe-button" href="#">Start Baking</a>
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
                <RecipeDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
            </TabPanel>
        </>
    )
}