import { SafeAreaView,View, FlatList, Pressable, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/index';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={movies}
        keyExtractor={(m) => String(m.id)}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('MovieDetail', { id: item.id, title: item.title })
            }
          >
            <MovieCard movie={item} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}


interface Styles {
  safeArea: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  listContent: ViewStyle;
  separator: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  listContent: {
    backgroundColor: '#ffffff',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
    marginLeft: 16 + 52 + 12,
  },
});