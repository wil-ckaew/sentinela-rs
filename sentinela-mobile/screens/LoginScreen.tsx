import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { login } from "../services/api";
import { saveToken } from "../storage/auth";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const data = await login(email, password);
    await saveToken(data.token);
    onLogin();
  }

  return (
    <View style={{ padding: 40 }}>
      <Text style={{ fontSize: 22 }}>🔐 Sentinela Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
