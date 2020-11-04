import React from "react"
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    span: {
        marginLeft: 5,
    },
    button: {
        marginTop: '1rem',
    }
});

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

export default function YourRecipes({ loggedIn, user }) {
    const classes = useStyles();

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
            <div className='add-new-recipe-button'>
                {user.name === loggedIn.name ?
                    <Button className={classes.button} variant="contained" color="primary"><AddCircleOutlineOutlinedIcon /> <span className={classes.span} >Add New Recipe</span></Button> : null
                }
            </div>
            <div className="recipe-container">
                <a href="">
                    <img className='recipe-img' src="#" alt="" />
                </a>
                <div className="recipe-details-container">
                    <div className="recipe-name">Mango Cake</div>
                    <div className="recipe-baker">by {user.name}</div>
                    <div className="recipe-following-container">
                        <Button color="inherit" onClick={handleLikeOpen}>3 Likes</Button>
                        <FollowerDialog open={likeOpen} onClose={handleLikeClose} />
                        <Button color="inherit">5 Comments</Button>
                    </div>
                </div>
                <div className="recipe-button-container">
                    {user.name === loggedIn.name ?
                        <>
                            <a className="recipe-button" href="#"><EditIcon /></a>
                            <a className="recipe-button" href="#">Start Baking</a>
                        </> :
                        <a className="recipe-button" href="#">Start Baking</a>
                    }
                </div>
            </div>
        </>
    )
}