// src/screens/MovieDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/index';
import { movies } from '../data/movies';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen({ route }: Props) {
  const { id } = route.params;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/300x200' }}
        style={styles.poster}
      />

      <Text style={styles.rating}>Rating: {movie.rating}</Text>

      <Text style={styles.categories}>{movie.categories.join(', ')}</Text>

      <Text style={styles.description}>
        A young developer uncovers hidden secrets inside a legacy codebase.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
  },
  poster: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categories: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#374151',
  },
});
