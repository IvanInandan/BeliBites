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

import Authentication from "./Authentication";
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

  const [opened, { open, close }] = useDisclosure(false);

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
    <Box pb={0} className="text-white">
      <header className={classes.header}>
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
            gap={0}
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

            <a onClick={() => scrollTo("about")} className={classes.link}>
              About
            </a>

            <a onClick={() => scrollTo("recipes")} className={classes.link}>
              Recipes
            </a>
          </Group>

          <Group visibleFrom="sm">
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

            <Modal
              classNames={{
                content: classes.loginWindow,
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
              opened={opened}
              onClose={close}
              centered
            >
              <Authentication />
            </Modal>

            <Button variant="default" onClick={open}>
              Log in
            </Button>

            <Link to="/register">
              <Button>Sign up</Button>
            </Link>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
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
