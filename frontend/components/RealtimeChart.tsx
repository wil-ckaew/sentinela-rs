"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function RealtimeChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(-10),
        { time: new Date().toLocaleTimeString(), value: Math.random() * 100 },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#ff0000" />
    </LineChart>
  );
}
