import React from "react";

type Props = {
  children: React.ReactNode;
};
const Container = ({ children }: Props) => {
  return <div style={containerStyle}>{children}</div>;
};

export default Container;

const containerStyle = {
  width: 900,
  margin: "0 auto",
  padding: "20px 0px",
};
