import React from "react"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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

export default function YourRecipes({ loggedIn }) {
    // like dialog
    const [likeOpen, setLikeOpen] = React.useState(false);

    const handleLikeOpen = () => {
        setLikeOpen(true);
    };

    const handleLikeClose = (value) => {
        setLikeOpen(false);
    };
    return (
        <>
            <div className="profile-container">
                <a href="">
                    <img className='profile-img' src="#" alt="" />
                </a>
                <div className="profile-details-container">
                    <div className="profile-name">Mango Cake</div>
                    <div className="profile-id">by {loggedIn.name}</div>
                    <div className="profile-following-container">
                        <Button color="inherit" onClick={handleLikeOpen}>3 Likes</Button>
                        <FollowerDialog open={likeOpen} onClose={handleLikeClose} />
                        <Button color="inherit">5 Comments</Button>
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
        </>
    )
}