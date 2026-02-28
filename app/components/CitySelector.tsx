"use client";

import React from "react";
import { City } from "../lib/weather";

interface Props {
  cities: City[];
  value: City;
  onChange: (city: City) => void;
}

export default function CitySelector({ cities, value, onChange }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="city" className="mb-2 font-medium text-slate-200 text-sm">
        🏙️ 都市
      </label>
      <select
        id="city"
        className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        value={value.name}
        onChange={(e) => {
          const selected = cities.find((c) => c.name === e.target.value);
          if (selected) onChange(selected);
        }}
      >
        {cities.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
