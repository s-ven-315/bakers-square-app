import React from "react";
import {useHistory} from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";


export function UserListDialog(props) {
    const history = useHistory();
    const { title, users, open, setOpen } = props;

    const onClick = userId => {
        history.push(`/users/${userId}`)
        setOpen(false)
    };

    return (
        <Dialog open={open} onBackdropClick={() => setOpen(false)} fullWidth maxWidth='sm' style={{
            height: '100%'
        }}>
            <DialogTitle>{title}</DialogTitle>
            <Divider />
            <List style={{ overflow: 'auto'}}>
                {users ? users.map(user => (
                    <ListItem button onClick={() => onClick(user.userId)} key={user.userId}>
                        <ListItemAvatar>
                            <Avatar alt={`${user.userId}`} src={user.img_url} style={{backgroundColor: '#e6e6e6'}}/>
                        </ListItemAvatar>
                        <ListItemText primary={`${user.name}`} secondary={`@${user.userId}`} />
                    </ListItem>
                )) : null }
            </List>
        </Dialog>
    );
}