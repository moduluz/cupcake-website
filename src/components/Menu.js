import React, { useState } from "react";
import { 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActionArea,
  Button,
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSection = styled("section")({
  padding: "80px 0",
  backgroundColor: "#f5fffa",
});

const menuItems = [
  {
    id: 1,
    title: "Heavenly Cheesecake",
    description: "Indulge in this rich, velvety dessert.",
    price: "₹199",
    image: "https://source.unsplash.com/300x300/?cheesecake1",
  },
  {
    id: 2,
    title: "Signature Selection",
    description: "A classic, loved by all.",
    price: "₹250",
    image: "https://source.unsplash.com/300x300/?cheesecake2",
  },
  {
    id: 3,
    title: "Creamy Combination",
    description: "A fusion of flavors in every bite.",
    price: "₹299",
    image: "https://source.unsplash.com/300x300/?cheesecake3",
  },
];

const Menu = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.title} added to cart!`);
  };

  return (
    <StyledSection>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          align="center" 
          sx={{ marginBottom: 4 }}
        >
          Explore Our Menu
        </Typography>
        
        <Grid container spacing={4}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                      {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box sx={{ padding: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSection>
  );
};

export default Menu;
