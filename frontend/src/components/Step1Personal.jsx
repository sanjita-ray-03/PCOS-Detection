function Step1Personal({ formData, setFormData }) {
  const set = (key) => (e) => setFormData({ ...formData, [key]: Number(e.target.value) });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Weight <span className="text-gray-400 font-normal">(kg)</span></label>
        <div className="relative">
          <input
            type="number"
            value={formData.Weight_kg || ""}
            onChange={set("Weight_kg")}
            placeholder="e.g. 58"
            className="w-full px-3.5 py-2.5 text-[13px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-400 focus:bg-white text-gray-800 transition-colors placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium pointer-events-none">kg</span>
        </div>
      </div>
    </div>
  );
}

export default Step1Personal;