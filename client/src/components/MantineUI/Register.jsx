import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Login.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { handleLogin, createUser } from "../../helper/authFuncs";
//import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";

const Register = ({ switchLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Register with us!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} mb={30} radius="md">
        <TextInput
          label="Email"
          placeholder="sanji@yeszeff.dev"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          mt="md"
        />
        <Button onClick={() => {}} fullWidth mt="xl">
          Register
        </Button>
      </Paper>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor onClick={switchLogin} size="sm" component="a">
          Login here
        </Anchor>
      </Text>
    </Container>
  );
};

export default Register;
