import { HashRouter, Routes, Route } from "react-router-dom";
import Admin from "../Admin";

import Main from "../Main";
import Nav from "./Nav";
import Profile from "../Profile";
export default function Router() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route element={<Main />}></Route>
      </Routes>
    </HashRouter>
  );
}
