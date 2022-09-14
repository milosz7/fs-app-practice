import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dispatch, SetStateAction, useState } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SideMenu = ({elements, isOpen, setIsOpen}: {elements: {text: string, path: string, icon: JSX.Element}[], isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {

  const user = true;

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{p: 2, display: 'flex', alignItems: 'center'}}>
        <ShoppingBasketIcon sx={{mr: 3, color: 'rgba(0, 0, 0, 0.54)'}} fontSize="medium" />
      <Typography sx={{ display: 'inline-block'}}
        variant="h6"
      >
        Marketplace
      </Typography>
      </Box>
      <Divider />
      <List sx={{ width: 250 }}>
        {elements.map(({ text, path, icon }) => (
          <ListItem disablePadding key={text}>
            <ListItemButton
              onClick={() => setIsOpen(false)}
              sx={{ p: 2 }}
              component={RouterLink}
              to={path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <Typography textTransform="capitalize">
                <ListItemText>{text}</ListItemText>
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setIsOpen(false)}
            sx={{ p: 2 }}
            component={RouterLink}
            to={user ? '/logout' : '/login'}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Typography textTransform="capitalize">
              <ListItemText>{user ? 'logout' : 'login'}</ListItemText>
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
};

export default SideMenu