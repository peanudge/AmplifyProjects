import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "antd";
function Profile() {
  return (
    <div style={containerStyle}>
      <Button onClick={() => Auth.signOut()}>Sign Out</Button>
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: "20px auto",
};

export default withAuthenticator(Profile);
