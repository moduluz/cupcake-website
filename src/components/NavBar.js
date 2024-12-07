import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  styled, 
  Menu, 
  MenuItem, 
  IconButton 
} from "@mui/material";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const Logo = styled('span')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  fontFamily: "'Playfair Display', serif",
}));

const StyledNavLink = styled(ScrollLink)(({ theme }) => ({
  color: '#4B5563',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.3s ease',
  cursor: 'pointer',
  marginRight: theme.spacing(2),
  '&:hover': {
    color: '#FFD700',
  },
}));

const OrderButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFD700',
  color: 'black',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#FFC700',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Logo>CupCake</Logo>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledNavLink to="home" smooth={true} duration={500}>Home</StyledNavLink>
          <StyledNavLink to="about" smooth={true} duration={500}>About</StyledNavLink>
          <StyledNavLink to="menu" smooth={true} duration={500}>Menu</StyledNavLink>
          <StyledNavLink to="contact" smooth={true} duration={500}>Contact</StyledNavLink>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Profile Menu */}
          <IconButton 
            onClick={handleProfileMenuOpen}
            sx={{ 
              color: '#4B5563', 
              marginRight: 2,
              '&:hover': { 
                backgroundColor: 'rgba(0,0,0,0.05)' 
              } 
            }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem 
              component={Link} 
              to="/profile/overview" 
              onClick={handleProfileMenuClose}
            >
              Profile Overview
            </MenuItem>

            <MenuItem 
              component={Link} 
              to="/profile/orders" 
              onClick={handleProfileMenuClose}
            >
              Order History
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/profile/settings" 
              onClick={handleProfileMenuClose}
            >
              Account Settings
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/logout" 
              onClick={handleProfileMenuClose}
            >
              Logout
            </MenuItem>
          </Menu>

          {/* Order Button with Link */}
          <Link to="/fullmenu">
            <OrderButton variant="contained">
              Order
            </OrderButton>
          </Link>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
