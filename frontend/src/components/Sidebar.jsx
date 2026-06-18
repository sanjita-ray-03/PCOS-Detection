import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../services/api";
import {
  FaHome,
  FaClipboardList,
  FaChartLine,
  FaHistory,
  FaUser,
  FaHeartbeat,
} from "react-icons/fa";

const navSections = [
  {
    label: "Overview",
    links: [
      { to: "/dashboard",  icon: FaHome,         label: "Dashboard"  },
      { to: "/assessment", icon: FaClipboardList, label: "Assessment" },
      { to: "/results",    icon: FaChartLine,     label: "Results"    },
    ],
  },
  {
    label: "Records",
    links: [
      { to: "/history", icon: FaHistory, label: "History" },
      { to: "/profile", icon: FaUser,    label: "Profile" },
    ],
  },
];

function Sidebar() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-white border-r border-gray-200 w-[72px] hover:w-60 transition-[width] duration-300 ease-in-out overflow-hidden group">

      {/* Brand */}
      <div className="flex items-center gap-3 px-[18px] py-5 border-b border-gray-100 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <FaHeartbeat size={15} className="text-white" />
        </div>
        <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-[13px] font-semibold text-gray-900 leading-tight">PCOS Detection</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Health Monitor</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-5 overflow-hidden">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-colors duration-150 group/link
                    ${isActive
                      ? "bg-violet-50 text-violet-700 font-medium"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-violet-600" />
                      )}
                      <Icon
                        size={15}
                        className={`flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-violet-600"
                            : "text-gray-400 group-hover/link:text-gray-600"
                        }`}
                      />
                      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-100 px-3 py-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-1 py-1.5">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-violet-700">
            {initials || "?"}
          </div>
          <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-1 min-w-0">
            <p className="text-[12px] font-medium text-gray-900 truncate leading-tight">
              {user.name || "Loading…"}
            </p>
            <p className="text-[11px] text-gray-400">Patient</p>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;