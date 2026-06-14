import { FlatList, StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chip, Searchbar, Text } from "react-native-paper";
import { api } from "@/lib/api";
import { Screen } from "@/components/screen";

type AtlasTopic = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  clinicalArea: string;
  bodyRegion: string | null;
  population: string | null;
  tags: string[];
  evidenceLevel: string;
  recommendation: string;
  _count?: {
    clinicalQuestions: number;
    outcomes: number;
    interventions: number;
    articles: number;
    guidelines: number;
  };
};

export default function AtlasScreen() {
  const [query, setQuery] = useState("");
  const atlas = useQuery({
    queryKey: ["atlas"],
    queryFn: async () => (await api.get<AtlasTopic[]>("/atlas")).data
  });

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return atlas.data ?? [];

    return (atlas.data ?? []).filter((topic) => {
      const searchable = [
        topic.title,
        topic.summary,
        topic.clinicalArea,
        topic.bodyRegion ?? "",
        topic.population ?? "",
        ...topic.tags
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(normalized);
    });
  }, [atlas.data, query]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text variant="headlineSmall">Atlas de Pesquisa</Text>
        <Text style={styles.muted}>
          Perguntas PICO, niveis de evidencia, intervencoes e desfechos para consulta clinica.
        </Text>
      </View>
      <Searchbar placeholder="Buscar condicao, intervencao ou desfecho" value={query} onChangeText={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.chips}>
              <Chip compact>{item.clinicalArea}</Chip>
              <Chip compact>{item.evidenceLevel}</Chip>
              <Chip compact>{item.recommendation}</Chip>
            </View>
            <Text variant="titleMedium">{item.title}</Text>
            <Text numberOfLines={4}>{item.summary}</Text>
            <View style={styles.metrics}>
              <Metric label="PICO" value={item._count?.clinicalQuestions ?? 0} />
              <Metric label="Desfechos" value={item._count?.outcomes ?? 0} />
              <Metric label="Interv." value={item._count?.interventions ?? 0} />
              <Metric label="Refs." value={(item._count?.articles ?? 0) + (item._count?.guidelines ?? 0)} />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.muted}>Nenhum topico encontrado. Verifique se a API esta rodando e se o seed foi executado.</Text>
          </View>
        }
      />
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text variant="titleMedium">{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6,
    marginBottom: 12
  },
  muted: {
    color: "#64748b"
  },
  list: {
    gap: 12,
    paddingTop: 16,
    paddingBottom: 24
  },
  card: {
    gap: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },
  metrics: {
    flexDirection: "row",
    gap: 8
  },
  metric: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    padding: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0"
  },
  metricLabel: {
    color: "#64748b",
    fontSize: 11
  },
  empty: {
    paddingTop: 24
  }
});
