import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { Screen } from "@/components/screen";

const features = ["IA academica", "Flashcards", "Simulados", "Download offline"];

export default function PremiumScreen() {
  return (
    <Screen>
      <View style={styles.panel}>
        <Text variant="headlineSmall">Premium</Text>
        {features.map((feature) => (
          <Text key={feature}>- {feature}</Text>
        ))}
        <Button mode="contained">Ativar Premium</Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  }
});
