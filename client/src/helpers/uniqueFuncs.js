import { searchUser, searchEmail } from "../services/user";

const checkUsernameUnique = async (username) => {
  const { unique } = await searchUser(username);

  if (unique === "true") return true;
  else return false;
};

const checkEmailUnique = async (email) => {
  const { unique } = await searchEmail(email);

  if (unique === "true") return true;
  else return false;
};

export { checkUsernameUnique, checkEmailUnique };
