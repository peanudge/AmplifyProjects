import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import Container from "./Cotainer";
import { useNavigate } from "react-router-dom";

function Protected() {
  const navigate = useNavigate();
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => {
      navigate("/profile");
    });
  }, []);

  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
}

export default Protected;
