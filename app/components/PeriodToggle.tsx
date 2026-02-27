"use client";

import React from "react";

interface Props {
  period: "hourly" | "daily";
  onChange: (p: "hourly" | "daily") => void;
}

export default function PeriodToggle({ period, onChange }: Props) {
  return (
    <div className="flex items-center">
      <span className="mr-2 font-medium">期間</span>
      <button
        className={`px-3 py-1 rounded-l border border-r-0 ${
          period === "hourly" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => onChange("hourly")}
      >
        48時間
      </button>
      <button
        className={`px-3 py-1 rounded-r border ${
          period === "daily" ? "bg-blue-500 text-white" : "bg-white"
        }`}
        onClick={() => onChange("daily")}
      >
        7日間
      </button>
    </div>
  );
}
