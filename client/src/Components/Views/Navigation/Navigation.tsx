import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideMenu from './SideMenu';
import SearchBar from './SearchBar';
import Container from '@mui/material/Container';
import AuthContext from '../../../Context/AuthContext';
import LogoutDialog from '../LogoutDialog';
import AdsContext from '../../../Context/AdsContext';

const Navigation = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { fetchAdsToState } = useContext(AdsContext)!;

  const { user } = useContext(AuthContext)!;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{zIndex: 1, boxShadow: 'none'}} position="sticky">
        <Container>
          <Toolbar>
            <IconButton
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Marketplace
            </Typography>
            <SearchBar />
            <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 2 }}>
              <Button
                onClick={() => fetchAdsToState('')}
                key={'home'}
                color="inherit"
                component={RouterLink}
                to={'/'}
                startIcon={<HomeIcon />}
              >
                home
              </Button>
              <Button
                key={'add'}
                color="inherit"
                component={RouterLink}
                to={'/add'}
                startIcon={<AddIcon />}
              >
                add
              </Button>
              {user ? (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  startIcon={<AccountCircleIcon />}
                  color="inherit"
                >
                  sign out
                </Button>
              ) : (
                <Button
                  startIcon={<AccountCircleIcon />}
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                >
                  sign in
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
        <SideMenu
          setIsDialogOpen={setIsDialogOpen}
          setIsOpen={setIsSideMenuOpen}
          isOpen={isSideMenuOpen}
        />
      </AppBar>
      <LogoutDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </Box>
  );
};

export default Navigation;
