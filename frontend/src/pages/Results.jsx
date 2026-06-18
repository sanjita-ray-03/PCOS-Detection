import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  FaCheckCircle, FaExclamationTriangle, FaTimesCircle,
  FaChartPie, FaArrowLeft, FaLeaf, FaRunning, FaCookieBite,
  FaMoon, FaUserMd, FaAppleAlt, FaTint, FaHeartbeat,
} from "react-icons/fa";

/* ── Dynamic recommendations by risk tier ── */
const RECOMMENDATIONS = {
  low: [
    { icon: FaLeaf,      title: "Keep up your diet",       body: "Your current fiber-rich diet is working. Maintain whole grains, legumes, and vegetables." },
    { icon: FaRunning,   title: "Stay active",              body: "Continue 30 min of moderate exercise daily to keep insulin sensitivity stable." },
    { icon: FaMoon,      title: "Protect your sleep",       body: "7–9 hours of quality sleep supports your hormonal balance — keep this consistent." },
    { icon: FaTint,      title: "Hydration habit",          body: "Drink at least 8 glasses of water daily. Herbal teas can help reduce inflammation." },
  ],
  moderate: [
    { icon: FaAppleAlt,  title: "Reduce sugar intake",      body: "Cut processed sugars and refined carbs — these spike insulin and worsen PCOS symptoms." },
    { icon: FaRunning,   title: "Increase activity",        body: "Aim for 45 min of exercise daily, mixing cardio with strength training for best results." },
    { icon: FaUserMd,    title: "See a gynecologist",       body: "Schedule a consultation soon. Hormonal panels and an ultrasound can clarify your situation." },
    { icon: FaHeartbeat, title: "Track your cycle",         body: "Log your periods and symptoms. Irregularities longer than 35 days need clinical attention." },
    { icon: FaMoon,      title: "Prioritise sleep",         body: "Poor sleep raises cortisol and worsens insulin resistance. Target 8 hours consistently." },
  ],
  high: [
    { icon: FaUserMd,    title: "Consult a doctor urgently", body: "Your risk is high. Seek a gynaecologist or endocrinologist for a formal diagnosis soon." },
    { icon: FaCookieBite,title: "Strict dietary changes",   body: "Eliminate refined sugars, fried foods, and dairy. Adopt a low-GI anti-inflammatory diet immediately." },
    { icon: FaRunning,   title: "Daily structured exercise", body: "Commit to 45–60 min daily combining HIIT and resistance training to reduce androgen levels." },
    { icon: FaHeartbeat, title: "Monitor your symptoms",    body: "Track acne, hair loss, cycle length, and weight changes — bring this log to your appointment." },
    { icon: FaMoon,      title: "Sleep & stress",           body: "Elevated cortisol directly worsens PCOS. Practice mindfulness or yoga and target 8+ hours sleep." },
    { icon: FaTint,      title: "Cut caffeine & alcohol",   body: "Both disrupt hormonal regulation. Switch to water, herbal tea, and anti-inflammatory drinks." },
  ],
};

function getRiskTier(probability) {
  if (probability < 35) return "low";
  if (probability < 65) return "moderate";
  return "high";
}

function getRiskMeta(riskLevel, probability) {
  const tier = getRiskTier(probability);
  const map = {
    low:      { label: "Low risk",      color: "#10B981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: FaCheckCircle },
    moderate: { label: "Moderate risk", color: "#F59E0B", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   icon: FaExclamationTriangle },
    high:     { label: "High risk",     color: "#EF4444", bg: "bg-red-50",     text: "text-red-700",     border: "border-red-200",     icon: FaTimesCircle },
  };
  return { ...map[tier], tier };
}

/* ── Donut chart (pure SVG/Canvas-free) ── */
function DonutChart({ probability, color }) {
  const size = 180;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (probability / 100) * circ;
  const cx = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#F3F4F6" strokeWidth={stroke} />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-semibold text-gray-900">{probability}<span className="text-lg">%</span></span>
        <span className="text-xs text-gray-400 mt-0.5">probability</span>
      </div>
    </div>
  );
}

/* ── Segmented bar ── */
function RiskBar({ probability }) {
  return (
    <div className="w-full">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gray-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
          style={{
            width: `${probability}%`,
            background: probability < 35
              ? "#10B981"
              : probability < 65
              ? "#F59E0B"
              : "#EF4444",
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-gray-400">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}

function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const probability = state?.probability || 0;
  const riskLevel   = state?.riskLevel   || "Low";
  const prediction  = state?.prediction  || 0;

  const meta = getRiskMeta(riskLevel, probability);
  const recs = RECOMMENDATIONS[meta.tier];
  const RiskIcon = meta.icon;

  const detected = prediction === 1;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft size={12} />
          </button>
          <div>
            <h1 className="text-[15px] font-semibold text-gray-900">Assessment result</h1>
            <p className="text-xs text-gray-400 mt-0.5">PCOS prediction analysis</p>
          </div>
        </header>

        <main className="px-8 py-7 max-w-5xl w-full mx-auto space-y-5">

          {/* ── Result summary row ── */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* Donut + risk level */}
            <div className="md:col-span-1 bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-5">
              <DonutChart probability={probability} color={meta.color} />
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${meta.bg} ${meta.text} ${meta.border}`}>
                <RiskIcon size={11} />
                {meta.label}
              </div>
              <RiskBar probability={probability} />
            </div>

            {/* Prediction details */}
            <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-4">Prediction summary</p>

                <div className={`inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border mb-6 ${detected ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
                  {detected
                    ? <FaTimesCircle size={18} className="text-red-500" />
                    : <FaCheckCircle size={18} className="text-emerald-500" />
                  }
                  <div>
                    <p className={`text-[15px] font-semibold ${detected ? "text-red-700" : "text-emerald-700"}`}>
                      {detected ? "PCOS detected" : "No PCOS detected"}
                    </p>
                    <p className={`text-xs mt-0.5 ${detected ? "text-red-400" : "text-emerald-400"}`}>
                      Based on your submitted health data
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <p className="text-[11px] text-gray-400 mb-1.5">Risk level</p>
                    <p className={`text-[20px] font-semibold ${meta.text}`}>{riskLevel}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                    <p className="text-[11px] text-gray-400 mb-1.5">Probability score</p>
                    <p className="text-[20px] font-semibold text-gray-900">{probability}%</p>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mt-5 leading-relaxed border-t border-gray-100 pt-4">
                This result is generated by an AI model and is not a medical diagnosis. Please consult a qualified healthcare professional for clinical advice.
              </p>
            </div>

          </div>

          {/* ── Dynamic recommendations ── */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[14px] font-semibold text-gray-900">Personalised recommendations</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Tailored to your {meta.label.toLowerCase()} result</p>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${meta.bg} ${meta.text} ${meta.border}`}>
                {recs.length} actions
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {recs.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-3.5 p-4 rounded-lg border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-white transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg} border ${meta.border}`}>
                    <Icon size={13} className={meta.text} />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-gray-800">{title}</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </DashboardLayout>
  );
}

export default Results;