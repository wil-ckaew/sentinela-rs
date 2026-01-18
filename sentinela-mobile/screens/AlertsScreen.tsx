import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";
import { getToken } from "../storage/auth";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    getToken().then(token => {
      if (!token) return;

      connectSocket(token, (data) => {
        setAlerts(prev => [data.message, ...prev]);
      });
    });

    return () => disconnectSocket();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>🚨 Alertas em Tempo Real</Text>

      {alerts.map((a, i) => (
        <Text key={i} style={{ color: "red" }}>
          ⚠️ {a}
        </Text>
      ))}
    </View>
  );
}
