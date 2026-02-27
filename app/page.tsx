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
  } = useQuery(
    queryKey,
    () => fetchWeather({ city, period, metrics, unitSystem }),
    {
      enabled: metrics.length > 0,
      staleTime: 1000 * 60 * 5,
    }
  );

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">天気予報ダッシュボード</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <CitySelector cities={CITY_LIST} value={city} onChange={setCity} />
        <MetricSelector
          metrics={metrics}
          onChange={setMetrics}
          period={period}
        />
        <PeriodToggle period={period} onChange={setPeriod} />
        <UnitToggle unitSystem={unitSystem} onChange={setUnitSystem} />
      </div>
      {isLoading && <LoadingSpinner />}
      {isError && (
        <ErrorMessage
          message="データ取得中にエラーが発生しました。"
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !isError && metrics.length > 0 && (
        <WeatherChart
          data={chartData}
          metrics={metrics}
          period={period}
          unitSystem={unitSystem}
        />
      )}
      {metrics.length === 0 && (
        <p className="text-center text-gray-500">
          まず指標を選択してください。
        </p>
      )}
      <footer className="mt-6 text-center text-sm text-gray-500">
        Data from Open‑Meteo
      </footer>
    </div>
  );
}
