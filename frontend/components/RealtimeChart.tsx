"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function RealtimeChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const id = setInterval(async () => {
      const res = await fetch("http://localhost:8000/analyze");
      const alerts = await res.json();

      setData(prev => [
        ...prev.slice(-15),
        {
          time: new Date().toLocaleTimeString(),
          count: alerts.length,
        },
      ]);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line dataKey="count" />
    </LineChart>
  );
}
