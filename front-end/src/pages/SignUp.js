import React, { useContext, useState } from 'react';
import { Redirect } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
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

export default function SignUp() {
    console.log("SignUp() is rendered.")

    const context = useContext(DataContext)
    const { authUser, setAuthUser } = context

    const classes = useStyles();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [error, setError] = useState("")
    const handleSignup = (e) => {
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/auth/signup',
            data: {
                name,
                email,
                password
            }
        })
            .then(response => {
                console.log(response)
                localStorage.setItem("user", JSON.stringify(response.data))
                setAuthUser(response.data)

            })
            .catch(error => {
                console.log(error.response)
                console.log(error.response.data.msg)
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
                    <AccountCircleOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    New Account
        </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        type="text"
                        name="name"
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
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
                    // helperText="Password must contain at least 7 characters with a mixture of uppercase and lowercase letter and numeric character"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="passwordConf"
                        label="Confirm Password"
                        onChange={(e) => setPasswordConf(e.target.value)}
                        type="password"
                    />
                    <Typography className={classes.error} variant="caption" display="block" gutterBottom>{error ? <span>Error: {error}</span> : null}</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignup}
                        disabled={!email || !name || !password || !passwordConf || (password !== passwordConf)}
                    >
                        Register
                    </Button>
                    <Link href="/login" variant="body2">
                        {"Already have an account? Login here"}
                    </Link>
                </form>
            </div>

        </Container>
    );
}