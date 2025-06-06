import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconMoon,
  IconMoonFilled,
} from "@tabler/icons-react";

import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
  Modal,
  useMantineColorScheme,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

import classes from "./Nav.module.scss";

import Login from "../home/Login";
import Register from "./Register";
import logo from "../../assets/sanji.png";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

const Nav = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const [loginOpened, { open: openLogin, close: closeLogin }] =
    useDisclosure(false);
  const [registerOpened, { open: openRegister, close: closeRegister }] =
    useDisclosure(false);

  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  // Entries within 'features' tab
  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  // Function to scroll to sections defined in Home.jsx
  const scrollTo = (sectionId) => {
    console.log("Scrolling to: ", sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box pb={0} className="color-black">
      <header className={classes.header}>
        <div className={classes.headerContent}>
          <Group
            justify="space-between"
            h="100%"
            style={{
              display: "flex",
              width: "100%",
              position: "relative",
            }}
          >
            <div className="flex items-center gap-2">
              <img src={logo} className="h-14" />
              <p className="text-4xl font-bold">BeliBites</p>
            </div>

            <Group
              h="100%"
              gap={30}
              visibleFrom="sm"
              style={{
                position: "absolute", // Position it absolutely within the header
                left: "50%", // Start at the middle of the header
                transform: "translateX(-50%)", // Offset it to truly center it
              }}
            >
              <a onClick={() => scrollTo("home")} className={classes.link}>
                Home
              </a>

              {/* 
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a
                    onClick={() => scrollTo("features")}
                    className={classes.link}
                  >
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown size={16} color={theme.colors.red[6]} />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                  <Group justify="space-between" px="md">
                    <Text fw={500}>Features</Text>
                    <Anchor component="a" href="#features" fz="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" c="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              */}

              <a onClick={() => scrollTo("about")} className={classes.link}>
                About
              </a>

              <a onClick={() => scrollTo("recipes")} className={classes.link}>
                Recipes
              </a>
            </Group>

            <Group visibleFrom="sm">
              {/* 
              <a
                style={{ display: "flex" }}
                className="toggleTheme"
                onClick={toggleColorScheme}
              >
                {colorScheme === "dark" ? (
                  <>
                    <IconMoonFilled className={classes.linkIcon} stroke={1.5} />
                  </>
                ) : (
                  <>
                    <IconMoon className={classes.linkIcon} stroke={1.5} />
                  </>
                )}
              </a>
              */}

              <Modal
                zIndex={1000}
                classNames={{
                  content: classes.modalWindow,
                }}
                styles={{
                  header: {
                    padding: 0,
                    margin: 0,
                    height: 0,
                    minHeight: 0,
                  },
                  title: {
                    display: "none",
                  },
                }}
                closeButtonProps={{
                  style: {
                    top: 10,
                    right: 10,
                    position: "absolute",
                  },
                }}
                size="md"
                opened={loginOpened}
                onClose={closeLogin}
                centered
              >
                <Login
                  switchRegister={() => {
                    closeLogin();
                    openRegister();
                  }}
                />
              </Modal>

              <Button
                variant="default"
                onClick={() => {
                  closeRegister();
                  openLogin();
                }}
                style={{ border: "1px solid #174dc4" }}
              >
                Log in
              </Button>

              <Modal
                zIndex={1000}
                classNames={{
                  content: classes.modalWindow,
                }}
                styles={{
                  header: {
                    padding: 0,
                    margin: 0,
                    height: 0,
                    minHeight: 0,
                  },
                  title: {
                    display: "none",
                  },
                }}
                closeButtonProps={{
                  style: {
                    top: 10,
                    right: 10,
                    position: "absolute",
                  },
                }}
                size="md"
                opened={registerOpened}
                onClose={closeRegister}
                centered
              >
                <Register
                  switchLogin={() => {
                    closeRegister();
                    openLogin();
                  }}
                  closeRegister={closeRegister}
                />
              </Modal>

              <Button
                onClick={() => {
                  closeLogin();
                  openRegister();
                }}
                style={{ backgroundColor: "#174dc4" }}
              >
                Sign up
              </Button>
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </div>

        <div className={classes.wave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path d="M0,160L21.8,160C43.6,160,87,160,131,154.7C174.5,149,218,139,262,154.7C305.5,171,349,213,393,213.3C436.4,213,480,171,524,165.3C567.3,160,611,192,655,186.7C698.2,181,742,139,785,122.7C829.1,107,873,117,916,133.3C960,149,1004,171,1047,165.3C1090.9,160,1135,128,1178,117.3C1221.8,107,1265,117,1309,138.7C1352.7,160,1396,192,1418,208L1440,224L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"></path>
          </svg>
        </div>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <a href="#" className={classes.link}>
            Home
          </a>

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Nav;
