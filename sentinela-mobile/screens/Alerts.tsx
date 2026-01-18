import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { connect } from "../services/socket";

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    connect(data => setAlerts(a => [data, ...a]));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>🚨 Alertas</Text>
      {alerts.map((a, i) => (
        <Text key={i} style={{ color: "red" }}>
          {a.message}
        </Text>
      ))}
    </View>
  );
}
