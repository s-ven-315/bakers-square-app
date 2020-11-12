import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useStyles } from "../containers/styles"
import { DataContext } from "../contexts/Context";
import { PostComment } from "../helpers";

import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function Comments() {
    console.log("Comments() is rendered.")
    const context = useContext(DataContext)
    const { authUser, recipe } = context
    const comments = recipe.comments
    const history = useHistory();
    const classes = useStyles()
    const [input, setInput] = useState("")
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const onClick = userId => {
        history.push(`/users/${userId}`)
    };

    const handleSubmit = () => {
        PostComment(context, input, setInput)
    }

    return (
        <div className="comment-container-outer">
            {comments === [] ? null :
                comments.map(comment => {
                    return (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.cAvatar} onClick={() => onClick(comment.user.userId)} alt={comment.user.userId} src={comment.user.img_url} />
                            </ListItemAvatar>
                            <ListItemText primary={comment.user.name} secondary={comment.text} />
                        </ListItem>
                    )
                })
            }
            <div className="comment-textfield">
                <TextField className={classes.cInput} id="standard-basic" label="Add Your Comment" onChange={handleInput} value={input} autoComplete="off" />
                <Button variant="contained" color="primary" onClick={() => handleSubmit()}>Send</Button>
            </div>
        </div>
    )
}