import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-[72px] transition-all duration-300">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;