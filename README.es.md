<!-- hide -->
# Catálogo de Películas
<!-- endhide -->

<p align="center">
  <img height="450" src="https://github.com/breatheco-de/movie-catalog-with-react-native/blob/main/assets/img-movies-app.png?raw=true" alt="RN Movies Preview" />
</p>

Crea una aplicación móvil para explorar un **catálogo de películas**, ver **detalles** y navegar entre **categorías**, practicando **navegación con React Navigation** usando **Bottom Tabs** y **Native Stack**.  

El proyecto usa **datos locales** (sin API) para enfocarse en la **arquitectura de navegación**, el **tipado de parámetros** y la **composición de pantallas**.

<onlyfor saas="false" withBanner="false">
  
## 🌱 Cómo comenzar este proyecto

1. Clona la siguiente plantilla en tu computadora

```bash
https://github.com/breatheco-de/react-native-cli-hello
```

2. Instala dependencias JS:

```bash
npm install
```

3. (Solo macOS/iOS) Instala CocoaPods:

```bash
cd ios
bundle install        # opcional si usas Bundler
bundle exec pod install || pod install
cd ..
```

4. Inicia Metro (servidor de desarrollo):

```bash
npx react-native start --reset-cache
```

5. Compila y ejecuta la app:
- **Android**
  ```bash
  npm run android
  ```
- **iOS (macOS)**
  ```bash
  npm run ios
  ```

</onlyfor>


## 📦 Dependencias de navegación

Instala React Navigation y dependencias nativas (si no están ya en `package.json`):

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

En `App.tsx` envuelve tus navegadores con `NavigationContainer`:

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

## 🗂️ Estructura sugerida del proyecto

```
├─ src/
│  ├─ navigation/
│  │  ├─ TabsNavigator.tsx         # Tabs principales
│  │  └─ StackNavigator.tsx        # Stack para detalles y rutas internas
│  ├─ screens/
│  │  ├─ HomeScreen.tsx            # Lista de películas
│  │  ├─ MovieDetailScreen.tsx     # Detalle (recibe params tipados)
│  │  ├─ CategoriesScreen.tsx      # Lista de categorías
│  │  └─ CategoryMoviesScreen.tsx  # Películas filtradas por categoría
│  ├─ components/
│  │  ├─ MovieCard.tsx
│  │  └─ Grid.tsx
│  ├─ data/
│  │  └─ movies.ts                 # Mock local (sin API)
│  └─ types/
│     └─ index.ts                  # Tipos compartidos (Movie, Route params, etc.)
├─ App.tsx
├─ package.json
└─ tsconfig.json
```

## 📝 Instrucciones

1. Implementa **Tabs + Stack** con **React Navigation**:
   - Crea `TabsNavigator.tsx` para las pestañas **Home**, **Categories** y **Favorites**.
   - Dentro del tab **Home**, monta un **Stack** que navegue a `MovieDetailScreen`.

2. Crea el archivo `src/data/movies.ts` con datos locales:

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

3. Usa **rutas/params tipados** en el Stack:
   - Define los tipos de navegación (por ejemplo `RootStackParamList`) en `src/types/index.ts`.
   - Al navegar al detalle, envía el `id` de la película y recupéralo en `MovieDetailScreen`.

4. **No uses `fetch` ni APIs externas**: todo sale de `movies.ts`.


## Esqueleto de navegadores (ejemplo)

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
  Feed: undefined;        // Contendrá el Stack (Home + Detail)
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


## 🖥️ Esqueleto de pantallas (ejemplo)

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

- Los **params** suelen manejarse como **tipos estrictos** con `NativeStackScreenProps` y una `ParamList`.  
- Personaliza `options` del Stack para **headers dinámicos** (por ejemplo, usar el título de la película en el detalle).  
- Mantén componentes **pequeños y reutilizables** (`MovieCard`, `Grid`).  
- Si tus params llegan como **string** (por ej., desde inputs), conviértelos a `number` antes de buscar películas.


