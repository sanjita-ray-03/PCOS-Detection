const FIELDS = [
  { key: "Family_History_PCOS",      label: "Family history of PCOS",   desc: "Mother, sister, or close female relative",
    options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }] },
  { key: "Diabetes_or_Prediabetes",  label: "Diabetes or prediabetes",  desc: "Diagnosed or borderline blood sugar",
    options: [{ v: "1", l: "Yes" }, { v: "0", l: "No" }] },
  { key: "Infertility_Problem",      label: "Infertility problems",     desc: "Difficulty conceiving or fertility treatment",
    options: [{ v: "0", l: "No" }, { v: "1", l: "Not applicable" }, { v: "2", l: "Yes" }] },
];

const selectCls = "w-full px-3.5 py-2 text-[12px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-violet-400 text-gray-800 transition-colors mt-2";

function Step5Medical({ formData, setFormData }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {FIELDS.map(({ key, label, desc, options }) => (
        <div key={key} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-gray-200 transition-colors">
          <p className="text-[12px] font-medium text-gray-800">{label}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
          <select
            value={formData[key] ?? ""}
            onChange={(e) => setFormData({ ...formData, [key]: Number(e.target.value) })}
            className={selectCls}
          >
            <option value="">Select</option>
            {options.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

export default Step5Medical;