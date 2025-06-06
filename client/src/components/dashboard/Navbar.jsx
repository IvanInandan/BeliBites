import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth.js";
import {
  IconHome,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconMoon,
  IconMoonFilled,
} from "@tabler/icons-react";
import { Code, Group, useMantineColorScheme } from "@mantine/core";
import logo from "../../assets/sanji.png";

// Import CSS Module for scoped styling
import classes from "./Navbar.module.scss";

import UserButton from "./UserButton.jsx";

// Define items in Navbar
const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconHome },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export default function Dashboard() {
  const { handleLogout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-14" />
            <p className="text-4xl font-bold">BeliBites</p>
          </div>

          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <UserButton user={user} />

        <a
          href="/logout"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            handleLogout(dispatch, navigate, event);
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>

        {/* Toggle Theme Button */}
        <a className={classes.link} onClick={toggleColorScheme}>
          {colorScheme === "dark" ? (
            <>
              <IconMoonFilled className={classes.linkIcon} stroke={1.5} />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <IconMoon className={classes.linkIcon} stroke={1.5} />
              <span>Light Mode</span>
            </>
          )}
        </a>
      </div>
    </nav>
  );
}
