import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Button, Text } from "react-native-paper";
import { api } from "@/lib/api";
import { Screen } from "@/components/screen";

export default function TracksScreen() {
  const tracks = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => (await api.get("/learning/tracks")).data
  });

  return (
    <Screen>
      <FlatList
        data={tracks.data ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleLarge">{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.modules?.length ?? 0} modulos</Text>
            <Button mode="contained">Continuar</Button>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12
  },
  card: {
    gap: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  }
});
