import { View, StyleSheet } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { MetricCard } from "@/components/metric-card";
import { Screen } from "@/components/screen";

export default function ProgressScreen() {
  return (
    <Screen>
      <View style={styles.grid}>
        <MetricCard label="Tempo estudado" value="0h" />
        <MetricCard label="Nota media" value="--" />
      </View>
      <View style={styles.panel}>
        <Text variant="titleMedium">Conteudo concluido</Text>
        <ProgressBar progress={0} color="#0f766e" />
        <Text>0%</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12
  },
  panel: {
    gap: 12,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  }
});
