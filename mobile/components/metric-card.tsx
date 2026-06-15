import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text variant="labelMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="headlineSmall">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 88,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  label: {
    color: "#64748b"
  }
});
