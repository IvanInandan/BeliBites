import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { handleLogout } = useAuth();

  return (
    <div>
      <h1>Log in successful</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Dashboard;
