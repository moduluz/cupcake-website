import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CakeModelScene from "./Cake Model"; // Ensure this is correct

// Styled Components
const StyledSection = styled("section")({
  padding: "80px 0",
});

const Container = styled("div")({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 24px",
});

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "white" }}>
      {/* Hero Section */}
      <StyledSection id="home">
        <Container>
          <div
            style={{
              display: "flex",
              gap: "48px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1",
                minWidth: "300px",
              }}
            >
              <h1
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  lineHeight: "1.1",
                  marginBottom: "24px",
                  color: "#333",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Delightful
                <br />
                Cheese
                <br />
                Cake
              </h1>
              <p
                style={{
                  color: "#4B5563",
                  fontSize: "18px",
                  marginBottom: "32px",
                  maxWidth: "400px",
                }}
              >
                Indulge in our mouthwatering cheesecakes, freshly prepared in
                individual cups for your ultimate delight
              </p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FFD700",
                  color: "black",
                  "&:hover": { backgroundColor: "#FFC700" },
                  padding: "12px 32px",
                  fontSize: "16px",
                  textTransform: "none",
                }}
              >
                Order Now
              </Button>
            </div>
            <CakeModelScene />
          </div>
        </Container>
      </StyledSection>
    </div>
  );
}
