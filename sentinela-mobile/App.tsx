import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function App() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://10.0.2.2:8080/alerts")
      .then(res => res.json())
      .then(setAlerts);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Sentinela</Text>
      <FlatList
        data={alerts}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.level}: {item.message}</Text>
        )}
      />
    </View>
  );
}
