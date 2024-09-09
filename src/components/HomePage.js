import * as React from 'react';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './NavBar';
// import DisplayContent from './DisplayContent'

const accIACTheme = createTheme({
    palette: {
        primary: {
            main: '#460074',
        },
    },
});

export default function HomePage() {
    return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={accIACTheme}>
                <NavBar />
                {/* <DisplayContent /> */}
            </ThemeProvider>
        </Stack>
    );
}
