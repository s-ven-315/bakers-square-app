import React, { useContext } from "react"
import { useHistory } from "react-router-dom";
import { useStyles } from "../containers/styles"
import { DataContext } from "../contexts/Context";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function Likes() {
    const context = useContext(DataContext)
    const { authUser, recipe } = context
    const users = recipe.likes
    const history = useHistory();

    const onClick = userId => {
        history.push(`/users/${userId}`)
    };

    return (
        <List style={{ overflow: 'auto' }}>
            {users ? users.map(user => (
                <ListItem button onClick={() => onClick(user.userId)} key={user.userId}>
                    <ListItemAvatar>
                        <Avatar alt={`${user.userId}`} src={user.img_url} style={{ backgroundColor: '#e6e6e6' }} />
                    </ListItemAvatar>
                    <ListItemText primary={`${user.name}`} secondary={`@${user.userId}`} />
                </ListItem>
            )) : null}
        </List>
    )
}