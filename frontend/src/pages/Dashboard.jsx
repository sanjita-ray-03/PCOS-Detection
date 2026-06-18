import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaWeight,
  FaBrain,
  FaClipboardCheck,
  FaPlus,
  FaHistory,
  FaUserEdit,
  FaChevronRight,
  FaBell,
  FaLeaf,
  FaRunning,
  FaCalendarAlt,
  FaTint,
} from "react-icons/fa";

const insights = [
  { dot: "bg-emerald-500", icon: FaLeaf,        color: "text-emerald-600 bg-emerald-50", title: "Balanced diet",    body: "Maintain a fiber-rich diet to support hormonal health." },
  { dot: "bg-violet-500",  icon: FaRunning,      color: "text-violet-600 bg-violet-50",  title: "Daily exercise",   body: "30 minutes of movement daily improves insulin sensitivity." },
  { dot: "bg-blue-500",    icon: FaCalendarAlt,  color: "text-blue-600 bg-blue-50",      title: "Cycle tracking",   body: "Track menstrual cycles regularly to spot irregularities." },
  { dot: "bg-amber-500",   icon: FaTint,         color: "text-amber-600 bg-amber-50",    title: "Hydration & stress", body: "Stay hydrated and practice daily stress-reduction." },
];

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    name: "",
    bmi: 0,
    lastRisk: "No Assessment",
    totalAssessments: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBMIStatus = () => {
    if (dashboard.bmi < 18.5) return { label: "Underweight", cls: "bg-amber-50 text-amber-700 border border-amber-200" };
    if (dashboard.bmi < 25)   return { label: "Normal",      cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" };
    if (dashboard.bmi < 30)   return { label: "Overweight",  cls: "bg-orange-50 text-orange-700 border border-orange-200" };
    return                           { label: "Obese",        cls: "bg-red-50 text-red-700 border border-red-200" };
  };

  const bmiStatus = getBMIStatus();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const firstName = dashboard.name?.split(" ")[0] || "";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-gray-900 leading-tight">
              Welcome back, {firstName ? `${firstName}` : "User"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <FaBell size={14} />
            </button>
            <button
              onClick={() => navigate("/assessment")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-[13px] font-medium hover:bg-violet-700 active:scale-95 transition-all shadow-sm"
            >
              <FaPlus size={10} />
              New assessment
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-7 space-y-6 max-w-6xl w-full mx-auto">

          {/* ── Stat cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* BMI */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Body mass index</p>
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <FaWeight size={13} className="text-violet-500" />
                </div>
              </div>
              <p className="text-5xl font-semibold text-gray-900 leading-none tracking-tight">
                {dashboard.bmi}
              </p>
              <span className={`inline-flex items-center mt-4 px-2.5 py-1 rounded-full text-[11px] font-medium ${bmiStatus.cls}`}>
                {bmiStatus.label}
              </span>
            </div>

            {/* Last prediction */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Last prediction</p>
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <FaBrain size={13} className="text-violet-500" />
                </div>
              </div>
              <p className="text-3xl font-semibold text-gray-900 leading-tight mt-1">
                {dashboard.lastRisk}
              </p>
              <span className="inline-flex items-center mt-4 px-2.5 py-1 rounded-full text-[11px] font-medium bg-violet-50 text-violet-700 border border-violet-100">
                AI assessed
              </span>
            </div>

            {/* Total assessments */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Total assessments</p>
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                  <FaClipboardCheck size={13} className="text-violet-500" />
                </div>
              </div>
              <p className="text-5xl font-semibold text-gray-900 leading-none tracking-tight">
                {dashboard.totalAssessments}
              </p>
              <span className="inline-flex items-center mt-4 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500">
                Completed evaluations
              </span>
            </div>

          </div>

          {/* ── Two column ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Quick actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-[13px] font-semibold text-gray-900 mb-4">Quick actions</h2>
              <div className="space-y-2">

                {[
                  {
                    onClick: () => navigate("/assessment"),
                    iconBg: "bg-violet-100", iconColor: "text-violet-600",
                    Icon: FaPlus,
                    title: "New assessment", sub: "Start a fresh PCOS evaluation",
                  },
                  {
                    onClick: () => navigate("/history"),
                    iconBg: "bg-blue-100", iconColor: "text-blue-600",
                    Icon: FaHistory,
                    title: "Assessment history", sub: "Review past results & trends",
                  },
                  {
                    onClick: () => navigate("/profile"),
                    iconBg: "bg-emerald-100", iconColor: "text-emerald-600",
                    Icon: FaUserEdit,
                    title: "Update profile", sub: "Edit your health information",
                  },
                ].map(({ onClick, iconBg, iconColor, Icon, title, sub }) => (
                  <button
                    key={title}
                    onClick={onClick}
                    className="w-full flex items-center gap-3.5 p-3.5 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all text-left group"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                      <Icon size={13} className={iconColor} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-gray-800">{title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                    </div>
                    <FaChevronRight size={11} className="text-gray-300 group-hover:text-gray-400 flex-shrink-0 transition-colors" />
                  </button>
                ))}

              </div>
            </div>

            {/* Health insights */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-[13px] font-semibold text-gray-900 mb-4">Health insights</h2>
              <div className="space-y-3">

                {insights.map(({ dot, icon: Icon, color, title, body }) => (
                  <div
                    key={title}
                    className="flex items-start gap-3.5 p-3.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color.split(" ")[1]}`}>
                      <Icon size={12} className={color.split(" ")[0]} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-gray-800">{title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;