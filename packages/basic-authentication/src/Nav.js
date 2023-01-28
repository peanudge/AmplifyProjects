import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import {
  HomeOutlined,
  ProfileOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

const items = [
  { icon: <HomeOutlined />, title: "Home", key: "/", label: "Home" },
  {
    icon: <ProfileOutlined />,
    title: "Profile",
    key: "/profile",
    label: "Profile",
  },
  {
    icon: <FileProtectOutlined />,
    title: "Protected",
    key: "/protected",
    label: "Protected",
  },
];

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <Menu
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={items}
      ></Menu>
    </div>
  );
}

export default Nav;
