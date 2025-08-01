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
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";

const Login = ({ switchRegister }) => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    const loginSuccess = await handleLogin(username, password);

    if (!loginSuccess)
      toast.error("Login failed: Invalid username or password");

    // Reset fields
    setUsername("");
    setPassword("");
  };

  const resetPassword = (event) => {
    event.preventDefault();
    console.log("Trigger password reset");
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} mb={30} radius="md">
        <TextInput
          label="Username"
          placeholder="sanji"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              login(event);
            }
          }}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          mt="md"
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              login(event);
            }
          }}
          required
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor onClick={resetPassword} component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button onClick={login} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor onClick={switchRegister} size="sm" component="a">
          Create account
        </Anchor>
      </Text>
    </Container>
  );
};

export default Login;
