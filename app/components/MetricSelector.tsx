'use client';

import React from 'react';

interface Props {
  metrics: string[];
  onChange: (metrics: string[]) => void;
  period: 'hourly' | 'daily';
}

const AVAILABLE_METRICS: {
  key: string;
  label: string;
  dailyAllowed: boolean;
}[] = [
  { key: 'temperature_2m', label: '気温', dailyAllowed: true },
  { key: 'apparent_temperature', label: '体感温度', dailyAllowed: false },
  { key: 'precipitation', label: '降水量', dailyAllowed: true },
  { key: 'windspeed_10m', label: '風速', dailyAllowed: true },
];

export default function MetricSelector({ metrics, onChange, period }: Props) {
  const handleToggle = (key: string) => {
    if (metrics.includes(key)) {
      onChange(metrics.filter((m) => m !== key));
    } else {
      onChange([...metrics, key]);
    }
  };

  return (
    <fieldset className="flex flex-col">
      <legend className="mb-2 font-medium text-slate-200 text-sm">
        📈 指標
      </legend>
      <div className="space-y-2">
        {AVAILABLE_METRICS.map((m) => {
          const disabled = period === 'daily' && !m.dailyAllowed;
          return (
            <label
              key={m.key}
              className={`inline-flex items-center p-2 rounded-lg transition ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-slate-700/50 cursor-pointer'
              }`}
            >
              <input
                type="checkbox"
                disabled={disabled}
                checked={metrics.includes(m.key)}
                onChange={() => handleToggle(m.key)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-2"
              />
              <span
                className={`ml-2 text-sm ${
                  disabled ? 'text-slate-500' : 'text-slate-200'
                }`}
              >
                {m.label}
              </span>
            </label>
          );
        })}
      </div>
      {period === 'daily' && (
        <p className="text-xs text-slate-400 mt-2">
          ℹ️ 体感温度は日次データにありません
        </p>
      )}
    </fieldset>
  );
}
