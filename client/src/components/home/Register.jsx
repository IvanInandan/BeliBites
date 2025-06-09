import { useState } from "react";
import { toast } from "react-toastify";
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
import {
  checkUsernameUnique,
  checkEmailUnique,
} from "../../helpers/uniqueFuncs";

const Register = ({ switchLogin, closeRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // For user validation
  const [isUserUnique, setIsUserUnique] = useState(true);
  const [userTouched, setUserTouched] = useState(false);
  const showUserError = userTouched && username.length > 3 && !isUserUnique;

  // For password validation
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const passwordMatch = password === confirmPassword ? true : false;
  const showPasswordError =
    passwordTouched && confirmPassword.length > 0 && !passwordMatch;

  // For email validation
  const [email, setEmail] = useState("");
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
  const invalidEmailError = emailTouched && email.length > 0 && !isValidEmail;
  const uniqueEmailError = emailTouched && email.length > 0 && !isEmailUnique;

  const registerUser = async (event) => {
    event.preventDefault();

    if (
      !isUserUnique ||
      !isEmailUnique ||
      !isValidEmail ||
      !isPasswordValid ||
      !passwordMatch
    ) {
      if (!isUserUnique) toast.error(`Username '${username}' already exists`);
      if (!isEmailUnique) toast.error(`Email '${email}' already exists`);
      if (!isValidEmail) toast.error("Invalid email format");
      if (!isPasswordValid) toast.error("Password does not meet requirements");
      if (!passwordMatch) toast.error("Passwords do not match");

      return;
    }

    const response = await createUser({ username, email, password });

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    closeRegister();
    toast.success(
      `User ${username} has been successfully created! An email has been sent out to ${email}`
    );
  };

  return (
    <Container size={420} my={30}>
      <Title ta="center" className={classes.title}>
        Register with us!
      </Title>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        mb={30}
        radius="md"
        style={{
          maxHeight: "50vh", // limits modal content height
          overflowY: "auto", // enables scrolling if it overflows
        }}
      >
        <TextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          onBlur={async () => {
            setUserTouched(true);
            const usernameResult = await checkUsernameUnique(username);
            setIsUserUnique(usernameResult);
          }}
          error={showUserError ? "Username is not unique" : false}
          classNames={{
            input: userTouched
              ? isUserUnique
                ? classes.valid
                : classes.invalid
              : undefined,
          }}
          rightSection={
            userTouched && username.length > 0 ? (
              isUserUnique ? (
                <IconCheck size={18} stroke={1.5} color="green" />
              ) : (
                <IconAlertTriangle size={18} stroke={1.5} color="red" />
              )
            ) : null
          }
          required
        />

        <TextInput
          label="Email"
          placeholder="sanji@yeszeff.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          onBlur={async () => {
            setEmailTouched(true);
            if (isValidEmail) {
              const emailResult = await checkEmailUnique(email);
              setIsEmailUnique(emailResult);
            }
          }} // triggers validation when focus is lost
          error={
            invalidEmailError
              ? "Invalid email"
              : uniqueEmailError
              ? "Email already exists in system"
              : false
          }
          classNames={{
            input: emailTouched
              ? isEmailUnique
                ? classes.valid
                : classes.invalid
              : undefined,
          }}
          rightSection={
            emailTouched && email.length > 0 ? (
              isValidEmail && isEmailUnique ? (
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
              showPasswordError && passwordMatch ? (
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
