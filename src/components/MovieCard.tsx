import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';


export interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <View style={styles.container}>
      {movie.posterUrl ? (
        <Image source={{ uri: movie.posterUrl }} style={styles.poster} />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        {movie.year && (
          <Text style={styles.yearText}>
            {movie.year}
          </Text>
        )}

      </View>
      <Text style={styles.chevron}>›</Text>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  poster: ImageStyle;
  posterPlaceholder: ViewStyle;
  infoContainer: ViewStyle;
  title: TextStyle;
  yearText: TextStyle;
  genresText: TextStyle;
  chevron: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  poster: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  posterPlaceholder: {
    backgroundColor: '#d4d4d8',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  yearText: {
    fontSize: 13,
    color: '#4b5563',
    marginBottom: 2,
  },
  genresText: {
    fontSize: 13,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
    marginLeft: 4,
  },
});

export default MovieCard;
