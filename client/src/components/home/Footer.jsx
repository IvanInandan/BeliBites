import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
import classes from "./Footer.module.scss";
import logo from "../../assets/sanji.png";
import bblogo from "../../../public/belibites-icon.png";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor
      unstyled
      className="text-[#174dc4]"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <div className="logo">
          <img src={bblogo} className="h-15" />
        </div>

        <Group className={classes.links}>{items}</Group>

        <Group gap="sm" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            //variant="default"
            radius="xl"
            style={{ backgroundColor: "#becae2", border: "1px solid #174dc4" }}
          >
            <a href="https://www.linkedin.com/in/ivaninandan/">
              <IconBrandLinkedin size={18} stroke={1.5} color="black" />
            </a>
          </ActionIcon>

          <ActionIcon
            size="lg"
            //variant="default"
            radius="xl"
            className="bg-gray-200"
            style={{ backgroundColor: "#becae2", border: "1px solid #174dc4" }}
          >
            <a href="https://github.com/IvanInandan/">
              <IconBrandGithub size={18} stroke={1.5} color="black" />
            </a>
          </ActionIcon>
        </Group>
      </div>

      <div className={classes.wave}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,192L21.8,197.3C43.6,203,87,213,131,213.3C174.5,213,218,203,262,186.7C305.5,171,349,149,393,133.3C436.4,117,480,107,524,101.3C567.3,96,611,96,655,117.3C698.2,139,742,181,785,165.3C829.1,149,873,75,916,69.3C960,64,1004,128,1047,149.3C1090.9,171,1135,149,1178,154.7C1221.8,160,1265,192,1309,202.7C1352.7,213,1396,203,1418,197.3L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}
