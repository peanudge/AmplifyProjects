import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import Container from "./Cotainer";
import protectedRoute from "./hoc/protectedRoute";

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

function Profile() {
  useEffect(() => {
    checkUser();
  }, []);
  const [user, setUser] = useState({});
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  }
  const isSignIn = user.username !== undefined;
  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Email: {user.email}</h3>
      <h4>Phone: {user.phone_number}</h4>
      {isSignIn && <button onClick={signOut}>Sign out</button>}
    </Container>
  );
}

export default protectedRoute(Profile);
