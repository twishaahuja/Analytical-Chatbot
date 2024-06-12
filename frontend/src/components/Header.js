import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ toggleDrawer, startNewChat }) {
    return (
        <AppBar position="fixed" style={{ zIndex: 1201 }}>
            <Toolbar>
                <IconButton color="inherit" onClick={toggleDrawer} edge="start">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flex: 1 }}>Demo App</Typography>
                <Button color="inherit" onClick={startNewChat}>New Chat</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;