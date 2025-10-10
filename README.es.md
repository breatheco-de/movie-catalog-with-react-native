<!-- hide -->
# Catálogo de Películas con Expo Router
<!-- endhide -->

<p align="center">
  <img height="450" src="https://github.com/breatheco-de/movie-catalog-with-react-native/blob/main/assets/img-movies-app.png?raw=true" alt="RN Movies Preview" />
</p>

Crea una aplicación móvil que permita explorar un **catálogo de películas**, ver **detalles** y navegar entre **categorías**, practicando **navegación con Expo Router** usando **Tabs** y **Stack**. El proyecto usa **datos locales** para enfocarse en la **navegación y el tipado de parámetros**.

<onlyfor saas="false" withBanner="false">
  
## 🌱 Cómo comenzar este proyecto

1. Clona la siguiente plantilla en tu computadora

```bash
https://github.com/4GeeksAcademy/react-native-hello
```

2. Instala dependencias

```bash
npm install
```

3. Inicia el proyecto con Expo

```bash
npm run start
```

- **iOS Simulator (macOS):** presiona `i` o usa `npm run ios`
- **Android Emulator:** presiona `a` o usa `npm run android`
- **Web:** presiona `w` o usa `npm run web`
- **Si tu teléfono no conecta por LAN:** `npx expo start --tunnel`

</onlyfor>


## 🗂️ Estructura del proyecto

```
rn-movies/
├─ app/
│  ├─ _layout.tsx                 # Layout raíz → delega a (tabs)
│  ├─ (tabs)/
│  │  ├─ _layout.tsx              # Definición de Tabs
│  │  ├─ home/
│  │  │  ├─ _layout.tsx           # Stack del tab Home
│  │  │  ├─ index.tsx             # Lista de películas
│  │  │  └─ [id].tsx              # Detalle (ruta dinámica)
│  │  ├─ categories/
│  │  │  ├─ _layout.tsx           # Stack de Categorías
│  │  │  ├─ index.tsx             # Lista de categorías
│  │  │  └─ [category].tsx        # Películas por categoría
│  │  └─ favorites/
│  │     ├─ _layout.tsx           # Stack de Favoritos
│  │     └─ index.tsx             # Placeholder (sin estado global)
│  └─ +not-found.tsx              # 404 opcional
├─ components/
│  ├─ MovieCard.tsx
│  └─ Grid.tsx
├─ data/
│  └─ movies.ts                   # Mock local (sin API)
├─ types/
│  └─ index.ts                    # Tipos compartidos
├─ app.json
├─ package.json
└─ tsconfig.json
```


## 📝 Instrucciones
- Implementa **Tabs + Stack** con Expo Router.
- Usa **rutas dinámicas** para el detalle (`[id].tsx`).
- Pasa **parámetros tipados** con `useLocalSearchParams`.
- Debes crear el archivo `data/movies.ts` dentro de tu proyecto y definir allí una lista local de películas (un arreglo de objetos). Cada película debe incluir propiedades como: `id`, `title`, `year`, `categories` y `rating`.
- No uses fetch ni APIs externas.


## 💡 Tips
- Los **params llegan como cadena**: convierte a `number` cuando lo necesites.
- Personaliza `options` del Stack para **headers dinámicos**.
- Mantén los componentes **pequeños y reutilizables** (`MovieCard`, `Grid`).

