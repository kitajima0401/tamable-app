"use client";

import React from "react";

interface Props {
  unitSystem: "metric" | "imperial";
  onChange: (u: "metric" | "imperial") => void;
}

export default function UnitToggle({ unitSystem, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="unit" className="mb-2 font-medium text-slate-200 text-sm">
        ⚙️ 単位
      </label>
      <select
        id="unit"
        value={unitSystem}
        onChange={(e) => onChange(e.target.value as "metric" | "imperial")}
        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
      >
        <option value="metric">℃ / km/h / mm</option>
        <option value="imperial">°F / mph / in</option>
      </select>
    </div>
  );
}
