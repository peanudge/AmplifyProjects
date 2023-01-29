import React from "react";

export default function Button({ onClick, title }) {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}

const styles = {
  button: {
    backgroudColor: "#006bfc",
    color: "black",
    width: 316,
    height: 46,
    fontWeight: "600",
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    outline: "none",
    borderRadius: 3,
    marginTop: "25px",
    boxShadow: "0px 1px 3px rgba(0,0,0,.3)",
  },
};
