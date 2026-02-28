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

// ダークテーマに合わせた洗練されたカラーパレット
const COLOR_PALETTE: Record<string, string> = {
  temperature_2m: "#06b6d4", // cyan-500
  temperature_2m_max: "#0ea5e9", // sky-500
  temperature_2m_min: "#3b82f6", // blue-500
  apparent_temperature: "#8b5cf6", // violet-500
  precipitation: "#14b8a6", // teal-500
  precipitation_sum: "#06b6d4", // cyan-500
  windspeed_10m: "#a78bfa", // purple-400
  windspeed_10m_max: "#c4b5fd", // purple-300
};

// カスタムツールチップコンポーネント
const CustomTooltip = ({
  active,
  payload,
  label,
  period,
  unitSystem,
}: {
  active?: boolean;
  payload?: any[];
  label?: any;
  period: "hourly" | "daily";
  unitSystem: "metric" | "imperial";
}) => {
  if (!active || !payload) return null;

  const d = parseISO(label);
  const dateStr =
    period === "hourly"
      ? format(d, "yyyy-MM-dd HH:mm")
      : format(d, "yyyy-MM-dd");

  return (
    <div className="bg-slate-900/95 border border-slate-600 rounded-lg p-3 shadow-2xl">
      <p className="text-gray-200 text-sm font-semibold mb-2">{dateStr}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-gray-100 text-sm">
          <span style={{ color: entry.color }} className="font-bold">
            {LABEL_MAP[entry.dataKey] || entry.dataKey}
          </span>
          :{" "}
          <span className="font-semibold">
            {typeof entry.value === "number"
              ? entry.value.toFixed(1)
              : entry.value}{" "}
            {UNIT_MAP[entry.dataKey]
              ? UNIT_MAP[entry.dataKey][unitSystem]
              : ""}
          </span>
        </p>
      ))}
    </div>
  );
};

export default function WeatherChart({
  data,
  metrics,
  period,
  unitSystem,
}: Props) {
  if (!data || data.length === 0 || metrics.length === 0) {
    return (
      <div className="w-full p-6 bg-gradient-to-br from-slate-800/50 via-slate-800/50 to-blue-900/50 rounded-xl border border-slate-700 text-center">
        <p className="text-gray-300">表示するデータがありません。</p>
      </div>
    );
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
    <div className="w-full max-w-3xl mx-auto h-96 bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 rounded-xl p-4 shadow-2xl border border-blue-800 overflow-visible flex justify-center">
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          data={data}
          // reduce left/bottom margins to tighten spacing
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* ダークテーマ対応のグリッド */}
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#4b5563"
            opacity={0.5}
            vertical={false}
          />

          {/* X軸 */}
          <XAxis
            dataKey="time"
            stroke="#475569"
            tick={{ fill: "#cbd5e1", fontSize: 12 }}
            axisLine={{ stroke: "#334155", strokeWidth: 1 }}
            tickFormatter={(str) => {
              const d = parseISO(str);
              return period === "hourly"
                ? format(d, "M/d H:mm")
                : format(d, "M/d");
            }}
          />

          {/* Y軸 */}
          <YAxis
            stroke="#475569"
            tick={{ fill: "#cbd5e1", fontSize: 12, textAnchor: "end" }}
            axisLine={{ stroke: "#334155", strokeWidth: 1 }}
            // margin.left on LineChart is sufficient to keep numbers visible
            domain={["dataMin", "dataMax"]}
          />

          {/* カスタムツールチップ */}
          <Tooltip
            content={
              <CustomTooltip
                period={period}
                unitSystem={unitSystem}
              />
            }
            cursor={{ stroke: "#94a3b8", opacity: 0.5 }}
          />

          {/* 凡例（チャート下部へ移動） */}
          <Legend
            verticalAlign="bottom"
            align="right"
            wrapperStyle={{
                paddingRight: "20px",
                paddingTop: "1px",
                marginTop: "16px", // グラフとの間隔を追加
                backgroundColor: "rgba(15, 23, 42, 0.8)",  // 半透明ダーク青
                border: "1px solid #475569",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.3)",
            }}
          />


          {/* データ線 */}
          {keys.map((key) => (
            <Line
              key={key}
              dataKey={key}
              stroke={COLOR_PALETTE[key] || "#06b6d4"}
              dot={false}
              strokeWidth={2.5}
              type="monotone"
              isAnimationActive={true}
              animationDuration={400}
              name={LABEL_MAP[key] || key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
