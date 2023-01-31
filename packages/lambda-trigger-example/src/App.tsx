import { CognitoUser } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import "./App.css";
import ImageUploadForm from "./ImageUploadForm";

function App() {
  const [user, updateUser] = useState<CognitoUser | null>(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => updateUser(user))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let isAdmin = false;
  if (user) {
    const session = user.getSignInUserSession();
    const idToken = session?.getIdToken();
    const payload = idToken?.payload!;
    console.log("payload: ", payload);
    if (
      payload["cognito:groups"] &&
      (payload["cognito:groups"] as string[]).includes("Admin")
    ) {
      isAdmin = true;
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Hello world</h1>
        {isAdmin && <p>Welcome, Admin</p>}
      </header>
      <button onClick={() => Auth.signOut()}>Sign Out</button>

      <ImageUploadForm />
    </div>
  );
}

export default withAuthenticator(App);
