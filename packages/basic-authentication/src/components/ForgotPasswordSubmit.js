import React from "react";
import Button from "./Button";
import { styles } from "./Form";

function ForgotPasswordSubmit(props) {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        placeholder="Confirmation Code"
      />
      <input
        name="password"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        placeholder="New password"
      />
      <Button onClick={props.forgetPasswordSubmit} title="Save new password" />
    </div>
  );
}

export default ForgotPasswordSubmit;
