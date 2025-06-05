import { useState } from "react";
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
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import classes from "./Login.module.scss";
import { PasswordStrength } from "./PasswordStrength";
import { createUser } from "../../services/user";

const Register = ({ switchLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For password validation
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const passwordMatch = password === confirmPassword ? true : false;
  const showPasswordError =
    passwordTouched && confirmPassword.length > 0 && !passwordMatch;

  // For email validation
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const showEmailError = emailTouched && email.length > 0 && !isValidEmail;

  const registerUser = async (event) => {
    event.preventDefault();

    if (!isValidEmail || !isPasswordValid || !passwordMatch) return;

    const response = await createUser({ username, email, password });
    console.log("hello");

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container size={420} my={30}>
      <Title ta="center" className={classes.title}>
        Register with us!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} mb={30} radius="md">
        <TextInput
          className="pb-3"
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <TextInput
          label="Email"
          placeholder="sanji@yeszeff.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          onBlur={() => setEmailTouched(true)} // triggers validation when focus is lost
          error={showEmailError ? "Invalid email" : false}
          classNames={{
            input: emailTouched
              ? isValidEmail
                ? classes.valid
                : classes.invalid
              : undefined,
          }}
          rightSection={
            emailTouched ? (
              isValidEmail ? (
                <IconCheck size={18} stroke={1.5} color="green" />
              ) : (
                <IconAlertTriangle size={18} stroke={1.5} color="red" />
              )
            ) : null
          }
          required
        />

        <div className="pb-3" />

        <PasswordStrength
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onValidChange={(valid) => setIsPasswordValid(valid)}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder=""
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          onBlur={() => setPasswordTouched(true)} // triggers validation when focus is lost
          error={showPasswordError ? "Passwords do not match" : false}
          classNames={{
            input: passwordTouched
              ? passwordMatch
                ? classes.valid
                : classes.invalid
              : undefined,
          }}
          rightSection={
            passwordTouched ? (
              passwordMatch ? (
                <IconCheck size={18} stroke={1.5} color="green" />
              ) : (
                <IconAlertTriangle size={18} stroke={1.5} color="red" />
              )
            ) : null
          }
          required
          mt="md"
        />

        <Button onClick={registerUser} fullWidth mt="xl">
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
