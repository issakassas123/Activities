import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuItemLink from "../shared/components/MenuItemLink";
import { NavLink } from "react-router";

export default function NavBar() {
    const typography = "Activities";

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{
                backgroundImage: 'linear-gradient(140deg, #182a73 5%, #218aae 65%, #20a7ac 85%)'
            }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{
                        display: 'flex', justifyContent: 'space-between'
                    }}>
                        <Box>
                            <MenuItem component={NavLink} to='' sx={{
                                display: 'flex', gap: 2
                            }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight='bold'>{typography}</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <MenuItemLink to='/activities'>
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/createActivity'>
                                Create Activity
                            </MenuItemLink>
                        </Box>
                        <MenuItem>
                            User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}
