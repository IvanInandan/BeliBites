import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Navbar />
      <div className="grow p-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
