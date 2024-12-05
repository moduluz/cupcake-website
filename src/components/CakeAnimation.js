import React from 'react';
import { styled } from '@mui/material/styles';

const CakeWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#68b0ab',
  
  '& .birthday-cake': {
    position: 'relative',
    top: '20px',
  },
  
  '& .holder': {
    position: 'absolute',
    width: '350px',
    height: '20px',
    borderRadius: '100px',
    backgroundColor: '#212F3C',
    left: '-140px',
    top: '10px',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100px',
      height: '150px',
      backgroundColor: '#CACFD2',
      left: '130px',
      top: '20px',
    },
    
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#68b0ab',
      width: '100px',
      height: '135px',
      borderRadius: '30px 30px 0 0',
      left: '65px',
      top: '20px',
      boxShadow: '125px 0 #68b0ab',
    },
  },
  
  '& .shadow': {
    position: 'absolute',
    width: '350px',
    height: '20px',
    borderRadius: '50%',
    top: '170px',
    left: '-135px',
    backgroundColor: 'rgba(0,0,0,0.095)',
    zIndex: 1,
    
    '&::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#CACFD2',
      width: '150px',
      height: '20px',
      borderRadius: '20px',
      top: '-10px',
      left: '96px',
    },
  },
  
  '& .cake': {
    position: 'absolute',
    overflow: 'hidden',
    width: '275px',
    height: '140px',
    backgroundColor: '#FAD7A0',
    top: '-130px',
    left: '-101px',
    borderRadius: '30px 30px 0 0',
    
    '&::before': {
      content: '""',
      backgroundColor: '#935116',
      width: '275px',
      height: '15px',
      position: 'absolute',
      top: '75px',
      boxShadow: '0 30px #935116',
    },
    
    '&::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#573612',
      width: '275px',
      height: '40px',
      boxShadow: 'inset 0 10px rgba(0,0,0,0.07)',
    },
  },
  
  '& .chocolate': {
    position: 'absolute',
    backgroundColor: '#573612',
    width: '25px',
    height: '45px',
    top: '25px',
    left: '0',
    zIndex: 2,
    borderRadius: '50px',
    boxShadow: `
      25px 2px #FAD7A0, 
      50px -10px #573612, 
      75px -5px #FAD7A0, 
      100px 3px #573612, 
      125px 0 #FAD7A0, 
      150px -5px #573612, 
      175px 3px #FAD7A0, 
      200px -5px #573612, 
      225px -10px #FAD7A0, 
      250px 4px #573612
    `,
  },
  
  '& .candle': {
    position: 'absolute',
    width: '15px',
    height: '70px',
    backgroundColor: 'white',
    top: '-200px',
    left: '30px',
    boxShadow: 'inset 0 -10px 0 #E74C3C',
    
    '&::before': {
      position: 'absolute',
      width: '15px',
      height: '15px',
      backgroundColor: '#E74C3C',
      content: '""',
      top: '10px',
      boxShadow: '0 25px #E74C3C',
    },
    
    '&::after': {
      content: '""',
      width: '2px',
      height: '15px',
      position: 'absolute',
      backgroundColor: 'black',
      top: '-15px',
      left: '6px',
    },
  },
  
  '& .flame': {
    position: 'absolute',
    backgroundColor: '#F4D03F',
    opacity: 0.9,
    boxShadow: 'inset 0 -5px 5px #D35400, 5px -5px 20px #FBFFA3',
    width: '20px',
    height: '30px',
    top: '-240px',
    borderRadius: '50%',
    left: '26.5px',
    animation: '$flameAnimation 0.5s infinite',
  },
  
  '@keyframes flameAnimation': {
    'from, to': { transform: 'scale(1, 1)' },
    '25%': { transform: 'scale(0.9, 1.1)' },
    '50%': { transform: 'scale(1.1, 0.9)' },
    '75%': { transform: 'scale(0.95, 1.05)' },
  },
});

const BirthdayCake = () => {
  return (
    <CakeWrapper>
      <div className="birthday-cake">
        <div className="holder"></div>
        <div className="shadow"></div>
        <div className="cake">
          <div className="chocolate"></div>
        </div>
        <div className="candle"></div>
        <div className="flame"></div>
      </div>
    </CakeWrapper>
  );
};

export default BirthdayCake;