const selectCls = "w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-400 focus:bg-white text-gray-800 transition-colors";

function Step2Menstrual({ formData, setFormData }) {
  const set = (key) => (e) => setFormData({ ...formData, [key]: Number(e.target.value) });

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Do you have regular menstrual cycles?</label>
        <select value={formData.Regular_Menstrual_Cycles || ""} onChange={set("Regular_Menstrual_Cycles")} className={selectCls}>
          <option value="">Select an option</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">How often do you miss or delay periods?</label>
        <select value={formData.Miss_or_Delay_Periods || ""} onChange={set("Miss_or_Delay_Periods")} className={selectCls}>
          <option value="">Select frequency</option>
          <option value="0">Never</option>
          <option value="1">Rarely</option>
          <option value="2">Sometimes</option>
          <option value="3">Often</option>
        </select>
      </div>

    </div>
  );
}

export default Step2Menstrual;