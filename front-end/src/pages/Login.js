import React, { useContext, useState } from 'react';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios"
import { DataContext } from "../contexts/Context";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red'
    }
}));

export default function Login() {
    console.log("Login() is rendered.")

    const context = useContext(DataContext)
    const {authUser, setAuthUser, setLoading} = context

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles();
    const [error, setError] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        axios({
            method: 'POST',
            url: 'https://bakers-square.herokuapp.com/api/auth/login',
            data: {
                email,
                password
            }
        })
            .then(response => {
                console.log(response)
                setAuthUser(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error.response)
                setLoading(false)
                setError(error.response.data.msg)
            })
    }
    if (authUser.access_token) {
        return <Redirect to="/" />
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography className={classes.error} variant="caption" display="block" gutterBottom>{error ? <span>Error: {error}</span> : null}</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                        disabled={!email || !password}
                    >
                        Sign In
                     </Button>

                    <Link href="/signup" variant="body2" fullWidth>
                        {"Don't have an account? Sign up here"}
                    </Link>
                </form>
            </div>

        </Container>
    );
}