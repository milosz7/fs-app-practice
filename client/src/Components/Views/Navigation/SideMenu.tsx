import { Dispatch, SetStateAction, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({
  elements,
  isOpen,
  setIsOpen,
  setIsDialogOpen,
}: {
  elements: { text: string; path: string; icon: JSX.Element }[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext)!;

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <ShoppingBasketIcon sx={{ mr: 3, color: 'action.active' }} fontSize="medium" />
        <Typography sx={{ display: 'inline-block' }} variant="h6">
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
              <ListItemText sx={{ textTransform: 'capitalize' }}>{text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {user ? (
            <ListItemButton
              onClick={() => {
                setIsOpen(false);
                setIsDialogOpen(true);
              }}
              sx={{ p: 2 }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText sx={{ textTransform: 'capitalize' }}>sign out</ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => setIsOpen(false)}
              sx={{ p: 2 }}
              component={RouterLink}
              to="/login"
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText sx={{ textTransform: 'capitalize' }}>sign in</ListItemText>
            </ListItemButton>
          )}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
