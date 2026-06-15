import { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Button, Text, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { api } from "@/lib/api";
import { Screen } from "@/components/screen";
import { useSessionStore } from "@/store/session-store";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const [error, setError] = useState<string | null>(null);
  const setUser = useSessionStore((state) => state.setUser);
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" }
  });

  async function onSubmit(values: LoginForm) {
    setError(null);
    const response = await api.post("/auth/login", values).catch(() => null);

    if (!response) {
      setError("Email ou senha invalidos.");
      return;
    }

    await SecureStore.setItemAsync("accessToken", response.data.accessToken);
    setUser(response.data.user);
    router.replace("/(tabs)/library");
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text variant="headlineMedium">FisioBase Academy</Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              label="Senha"
              secureTextEntry
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
          )}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Entrar
        </Button>
        <Button mode="outlined">Continuar com Google</Button>
        <Button mode="outlined">Continuar com Apple</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16
  },
  error: {
    color: "#b91c1c"
  }
});
