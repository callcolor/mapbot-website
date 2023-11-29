import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Img from '../../utils/Img';

export const appTitle = 'BonnieBots';

const drawerWidth = 240;
const navItems = [
  {
    label: 'Regions',
    href: '/regions',
  },
  {
    label: 'Attachments',
    href: '/attachments',
  },
  {
    label: 'Land',
    href: '/land',
  },
  {
    label: 'Avatars',
    href: '/avatars',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'API',
    href: '/developers',
  },
];

const displayMobi = { xs: 'block', sm: 'block', md: 'none', lg: 'none' };
const displayDesk = { xs: 'none', sm: 'none', md: 'block', lg: 'block' };

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: displayMobi }}
          >
            <MenuIcon />
          </IconButton>
          <Link href={'/'}>
            <Img
              style={{
                width: '110px',
                display: 'inline-block',
                verticalAlign: 'bottom',
                cursor: 'pointer',
              }}
              alt={'BonnieBots'}
              src={`/images/bonnie_bots_logo_sm.png`}
            />
          </Link>
          <Link href={'/'}>
            <Button
              component="div"
              sx={{
                color: '#fff',
                flexGrow: 1,
                minWidth: '130px',
                display: displayDesk,
              }}
            ></Button>
          </Link>
          <Box sx={{ display: displayDesk }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button sx={{ color: '#fff' }}>{item.label}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: displayMobi,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link href={'/'}>
              <Button component="div" sx={{ flexGrow: 1, display: displayMobi }}>
                {appTitle}
              </Button>
            </Link>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <Link href={item.href}>
                      <ListItemText>{item.label}</ListItemText>
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
