import React from "react";
import Button from "./Button";
import { styles } from "./Form";

function ConfirmSignUp(props) {
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
      <Button onClick={props.confirmSignUp} title="Confirm Sign Up" />
    </div>
  );
}

export default ConfirmSignUp;
