import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {

    return (
        <Box sx={{flexGrow: 1}}>

            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>


                    <Box>
                        <Button color="inherit">Sign in</Button>
                        <Button color="inherit">Sign up</Button>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;