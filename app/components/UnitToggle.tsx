"use client";

import React from "react";

interface Props {
  unitSystem: "metric" | "imperial";
  onChange: (u: "metric" | "imperial") => void;
}

export default function UnitToggle({ unitSystem, onChange }: Props) {
  return (
    <div className="flex items-center">
      <span className="mr-2 font-medium">単位</span>
      <select
        value={unitSystem}
        onChange={(e) => onChange(e.target.value as "metric" | "imperial")}
        className="border rounded px-2 py-1"
      >
        <option value="metric">℃ / km/h / mm</option>
        <option value="imperial">°F / mph / in</option>
      </select>
    </div>
  );
}
