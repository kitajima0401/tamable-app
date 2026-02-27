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
      <label htmlFor="city" className="mb-1 font-medium">
        都市
      </label>
      <select
        id="city"
        className="border rounded px-2 py-1"
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
