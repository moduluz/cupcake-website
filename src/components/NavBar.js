import React from 'react';
import { AppBar, Toolbar, Button, Box, styled } from "@mui/material";

// Styled components using MUI's styled API
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

const StyledNavLink = styled('a')(({ theme }) => ({
  color: '#4B5563',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'color 0.3s ease',
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

const handleScroll = (id) => {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });
};


const Navbar = () => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ padding: '20px 40px' }}>
        <Box className="logo">
          <Logo>CupCake</Logo>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: '32px', 
          alignItems: 'center',
          marginLeft: 'auto'
        }}>
          <StyledNavLink href="#home">Home</StyledNavLink>
          <StyledNavLink href="#about">About</StyledNavLink>
          <StyledNavLink href="#menu">Menu</StyledNavLink>
          <StyledNavLink href="#contact">Contact</StyledNavLink>
          <OrderButton variant="contained">
            Order
          </OrderButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;