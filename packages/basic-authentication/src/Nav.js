import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

import {
  HomeOutlined,
  ProfileOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

const items = [
  { icon: <HomeOutlined />, title: "Home", key: "home", label: "Home" },
  {
    icon: <ProfileOutlined />,
    title: "Profile",
    key: "profile",
    label: "Profile",
  },
  {
    icon: <FileProtectOutlined />,
    title: "Protected",
    key: "protected",
    label: "Protected",
  },
];

function Nav(props) {
  const { current } = props;
  const navigate = useNavigate();
  return (
    <div>
      <Menu
        onClick={({ key }) => {
          switch (key) {
            case "home": {
              navigate("/");
              return;
            }
            default:
              navigate(key);
          }
        }}
        items={items}
      ></Menu>
    </div>
  );
}

export default Nav;
