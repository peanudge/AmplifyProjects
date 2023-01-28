import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav";
import Public from "./Public";
import Profile from "./Profile";
import Protected from "./Protected";

const Router = () => {
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    setRoute();
  }, []);

  function setRoute() {
    const location = window.location.href.split("/");
    const pathname = location[location.length - 1];
    setCurrent(pathname ? pathname : "home");
  }
  return (
    <HashRouter window={window}>
      <Nav current={current} />
      <Routes>
        <Route exact path="/" element={<Public />} />
        <Route exact path="/protected" element={<Protected />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route element={Public} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
