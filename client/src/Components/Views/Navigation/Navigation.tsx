import { useState } from 'react';
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

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = false;

  const navigationElements = [
    { text: 'home', path: '/', icon: <HomeIcon /> },
    { text: 'add', path: '/add', icon: <AddIcon /> },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Container>
          <Toolbar>
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
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
              {navigationElements.map(({ text, path, icon }) => (
                <Button
                  key={text as string}
                  color="inherit"
                  component={RouterLink}
                  to={path}
                  startIcon={icon}
                >
                  {text}
                </Button>
              ))}
              <Button
                startIcon={<AccountCircleIcon />}
                component={RouterLink}
                to={user ? '/logout' : '/login'}
                color="inherit"
              >
                {user ? 'logout' : 'login'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
        <SideMenu setIsOpen={setIsOpen} isOpen={isOpen} elements={navigationElements} />
      </AppBar>
    </Box>
  );
};

export default Navigation;
