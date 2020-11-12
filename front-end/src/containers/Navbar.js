import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from "react-router-dom"
import { useStyles } from "./styles"
import {DataContext, emptyUser} from "../contexts/Context";
import LinearProgress from "@material-ui/core/LinearProgress";


const Navbar = () => {
    console.log("Navbar() is rendered.")

    const context = useContext(DataContext)
    const {authUser, setAuthUser, isLoading} = context

    const classes = useStyles()
    const handleLogout = () => {
        localStorage.removeItem("user")
        setAuthUser(emptyUser)
    }
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const history = useHistory()


    return (
        <>
            <div className="navbar">
                <div className='navbar-title' onClick={() => history.push('/')}>
                    <h2>Baker's Square</h2>
                </div>
                <div className="navbar-menu">
                    {authUser.userId ?
                        <>

                            <Button
                                onClick={handleToggle}
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                            >
                                <div className="menu-wide">
                                    <Button
                                        variant="contained" color="primary"
                                    >
                                        {authUser.name}
                                    </Button>
                                </div>
                                <div className="menu-narrow">
                                    <MenuIcon />
                                </div>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <ListItemText /><Button className={classes.nButton} onClick={() => history.push(`/users/${authUser.userId}`)}>Profile Page</Button>
                                                    <ListItemText /><Button className={classes.nButton} onClick={handleLogout}>Logout</Button>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </>
                        :
                        <>
                            <div className="menu-wide">
                                <Button href="/signup" color="inherit">Sign Up</Button>
                                <Button href="/login" variant="contained" color="primary">Login</Button>
                            </div>
                            <div className="menu-narrow">
                                <IconButton
                                    variant="contained" color="primary"
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}>
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <ListItemText /><Button href="/signup">Sign Up</Button>
                                                    <ListItemText /><Button href="/login">Login</Button>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </>
                    }
                </div >
            </div>
            {(isLoading)? <LinearProgress />: <div style={{height: '4px', backgroundColor: 'transparent'}} />}
        </>
    )
}

export default Navbar