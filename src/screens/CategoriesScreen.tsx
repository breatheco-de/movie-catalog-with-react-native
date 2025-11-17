// src/screens/CategoriesScreen.tsx
import React from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import { movies } from '../data/movies';

const allCategories = Array.from(
  new Set(movies.flatMap((m) => m.categories)),
);

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <FlatList
        data={allCategories}
        keyExtractor={(c) => c}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.categoryText}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
    marginLeft: 16,
  },
});
