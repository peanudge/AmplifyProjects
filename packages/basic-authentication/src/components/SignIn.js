import React from "react";
import Button from "./Button";
import { styles } from "./Form";

function SignIn({ signIn, updateFormState }) {
  return (
    <div style={styles.container}>
      <input
        name="username"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="password"
      />
      <Button onClick={signIn} title="Sign In" />
    </div>
  );
}

export default SignIn;
