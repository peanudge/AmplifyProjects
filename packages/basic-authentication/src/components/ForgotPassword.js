import React from "react";
import Button from "./Button";
import { styles } from "./Form";

function ForgotPassword(props) {
  return (
    <div style={styles.container}>
      <input
        name="username"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        placeholder="Username"
      />
      <Button onClick={props.forgotPassword} title="Reset password" />
    </div>
  );
}

export default ForgotPassword;
