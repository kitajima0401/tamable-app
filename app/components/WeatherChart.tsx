"use client";

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

interface Props {
  data: any[];
  metrics: string[];
  period: "hourly" | "daily";
  unitSystem: "metric" | "imperial";
}

const LABEL_MAP: Record<string, string> = {
  temperature_2m: "気温",
  temperature_2m_max: "最高気温",
  temperature_2m_min: "最低気温",
  apparent_temperature: "体感温度",
  precipitation: "降水量",
  precipitation_sum: "降水量",
  windspeed_10m: "風速",
  windspeed_10m_max: "最大風速",
};

const UNIT_MAP: Record<string, { metric: string; imperial: string }> = {
  temperature_2m: { metric: "℃", imperial: "°F" },
  temperature_2m_max: { metric: "℃", imperial: "°F" },
  temperature_2m_min: { metric: "℃", imperial: "°F" },
  apparent_temperature: { metric: "℃", imperial: "°F" },
  precipitation: { metric: "mm", imperial: "in" },
  precipitation_sum: { metric: "mm", imperial: "in" },
  windspeed_10m: { metric: "km/h", imperial: "mph" },
  windspeed_10m_max: { metric: "km/h", imperial: "mph" },
};

export default function WeatherChart({
  data,
  metrics,
  period,
  unitSystem,
}: Props) {
  if (!data || data.length === 0 || metrics.length === 0) {
    return <p className="p-4">表示するデータがありません。</p>;
  }

  // determine keys to plot (for daily temperature may expand)
  const keys: string[] = [];
  metrics.forEach((m) => {
    if (period === "daily") {
      if (m === "temperature_2m") {
        keys.push("temperature_2m_max", "temperature_2m_min");
      } else if (m === "precipitation") {
        keys.push("precipitation_sum");
      } else if (m === "windspeed_10m") {
        keys.push("windspeed_10m_max");
      }
      // skip apparent
    } else {
      keys.push(m);
    }
  });

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(str) => {
              const d = parseISO(str);
              return period === "hourly"
                ? format(d, "M/d H:mm")
                : format(d, "M/d");
            }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => {
              const d = parseISO(label);
              return period === "hourly"
                ? format(d, "yyyy-MM-dd HH:mm")
                : format(d, "yyyy-MM-dd");
            }}
            formatter={(value: any, name: string) => {
              const unit = UNIT_MAP[name]
                ? UNIT_MAP[name][unitSystem]
                : "";
              return [value, `${LABEL_MAP[name] || name} (${unit})`];
            }}
          />
          <Legend />
          {keys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              stroke={
                // simple color selection
                key.includes("temp")
                  ? "#ff7300"
                  : key.includes("precip")
                  ? "#387908"
                  : key.includes("wind")
                  ? "#8884d8"
                  : "#000"
              }
              dot={false}
              strokeWidth={2}
              type="monotone"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
