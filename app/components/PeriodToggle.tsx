"use client";

import React from "react";

interface Props {
  period: "hourly" | "daily";
  onChange: (p: "hourly" | "daily") => void;
}

export default function PeriodToggle({ period, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <span className="mb-2 font-medium text-slate-200 text-sm">⏱️ 期間</span>
      <div className="inline-flex rounded-lg border border-slate-600 overflow-hidden">
        <button
          className={`px-4 py-2 transition font-medium text-sm ${
            period === "hourly"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
          onClick={() => onChange("hourly")}
        >
          48時間
        </button>
        <button
          className={`px-4 py-2 transition font-medium text-sm ${
            period === "daily"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
          onClick={() => onChange("daily")}
        >
          7日間
        </button>
      </div>
    </div>
  );
}
