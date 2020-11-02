import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import SessionContext from "../contexts/SessionContext"

const Navbar = () => {
    const [loggedIn, setLogged] = useState(localStorage.getItem("token"))


    const handleLogout = () => {
        localStorage.removeItem("token")
        setLogged(false)

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

    return (
        <SessionContext.Provider value={{ loggedIn, setLogged }}>
            <div className="navbar">
                <div>
                    <h2>Baker's Square</h2>
                </div>
                <div className="menu-wide">
                    {loggedIn ?
                        <>
                            <Button color="inherit">Profile</Button>
                            <Button color="inherit" onClick={handleLogout}>Log out</Button>
                        </>
                        :
                        <>
                            <Button href="/signup" color="inherit">Sign Up</Button>
                            <Button href="/login" variant="contained" color="primary">Login</Button>
                        </>
                    }

                </div>
                <div className="menu-narrow">

                    <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            {loggedIn ?
                                                <>
                                                    <MenuItem>Profile</MenuItem>
                                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                </>
                                                : <>
                                                    <MenuItem>Sign Up</MenuItem>
                                                    <MenuItem>Login</MenuItem>
                                                </>
                                            }
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        </SessionContext.Provider>
    )
}

export default Navbar