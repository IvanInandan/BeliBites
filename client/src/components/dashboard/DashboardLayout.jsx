import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <div className="grow overflow-y-auto p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
