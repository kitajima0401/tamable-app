"use client";

import React from "react";

interface Props {
  metrics: string[];
  onChange: (metrics: string[]) => void;
  period: "hourly" | "daily";
}

const AVAILABLE_METRICS: { key: string; label: string; dailyAllowed: boolean }[] = [
  { key: "temperature_2m", label: "気温", dailyAllowed: true },
  { key: "apparent_temperature", label: "体感温度", dailyAllowed: false },
  { key: "precipitation", label: "降水量", dailyAllowed: true },
  { key: "windspeed_10m", label: "風速", dailyAllowed: true },
];

export default function MetricSelector({
  metrics,
  onChange,
  period,
}: Props) {
  const handleToggle = (key: string) => {
    if (metrics.includes(key)) {
      onChange(metrics.filter((m) => m !== key));
    } else {
      onChange([...metrics, key]);
    }
  };

  return (
    <fieldset className="flex flex-col">
      <legend className="mb-1 font-medium">指標</legend>
      {AVAILABLE_METRICS.map((m) => {
        const disabled = period === "daily" && !m.dailyAllowed;
        return (
          <label key={m.key} className="inline-flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              disabled={disabled}
              checked={metrics.includes(m.key)}
              onChange={() => handleToggle(m.key)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className={disabled ? "text-gray-400 ml-1" : "ml-1"}>
              {m.label}
            </span>
          </label>
        );
      })}
      {period === "daily" && (
        <p className="text-xs text-gray-500">
          ※体感温度は日次データにありません
        </p>
      )}
    </fieldset>
  );
}
