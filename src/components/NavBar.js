import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function NavBar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Avatar variant="square" alt='A' src="/acc_logo4.svg" onClick={() => window.location.reload(false)} />
                <Typography variant="subtitle1" noWrap component="div" sx={{ m: 2 }}>
                    ACCENTURE TOOL
                </Typography>
            </Toolbar>
        </AppBar>
    );
}