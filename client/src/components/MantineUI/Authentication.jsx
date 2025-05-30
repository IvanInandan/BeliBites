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
import classes from "./Authentication.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import { handleLogin, createUser } from "../../helper/authFuncs";
//import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";

const Authentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    console.log("User: ", username);
    console.log("Pass: ", password);

    /*
    const loginSuccess = await handleLogin(dispatch, username, password);

    if (loginSuccess) {
      navigate("/dashboard");
    } else {
      toast.error("Login failed: Invalid username or password");
    }
*/

    // Reset fields
    setUsername("");
    setPassword("");
  };

  const resetPassword = () => {
    event.preventDefault();
    console.log("Trigger password reset");
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor href="/register" size="sm" component="a">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor onClick={() => resetPassword()} component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button onClick={login} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Authentication;
