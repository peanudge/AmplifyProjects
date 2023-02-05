import { Auth } from "aws-amplify";
import React from "react";

// TODO: typescript
async function checkUser(
  updateUser: React.Dispatch<
    React.SetStateAction<{
      username?: string;
      isAuthorized?: boolean;
    }>
  >
) {
  const userData = await Auth.currentSession().catch((err) =>
    console.log("error: ", err)
  );
  if (!userData) {
    console.log("userData: ", userData);
    updateUser({});
    return;
  }
  const payload = userData.getIdToken().payload;
  console.log("Payload: ", payload);
  const isAuthorized =
    payload["cognito:groups"] && payload["cognito:groups"].includes("Admin");
  updateUser({
    username: payload["cognito:username"],
    isAuthorized,
  });
}

export default checkUser;
