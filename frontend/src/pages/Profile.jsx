import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import api from "../services/api";
import {
  FaEnvelope, FaBirthdayCake, FaRulerVertical,
  FaWeight, FaLayerGroup, FaEdit, FaSignOutAlt,
} from "react-icons/fa";

function getBMIStatus(bmi) {
  if (bmi < 18.5) return { label: "Underweight", cls: "bg-amber-50 text-amber-700 border-amber-200"  };
  if (bmi < 25)   return { label: "Normal",      cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (bmi < 30)   return { label: "Overweight",  cls: "bg-orange-50 text-orange-700 border-orange-200" };
  return               { label: "Obese",          cls: "bg-red-50 text-red-700 border-red-200" };
}

function DonutBMI({ bmi, max = 40 }) {
  const size = 120, stroke = 14;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(bmi / max, 1);
  const filled = pct * circ;
  const color = bmi < 18.5 ? "#F59E0B" : bmi < 25 ? "#10B981" : bmi < 30 ? "#F97316" : "#EF4444";
  const { label } = getBMIStatus(bmi);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-semibold text-gray-900">{bmi}</span>
        <span className="text-[10px] text-gray-400">BMI</span>
      </div>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { getProfile(); }, []);

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-[70vh]"><Loader /></div>
    </DashboardLayout>
  );

  if (error) return (
    <DashboardLayout>
      <div className="max-w-md mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl">{error}</div>
    </DashboardLayout>
  );

  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const bmi = user?.height && user?.weight
    ? parseFloat((Number(user.weight) / Math.pow(Number(user.height) / 100, 2)).toFixed(1))
    : null;
  const bmiStatus = bmi ? getBMIStatus(bmi) : null;

  const fields = [
    { icon: FaBirthdayCake,  label: "Age",       value: `${user?.age} years`   },
    { icon: FaLayerGroup,    label: "Age group", value: user?.ageGroup          },
    { icon: FaRulerVertical, label: "Height",    value: `${user?.height} cm`   },
    { icon: FaWeight,        label: "Weight",    value: `${user?.weight} kg`   },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-[15px] font-semibold text-gray-900">My profile</h1>
          <p className="text-xs text-gray-400 mt-0.5">View and manage your personal information</p>
        </header>

        <main className="px-8 py-7 max-w-3xl w-full mx-auto space-y-4">

          {/* ── Profile card ── */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

            {/* Violet band */}
            <div className="h-20 bg-violet-600 relative">
              <div className="absolute -bottom-8 left-6">
                <div className="w-16 h-16 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-[17px] font-semibold text-violet-700 bg-violet-100">
                  {initials}
                </div>
              </div>
            </div>

            <div className="pt-11 px-6 pb-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-[16px] font-semibold text-gray-900">{user?.name}</h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <FaEnvelope size={11} className="text-gray-400" />
                    <p className="text-[12px] text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <FaEdit size={11} />
                  Edit
                </button>
              </div>

              {/* Fields + BMI in one row */}
              <div className="grid md:grid-cols-2 gap-3">

                {/* Left: fields */}
                <div className="space-y-2">
                  {fields.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center flex-shrink-0">
                          <Icon size={10} className="text-violet-500" />
                        </div>
                        <span className="text-[12px] text-gray-500">{label}</span>
                      </div>
                      <span className="text-[12px] font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Right: BMI panel */}
                {bmi && (
                  <div className="flex flex-col items-center justify-center gap-3 p-5 rounded-lg border border-gray-100 bg-gray-50">
                    <DonutBMI bmi={bmi} />
                    <div className="text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium border ${bmiStatus.cls}`}>
                        {bmiStatus.label}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1.5">Based on height & weight</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-medium transition-colors"
                >
                  <FaSignOutAlt size={11} />
                  Sign out
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </DashboardLayout>
  );
}

export default Profile;