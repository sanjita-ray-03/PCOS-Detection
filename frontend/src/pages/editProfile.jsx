import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { FaArrowLeft, FaSave, FaUser, FaBirthdayCake, FaRulerVertical, FaWeight, FaLayerGroup } from "react-icons/fa";

const AGE_GROUPS = ["Youth", "Young Adult", "Reproductive Age Group", "Adult Women"];

function Field({ label, hint, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600">
        <Icon size={11} className="text-violet-400" />
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", ageGroup: "", height: "", weight: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    const res = await api.get("/auth/profile");
    setForm(res.data);
  };

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/user/update-profile", form);
      setSaved(true);
      setTimeout(() => navigate("/profile"), 1000);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-400 focus:bg-white text-gray-800 transition-colors placeholder:text-gray-300";

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft size={12} />
          </button>
          <div>
            <h1 className="text-[15px] font-semibold text-gray-900">Edit profile</h1>
            <p className="text-xs text-gray-400 mt-0.5">Update your personal health information</p>
          </div>
        </header>

        <main className="px-8 py-7 max-w-2xl w-full mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Personal info card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Personal information</p>
              <div className="space-y-4">

                <Field label="Full name" icon={FaUser}>
                  <input
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={inputCls}
                    required
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Age" hint="In years" icon={FaBirthdayCake}>
                    <input
                      type="number"
                      value={form.age}
                      onChange={set("age")}
                      placeholder="e.g. 24"
                      min={10} max={80}
                      className={inputCls}
                      required
                    />
                  </Field>

                  <Field label="Age group" icon={FaLayerGroup}>
                    <select
                      value={form.ageGroup}
                      onChange={set("ageGroup")}
                      className={inputCls}
                      required
                    >
                      <option value="" disabled>Select group</option>
                      {AGE_GROUPS.map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </Field>
                </div>

              </div>
            </div>

            {/* Body metrics card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Body metrics</p>
              <div className="grid grid-cols-2 gap-4">

                <Field label="Height" hint="Centimetres (cm)" icon={FaRulerVertical}>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.height}
                      onChange={set("height")}
                      placeholder="e.g. 162"
                      min={100} max={220}
                      className={`${inputCls} pr-10`}
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium">cm</span>
                  </div>
                </Field>

                <Field label="Weight" hint="Kilograms (kg)" icon={FaWeight}>
                  <div className="relative">
                    <input
                      type="number"
                      value={form.weight}
                      onChange={set("weight")}
                      placeholder="e.g. 58"
                      min={20} max={200}
                      className={`${inputCls} pr-10`}
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium">kg</span>
                  </div>
                </Field>

              </div>

              {/* Live BMI preview */}
              {form.height && form.weight && (() => {
                const bmi = (Number(form.weight) / Math.pow(Number(form.height) / 100, 2)).toFixed(1);
                const status = bmi < 18.5 ? ["Underweight", "text-amber-600 bg-amber-50 border-amber-200"]
                             : bmi < 25   ? ["Normal",      "text-emerald-600 bg-emerald-50 border-emerald-200"]
                             : bmi < 30   ? ["Overweight",  "text-orange-600 bg-orange-50 border-orange-200"]
                             :              ["Obese",       "text-red-600 bg-red-50 border-red-200"];
                return (
                  <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 bg-gray-50">
                    <span className="text-[12px] text-gray-500">Calculated BMI</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-gray-900">{bmi}</span>
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${status[1]}`}>{status[0]}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving || saved}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-[13px] font-medium transition-all active:scale-95
                ${saved
                  ? "bg-emerald-500 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                } disabled:opacity-70`}
            >
              <FaSave size={12} />
              {saved ? "Saved! Redirecting…" : saving ? "Saving…" : "Save changes"}
            </button>

          </form>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default EditProfile;