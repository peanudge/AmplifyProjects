import React, { useState, useEffect, useMemo } from "react";
import checkUser from "../util/checkUser";
import { Hub } from "aws-amplify";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, updateUser] = useState<{
    username?: string;
    isAuthorized?: boolean;
  }>({});

  useEffect(() => {
    checkUser(updateUser);
    Hub.listen("auth", (data) => {
      const {
        payload: { event },
      } = data;
      console.log("event: ", event);
      if (event === "signIn" || event === "signOut") checkUser(updateUser);
    });
  }, []);

  const menuItems = useMemo(() => {
    const items = [
      { icon: <HomeOutlined />, title: "Home", key: "/", label: "Home" },
      {
        icon: <UserOutlined />,
        title: "Profile",
        key: "/profile",
        label: "Profile",
      },
    ];

    if (user.isAuthorized) {
      items.push({
        icon: <ProfileOutlined />,
        title: "Admin",
        key: "/admin",
        label: "Admin",
      });
    }
    return items;
  }, [user]);

  return (
    <div>
      <Menu
        mode={"horizontal"}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={menuItems}
      ></Menu>
    </div>
  );
};
export default Nav;
