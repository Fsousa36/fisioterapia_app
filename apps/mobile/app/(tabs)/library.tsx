import { FlatList, View, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Searchbar, Text } from "react-native-paper";
import { useState } from "react";
import { api } from "@/lib/api";
import { Screen } from "@/components/screen";

export default function LibraryScreen() {
  const [query, setQuery] = useState("");
  const articles = useQuery({
    queryKey: ["articles", query],
    queryFn: async () => {
      const response = await api.get("/articles", { params: { q: query || undefined } });
      return response.data;
    }
  });

  return (
    <Screen>
      <Searchbar placeholder="Buscar artigos e diretrizes" value={query} onChangeText={setQuery} />
      <FlatList
        data={articles.data ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text numberOfLines={3}>{item.abstract ?? "Resumo indisponivel."}</Text>
            <Text style={styles.source}>{item.source}</Text>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingTop: 16
  },
  card: {
    gap: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  source: {
    color: "#0f766e"
  }
});
