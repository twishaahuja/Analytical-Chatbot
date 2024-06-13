import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

function Header({ toggleDrawer, startNewChat }) {
    return (
        // <div style={{bgcolor:"#231C1C"}}>
        <AppBar position="fixed" style={{ zIndex: 1201, backgroundColor:"#231C1C" }}>
            <Toolbar bgcolor="#000000">
                <IconButton color="inherit" onClick={toggleDrawer} edge="start">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flex: 1 }}>InsightMate</Typography>
                <Button color="inherit" onClick={startNewChat}><AddIcon /> New Chat</Button>
            </Toolbar>
        </AppBar>
        // </div>
    );
}

export default Header;