const FIELDS = [
  { key: "Acne_or_Pimples",          label: "Acne or pimples",           desc: "Persistent breakouts on face or body" },
  { key: "Hair_Fall_or_Thinning",     label: "Hair fall or thinning",     desc: "Noticeable hair loss or scalp thinning" },
  { key: "Dark_Patches",              label: "Dark patches on skin",      desc: "Darkening around neck, armpits, or groin" },
  { key: "Recent_Weight_Gain",        label: "Recent weight gain",        desc: "Unexplained gain in the last few months" },
  { key: "Difficult_to_Lose_Weight",  label: "Difficult to lose weight",  desc: "Struggling despite diet and exercise" },
];

const selectCls = "w-full px-3.5 py-2 text-[12px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-violet-400 text-gray-800 transition-colors mt-2";

function Step3Symptoms({ formData, setFormData }) {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {FIELDS.map(({ key, label, desc }) => (
        <div key={key} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-gray-200 transition-colors">
          <p className="text-[12px] font-medium text-gray-800">{label}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
          <select
            value={formData[key] ?? ""}
            onChange={(e) => setFormData({ ...formData, [key]: Number(e.target.value) })}
            className={selectCls}
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Step3Symptoms;