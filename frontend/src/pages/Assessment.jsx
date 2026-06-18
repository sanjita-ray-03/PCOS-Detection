import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeartbeat, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";

import api from "../services/api";
import Step1Personal from "../components/Step1Personal";
import Step2Menstrual from "../components/Step2Menstrual";
import Step3Symptoms from "../components/Step3Symptoms";
import Step4Lifestyle from "../components/Step4Lifestyle";
import Step5Medical from "../components/Step5Medical";

const STEPS = [
  { id: 1, label: "Personal",  sublabel: "Basic info"     },
  { id: 2, label: "Menstrual", sublabel: "Cycle health"   },
  { id: 3, label: "Symptoms",  sublabel: "Recent signs"   },
  { id: 4, label: "Lifestyle", sublabel: "Daily habits"   },
  { id: 5, label: "Medical",   sublabel: "Health history" },
];

const STEP_TITLES = {
  1: { title: "Personal information",  sub: "Tell us about your basic health metrics." },
  2: { title: "Menstrual health",      sub: "Help us understand your cycle patterns."  },
  3: { title: "Symptoms assessment",   sub: "Select any symptoms you have experienced recently." },
  4: { title: "Lifestyle habits",      sub: "Your daily routine impacts hormonal health."  },
  5: { title: "Medical information",   sub: "Please answer honestly for the most accurate prediction." },
};

function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const nextStep = () => { if (step < 5) setStep(s => s + 1); };
  const prevStep = () => { if (step > 1) setStep(s => s - 1); };

  const submitForm = async () => {
    setSubmitting(true);
    try {
      const response = await api.post("/assessment/predict", formData);
      navigate("/results", { state: response.data });
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const { title, sub } = STEP_TITLES[step];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Brand bar */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
            <FaHeartbeat size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-gray-900 leading-tight">PCOS Detection</p>
            <p className="text-[11px] text-gray-400">Health Monitor</p>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

          {/* Step tracker */}
          <div className="px-8 pt-7 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-0">
              {STEPS.map((s, i) => {
                const done    = step > s.id;
                const active  = step === s.id;
                const pending = step < s.id;
                return (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                        ${done    ? "bg-violet-600 text-white"
                        : active  ? "bg-violet-600 text-white ring-4 ring-violet-100"
                        : "bg-gray-100 text-gray-400"}`}
                      >
                        {done ? <FaCheckCircle size={14} /> : s.id}
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className={`text-[11px] font-medium leading-tight ${active ? "text-violet-600" : done ? "text-gray-600" : "text-gray-400"}`}>
                          {s.label}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-tight">{s.sublabel}</p>
                      </div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-[2px] mx-2 mb-5 rounded-full transition-all duration-300 ${done ? "bg-violet-600" : "bg-gray-100"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div className="px-8 py-7">
            <div className="mb-6">
              <h2 className="text-[16px] font-semibold text-gray-900">{title}</h2>
              <p className="text-[12px] text-gray-400 mt-1">{sub}</p>
            </div>

            {step === 1 && <Step1Personal formData={formData} setFormData={setFormData} />}
            {step === 2 && <Step2Menstrual formData={formData} setFormData={setFormData} />}
            {step === 3 && <Step3Symptoms formData={formData} setFormData={setFormData} />}
            {step === 4 && <Step4Lifestyle formData={formData} setFormData={setFormData} />}
            {step === 5 && <Step5Medical formData={formData} setFormData={setFormData} />}
          </div>

          {/* Navigation */}
          <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="text-[12px] text-gray-400">
              Step <span className="font-medium text-gray-600">{step}</span> of 5
            </div>
            <div className="flex gap-2.5">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-[13px] text-gray-600 font-medium hover:bg-white transition-colors"
                >
                  <FaChevronLeft size={10} /> Previous
                </button>
              )}
              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[13px] font-medium transition-colors"
                >
                  Next <FaChevronRight size={10} />
                </button>
              ) : (
                <button
                  onClick={submitForm}
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[13px] font-medium transition-colors disabled:opacity-70"
                >
                  {submitting ? "Analysing…" : "Submit & predict"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Health tip */}
        <div className="bg-white rounded-xl border border-gray-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-base">💡</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-gray-700 mb-1">Daily health tip</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">
                Women with PCOS often benefit from consistent exercise, balanced meals, stress management, and 7–9 hours of quality sleep. Small daily improvements can have a significant positive impact on hormonal balance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Assessment;