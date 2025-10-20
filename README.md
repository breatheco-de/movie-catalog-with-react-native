<!-- hide -->
# Movie Catalog
<!-- endhide -->

<p align="center">
    <img height="450" src="https://github.com/breatheco-de/movie-catalog-with-react-native/blob/main/assets/img-movies-app.png?raw=true" alt="RN Movies Preview" />
</p>

Create a mobile app to explore a **movie catalog**, view **details**, and navigate between **categories**, practicing **navigation with React Navigation** using **Bottom Tabs** and **Native Stack**.

The project uses **local data** (no API) to focus on **navigation architecture**, **parameter typing**, and **screen composition**.

<onlyfor saas="false" withBanner="false">

## 🌱 How to start this project

1. Clone the following template to your computer:

```bash
https://github.com/4GeeksAcademy/react-native-cli-hello
```

2. Install JS dependencies:

```bash
npm install
```

3. (macOS/iOS only) Install CocoaPods:

```bash
cd ios
bundle install        # optional if you use Bundler
bundle exec pod install || pod install
cd ..
```

4. Start Metro (development server):

```bash
npx react-native start --reset-cache
```

5. Build and run the app:
- **Android**
    ```bash
    npm run android
    ```
- **iOS (macOS)**
    ```bash
    npm run ios
    ```

</onlyfor>

## 📦 Navigation dependencies

Install React Navigation and native dependencies (if not already in `package.json`):

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

In `App.tsx`, wrap your navigators with `NavigationContainer`:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigator from './src/navigation/TabsNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <TabsNavigator />
        </NavigationContainer>
    );
}
```

---

## 🗂️ Suggested project structure

```
├─ src/
│  ├─ navigation/
│  │  ├─ TabsNavigator.tsx         # Main tabs
│  │  └─ StackNavigator.tsx        # Stack for details and internal routes
│  ├─ screens/
│  │  ├─ HomeScreen.tsx            # Movie list
│  │  ├─ MovieDetailScreen.tsx     # Detail (receives typed params)
│  │  ├─ CategoriesScreen.tsx      # Category list
│  │  └─ CategoryMoviesScreen.tsx  # Movies filtered by category
│  ├─ components/
│  │  ├─ MovieCard.tsx
│  │  └─ Grid.tsx
│  ├─ data/
│  │  └─ movies.ts                 # Local mock (no API)
│  └─ types/
│     └─ index.ts                  # Shared types (Movie, Route params, etc.)
├─ App.tsx
├─ package.json
└─ tsconfig.json
```

## 📝 Instructions

1. Implement **Tabs + Stack** with **React Navigation**:
     - Create `TabsNavigator.tsx` for the **Home**, **Categories**, and **Favorites** tabs.
     - Inside the **Home** tab, mount a **Stack** that navigates to `MovieDetailScreen`.

2. Create the file `src/data/movies.ts` with local data:

     ```ts
     export type Movie = {
         id: number;
         title: string;
         year: number;
         categories: string[];
         rating: number; // 0–10
     };

     export const movies: Movie[] = [
         { id: 1, title: 'Inception', year: 2010, categories: ['Sci-Fi', 'Action'], rating: 8.8 },
         { id: 2, title: 'Interstellar', year: 2014, categories: ['Sci-Fi', 'Drama'], rating: 8.6 },
         // ...
     ];
     ```

3. Use **typed routes/params** in the Stack:
     - Define navigation types (e.g., `RootStackParamList`) in `src/types/index.ts`.
     - When navigating to the detail, send the movie `id` and retrieve it in `MovieDetailScreen`.

4. **Do not use `fetch` or external APIs**: everything comes from `movies.ts`.

## Navigator skeleton (example)

**`src/navigation/StackNavigator.tsx`**
```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Movies' }}
            />
            <Stack.Screen
                name="MovieDetail"
                component={MovieDetailScreen}
                options={({ route }) => ({ title: route.params?.title ?? 'Detail' })}
            />
        </Stack.Navigator>
    );
}
```

**`src/navigation/TabsNavigator.tsx`**
```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

type TabsParamList = {
    Feed: undefined;        // Will contain the Stack (Home + Detail)
    Categories: undefined;
    Favorites: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={StackNavigator}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
            />
        </Tab.Navigator>
    );
}
```

**`src/types/index.ts`**
```ts
export type RootStackParamList = {
    Home: undefined;
    MovieDetail: { id: number; title?: string };
};
```

## 🖥️ Screen skeletons (example)

**`src/screens/HomeScreen.tsx`**
```tsx
import { View, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={movies}
                keyExtractor={(m) => String(m.id)}
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
        </View>
    );
}
```

**`src/screens/MovieDetailScreen.tsx`**

```tsx
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { movies } from '../data/movies';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

export default function MovieDetailScreen({ route }: Props) {
    const { id } = route.params;
    const movie = movies.find((m) => m.id === id);

    if (!movie) return <Text style={{ padding: 16 }}>Movie not found</Text>;

    return (
        <View style={{ flex: 1, padding: 16, gap: 6 }}>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>{movie.title}</Text>
            <Text>Year: {movie.year}</Text>
            <Text>Categories: {movie.categories.join(', ')}</Text>
            <Text>Rating: {movie.rating}</Text>
        </View>
    );
}
```

## 💡 Tips

- **Params** are usually handled as **strict types** with `NativeStackScreenProps` and a `ParamList`.
- Customize Stack `options` for **dynamic headers** (e.g., use the movie title in the detail).
- Keep components **small and reusable** (`MovieCard`, `Grid`).
- If your params come as **string** (e.g., from inputs), convert them to `number` before searching for movies.

