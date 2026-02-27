export type City = { name: string; lat: number; lon: number };
export type Period = "hourly" | "daily";
export type UnitSystem = "metric" | "imperial";

type FetchParams = {
  city: City;
  period: Period;
  metrics: string[];
  unitSystem: UnitSystem;
};

export type WeatherResponse = {
  hourly?: Record<string, any>;
  daily?: Record<string, any>;
};

// helper to build query string
function buildUrl({ city, period, metrics, unitSystem }: FetchParams) {
  const base = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams();
  params.set("latitude", city.lat.toString());
  params.set("longitude", city.lon.toString());
  params.set("timezone", "auto");

  // units
  if (unitSystem === "imperial") {
    params.set("temperature_unit", "fahrenheit");
    params.set("windspeed_unit", "mph");
    params.set("precipitation_unit", "inch");
  } else {
    params.set("temperature_unit", "celsius");
    params.set("windspeed_unit", "kmh");
    params.set("precipitation_unit", "mm");
  }

  if (period === "hourly") {
    if (metrics.length > 0) {
      params.set("hourly", metrics.join(","));
    }
    // limit 48h by start/end
    const now = new Date();
    const start = now.toISOString().slice(0, 10);
    const end = new Date(now.getTime() + 48 * 3600 * 1000)
      .toISOString()
      .slice(0, 10);
    params.set("start_date", start);
    params.set("end_date", end);
  } else {
    // daily
    // map metrics to daily equivalents
    const dailyMap: Record<string, string | string[]> = {
      temperature_2m: ["temperature_2m_max", "temperature_2m_min"],
      precipitation: "precipitation_sum",
      windspeed_10m: "windspeed_10m_max",
      // apparent_temperature has no daily, skip
    };
    const dailyMetrics: string[] = [];
    metrics.forEach((m) => {
      const v = dailyMap[m];
      if (v) {
        if (Array.isArray(v)) {
          dailyMetrics.push(...v);
        } else {
          dailyMetrics.push(v);
        }
      }
    });
    if (dailyMetrics.length) {
      params.set("daily", dailyMetrics.join(","));
    }
  }

  return base + "?" + params.toString();
}

export async function fetchWeather({
  city,
  period,
  metrics,
  unitSystem,
}: FetchParams): Promise<WeatherResponse> {
  const url = buildUrl({ city, period, metrics, unitSystem });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await res.json();
  return data;
}
