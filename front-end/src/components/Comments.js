import React, { useState, useEffect } from "react"
import axios from "axios"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useStyles } from "../containers/styles"


export default function Comments({ loggedIn, recipeId }) {
    const classes = useStyles()
    const userId = loggedIn.userId
    const [input, setInput] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [comments, setComments] = useState([])
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const sendComment = (userId, recipeId, input) => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/comments/',
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            },
            data: {
                'userId': userId,
                'recipeId': recipeId,
                'text': input
            }
        })
            .then(response => {
                console.log(response)
                setInput("")
                setSubmitted(true)
            })
            .catch(error => {
                console.error(error.response)
            })
        setSubmitted(false)
    }
    // get comments
    useEffect(() => {
        axios.get("http://localhost:5000/api/recipes/" + recipeId, {
            headers: {
                Authorization: "Bearer " + loggedIn.access_token
            }
        })
            .then((response) => {
                console.log(response)
                setComments(response.data.data.comments)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [submitted])
    return (
        <div className="comment-container-outer">
            {comments === [] ? null :
                comments.map(comment => {
                    return (
                        <div className="comment-inner">
                            <p className="comment-user">{comment.user.userId}</p>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    )
                })
            }
            <div className="comment-textfield">
                <TextField className={classes.cInput} id="standard-basic" label="Add Your Comment" onChange={handleInput} value={input} autoComplete="off" />
                <Button variant="contained" color="primary" onClick={() => sendComment(userId, recipeId, input)}>Send</Button>
            </div>
        </div>
    )
}