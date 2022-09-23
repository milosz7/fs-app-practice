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
import AdsContext from '../../../Context/AdsContext';
import DialogControlsContext from '../../../Context/DialogControlsContext';

const Navigation = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { fetchAdsToState } = useContext(AdsContext)!;
  const { user, logout } = useContext(AuthContext)!;
  const { setupAndOpenDialog } = useContext(DialogControlsContext)!;

  const openLogoutDialog = () => {
    setupAndOpenDialog(logout, 'Are you sure you want to log out?');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ zIndex: 1, boxShadow: 'none' }} position="sticky">
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
                onClick={() => {
                  fetchAdsToState('');
                }}
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
                  onClick={() => openLogoutDialog()}
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
          openLogoutDialog={openLogoutDialog}
          setIsOpen={setIsSideMenuOpen}
          isOpen={isSideMenuOpen}
        />
      </AppBar>
    </Box>
  );
};

export default Navigation;
