const inputCls  = "w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-400 focus:bg-white text-gray-800 transition-colors placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const selectCls = "w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-400 focus:bg-white text-gray-800 transition-colors";

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
        {label} {hint && <span className="text-gray-400 font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Step4Lifestyle({ formData, setFormData }) {
  const set = (key) => (e) => setFormData({ ...formData, [key]: Number(e.target.value) });

  return (
    <div className="space-y-4">

      <Field label="Sleep hours" hint="(per night)">
        <div className="relative">
          <input
            type="number" min="0" max="24"
            value={formData.Sleep_Hours || ""}
            onChange={set("Sleep_Hours")}
            placeholder="e.g. 7"
            className={`${inputCls} pr-10`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 pointer-events-none">hrs</span>
        </div>
      </Field>

      <Field label="Sleep quality">
        <select value={formData.Sleep_Quality || ""} onChange={set("Sleep_Quality")} className={selectCls}>
          <option value="">Select quality</option>
          <option value="1">Poor</option>
          <option value="2">Average</option>
          <option value="3">Good</option>
        </select>
      </Field>

      <Field label="Anxiety or low mood" hint="(how often?)">
        <select value={formData.Anxiety_or_Low_Mood || ""} onChange={set("Anxiety_or_Low_Mood")} className={selectCls}>
          <option value="">Select frequency</option>
          <option value="0">Never</option>
          <option value="1">Rarely</option>
          <option value="2">Sometimes</option>
          <option value="3">Often</option>
        </select>
      </Field>

    </div>
  );
}

export default Step4Lifestyle;