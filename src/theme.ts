import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: blue.A400,
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
