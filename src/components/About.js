import React from "react";
import { Container, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CakeAnimation from "./CakeAnimation";

const CakeSection = styled("section")({
  position: 'relative',
  padding: "80px 0",
  backgroundColor: "#f4f4f4",
  overflow: "hidden",
});

const AboutContainer = styled(Container)({
  display: "flex",
  gap: "48px",
  alignItems: "center",
  position: "relative",
  zIndex: 2,
  "@media (max-width: 768px)": {
    flexDirection: "column",
    textAlign: "center",
  },
});

const ContentWrapper = styled("div")({
  flex: "1",
  "& h2": {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#2C3E50",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "0",
      width: "80px",
      height: "4px",
      backgroundColor: "#E74C3C",
    },
  },
  "& p": {
    color: "#34495E",
    marginBottom: "32px",
    lineHeight: "1.8",
    fontSize: "16px",
  },
});

const CakeButton = styled(Button)({
  backgroundColor: "#E74C3C",
  color: "white",
  padding: "12px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: "600",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#C0392B",
    transform: "translateY(-3px)",
    boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
  },
});

const CakeImageWrapper = styled("div")({
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  "@media (max-width: 768px)": {
    marginTop: "32px",
  },
});

const DecorativeCircle = styled("div")({
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "rgba(231, 76, 60, 0.1)",
  zIndex: 1,
});

const About = () => {
  return (
    <CakeSection>
      <DecorativeCircle 
        sx={{
          width: "400px",
          height: "400px",
          top: "-100px",
          right: "-100px",
        }}
      />
      <DecorativeCircle 
        sx={{
          width: "250px",
          height: "250px",
          bottom: "-50px",
          left: "-50px",
        }}
      />
      <AboutContainer maxWidth="lg">
        <ContentWrapper>
          <Typography variant="h2" component="h2">
            About Our Cakes
          </Typography>
          <Typography paragraph>
            Crafted with the finest ingredients, our cheesecakes are a true testament to the art of baking. 
            Each slice is a carefully composed symphony of flavors, blending premium cream cheese, 
            hand-selected fruits, and our secret family recipe that has been perfected over generations.
          </Typography>
          <CakeButton variant="contained">
            Learn More
          </CakeButton>
        </ContentWrapper>
        <CakeImageWrapper>
          <CakeAnimation />
        </CakeImageWrapper>
      </AboutContainer>
    </CakeSection>
  );
};

export default About;