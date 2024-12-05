import React from "react";
import { Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledSection = styled("section")({
  padding: "80px 0",
  backgroundColor: "white",
});

const Contact = () => {
  return (
    <StyledSection id="contact">
      <Container>
        <h2
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "16px",
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "#4B5563",
          }}
        >
          We're here to take your orders and inquiries!
        </p>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "black",
              "&:hover": { backgroundColor: "#FFC700" },
              padding: "12px 32px",
            }}
          >
            Contact Us
          </Button>
        </div>
      </Container>
    </StyledSection>
  );
};

export default Contact;
