"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CitySelector from "./components/CitySelector";
import MetricSelector from "./components/MetricSelector";
import PeriodToggle from "./components/PeriodToggle";
import UnitToggle from "./components/UnitToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherChart from "./components/WeatherChart";
import { City, Period, UnitSystem, fetchWeather } from "./lib/weather";

const CITY_LIST: City[] = [
  { name: "東京", lat: 35.6895, lon: 139.6917 },
  { name: "大阪", lat: 34.6937, lon: 135.5011 },
  { name: "札幌", lat: 43.0667, lon: 141.35 },
  { name: "福岡", lat: 33.6, lon: 130.42 },
  { name: "那覇", lat: 26.2124, lon: 127.6809 },
];

export default function Home() {
  const [city, setCity] = useState<City>(CITY_LIST[0]);
  const [metrics, setMetrics] = useState<string[]>([]);
  const [period, setPeriod] = useState<Period>("hourly");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");

  // persist selections
  useEffect(() => {
    try {
      const raw = localStorage.getItem("weatherPrefs");
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj.city) {
          const found = CITY_LIST.find((c) => c.name === obj.city.name);
          if (found) setCity(found);
        }
        if (Array.isArray(obj.metrics)) setMetrics(obj.metrics);
        if (obj.period) setPeriod(obj.period);
        if (obj.unitSystem) setUnitSystem(obj.unitSystem);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const toSave = { city, metrics, period, unitSystem };
    localStorage.setItem("weatherPrefs", JSON.stringify(toSave));
  }, [city, metrics, period, unitSystem]);

  const queryKey = [
    "weather",
    city.name,
    city.lat,
    city.lon,
    period,
    unitSystem,
    metrics.slice().sort().join(","),
  ];
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => fetchWeather({ city, period, metrics, unitSystem }),
    enabled: metrics.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  // transform raw data into chart-friendly array
  const chartData: any[] = [];
  if (data) {
    const times: string[] =
      period === "hourly"
        ? data.hourly?.time || []
        : data.daily?.time || [];
    for (let i = 0; i < times.length; i++) {
      const entry: any = { time: times[i] };
      if (period === "hourly" && data.hourly) {
        metrics.forEach((m) => {
          entry[m] = data.hourly![m]?.[i];
        });
      }
      if (period === "daily" && data.daily) {
        metrics.forEach((m) => {
          if (m === "temperature_2m") {
            entry["temperature_2m_max"] =
              data.daily!["temperature_2m_max"]?.[i];
            entry["temperature_2m_min"] =
              data.daily!["temperature_2m_min"]?.[i];
          } else if (m === "precipitation") {
            entry["precipitation_sum"] =
              data.daily!["precipitation_sum"]?.[i];
          } else if (m === "windspeed_10m") {
            entry["windspeed_10m_max"] =
              data.daily!["windspeed_10m_max"]?.[i];
          }
        });
      }
      chartData.push(entry);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
            天気予報ダッシュボード
          </h1>
          <p className="text-slate-300 text-sm">リアルタイム天気データで正確な予報をお届けします</p>
        </div>

        <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-6 mb-6 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">設定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CitySelector cities={CITY_LIST} value={city} onChange={setCity} />
            <MetricSelector
              metrics={metrics}
              onChange={setMetrics}
              period={period}
            />
            <PeriodToggle period={period} onChange={setPeriod} />
            <UnitToggle unitSystem={unitSystem} onChange={setUnitSystem} />
          </div>
        </div>

        {isLoading && <LoadingSpinner />}
        {isError && (
          <ErrorMessage
            message="データ取得中にエラーが発生しました。"
            onRetry={() => refetch()}
          />
        )}
        {!isLoading && !isError && metrics.length > 0 && (
          <div className="mb-6">
            <WeatherChart
              data={chartData}
              metrics={metrics}
              period={period}
              unitSystem={unitSystem}
            />
          </div>
        )}
        {metrics.length === 0 && !isLoading && !isError && (
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-xl p-8 text-center">
            <p className="text-slate-300 text-lg">
              📊 まず指標を選択してください。
            </p>
          </div>
        )}

        <footer className="mt-8 pt-6 border-t border-slate-700/50 text-center text-sm text-slate-400">
          Data from Open-Meteo
        </footer>
      </div>
    </div>
  );
}
