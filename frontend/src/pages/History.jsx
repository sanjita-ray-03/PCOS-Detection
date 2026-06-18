import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { FaClipboardList, FaChevronUp, FaChevronDown, FaSearch } from "react-icons/fa";

const RISK_STYLE = {
  Low:      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border border-amber-200",
  High:     "bg-red-50 text-red-700 border border-red-200",
};

const DETECTION_STYLE = {
  1: { label: "Detected",     cls: "bg-red-50 text-red-600 border border-red-200" },
  0: { label: "Not detected", cls: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
};

function History() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/assessment/history");
      setRecords(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = records
    .filter(r =>
      (r.riskLevel?.toLowerCase().includes(search.toLowerCase())) ||
      (r.createdAt?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <FaChevronDown size={9} className="text-gray-300" />;
    return sortDir === "asc"
      ? <FaChevronUp size={9} className="text-violet-500" />
      : <FaChevronDown size={9} className="text-violet-500" />;
  };

  const cols = [
    { key: "createdAt",   label: "Date" },
    { key: "prediction",  label: "Detection" },
    { key: "riskLevel",   label: "Risk level" },
    { key: "probability", label: "Probability" },
    { key: "bmi",         label: "BMI" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4">
          <h1 className="text-[15px] font-semibold text-gray-900">Assessment history</h1>
          <p className="text-xs text-gray-400 mt-0.5">All your previous PCOS evaluations</p>
        </header>

        <main className="px-8 py-7 max-w-5xl w-full mx-auto">

          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: "Total assessments", value: records.length },
              { label: "High risk results",  value: records.filter(r => r.riskLevel === "High").length },
              { label: "Latest risk",        value: records[0]?.riskLevel || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
                <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <FaClipboardList size={13} className="text-violet-500" />
                {filtered.length} record{filtered.length !== 1 ? "s" : ""}
              </div>
              <div className="relative">
                <FaSearch size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search records…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 text-[12px] border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-violet-300 focus:bg-white w-48 transition-colors"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {cols.map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          {label}
                          <SortIcon col={key} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-[13px] text-gray-400">
                        No records found.
                      </td>
                    </tr>
                  ) : filtered.map((r, i) => {
                    const det = DETECTION_STYLE[r.prediction] ?? { label: "—", cls: "text-gray-400" };
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 text-[12px] text-gray-500 whitespace-nowrap">
                          {r.createdAt
                            ? new Date(r.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                            : "—"}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${det.cls}`}>
                            {det.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${RISK_STYLE[r.riskLevel] ?? "bg-gray-100 text-gray-500"}`}>
                            {r.riskLevel ?? "—"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 max-w-[80px] h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${r.probability ?? 0}%`,
                                  background: (r.probability ?? 0) < 35 ? "#10B981" : (r.probability ?? 0) < 65 ? "#F59E0B" : "#EF4444",
                                }}
                              />
                            </div>
                            <span className="text-[12px] font-medium text-gray-700">{r.probability ?? "—"}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[12px] font-medium text-gray-700">
                          {r.bmi ?? "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default History;