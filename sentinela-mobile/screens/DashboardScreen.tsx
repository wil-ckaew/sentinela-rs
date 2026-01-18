import { View, Text, Dimensions, Button } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";
import { analyzeLogs } from "../services/api";
import { getToken, logout } from "../storage/auth";

export default function DashboardScreen({ onLogout }: any) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getToken().then(token => {
      if (!token) return;

      analyzeLogs(token, ["erro", "falha critica", "ok", "ok"]).then(setData);
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>📊 Dashboard IA</Text>

      {data && (
        <>
          <LineChart
            data={{
              labels: ["Logs", "Anomalias"],
              datasets: [{
                data: [data.total_logs, data.anomalies_detected]
              }]
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#000",
              color: () => "#00ff99"
            }}
          />

          <Text>Total logs: {data.total_logs}</Text>
          <Text>Anomalias: {data.anomalies_detected}</Text>
        </>
      )}

      <Button title="Logout" onPress={async () => {
        await logout();
        onLogout();
      }} />
    </View>
  );
}
