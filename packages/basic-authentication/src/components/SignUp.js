import React from "react";
import Button from "./Button";
import { styles } from "./Form";

function SignUp({ signUp, updateFormState }) {
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
      <input
        name="email"
        style={styles.input}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        placeholder="email"
      />
      <Button onClick={signUp} title="Sign Up" />
    </div>
  );
}

export default SignUp;
