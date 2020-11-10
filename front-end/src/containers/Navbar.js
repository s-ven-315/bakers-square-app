import React from 'react';
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

const Navbar = ({ loggedIn, setLogged }) => {
    const classes = useStyles()
    const handleLogout = () => {
        localStorage.removeItem("user")
        setLogged(null)
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
                <div>
                    <h2>Baker's Square</h2>
                </div>
                <div className="navbar-menu">
                    {loggedIn ?
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
                                        {loggedIn.name}
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
                                                    <ListItemText /><Button className={classes.nButton} onClick={() => history.push(`/users/${loggedIn.userId}`)}>Profile Page</Button>
                                                    <ListItemText /><Button className={classes.nButton} onClick={() => history.push('/signup')}>Start Baking</Button>
                                                    <ListItemText /><Button className={classes.nButton} onClick={() => history.push('/')}>Ingredient Checklist</Button>
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
            </div >
        </>
    )
}

export default Navbar