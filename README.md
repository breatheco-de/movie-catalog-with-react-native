<!-- hide -->
# Movie Catalog with Expo Router
<!-- endhide -->

<p align="center">
    <img height="450" src="https://github.com/breatheco-de/movie-catalog-with-react-native/blob/main/assets/img-movies-app.png?raw=true" alt="RN Movies Preview" />
</p>

Create a mobile app to explore a **movie catalog**, view **details**, and navigate between **categories**, practicing **navigation with Expo Router** using **Tabs** and **Stack**. The project uses **local data** to focus on **navigation and parameter typing**.

<onlyfor saas="false" withBanner="false">
    
## 🌱 How to start this project

1. Clone the following template to your computer

```bash
https://github.com/4GeeksAcademy/react-native-hello
```

2. Install dependencies

```bash
npm install
```

3. Start the project with Expo

```bash
npm run start
```

- **iOS Simulator (macOS):** press `i` or use `npm run ios`
- **Android Emulator:** press `a` or use `npm run android`
- **Web:** press `w` or use `npm run web`
- **If your phone can't connect via LAN:** `npx expo start --tunnel`

</onlyfor>


## 🗂️ Project Structure

```
rn-movies/
├─ app/
│  ├─ _layout.tsx                 # Root layout → delegates to (tabs)
│  ├─ (tabs)/
│  │  ├─ _layout.tsx              # Tabs definition
│  │  ├─ home/
│  │  │  ├─ _layout.tsx           # Home tab stack
│  │  │  ├─ index.tsx             # Movie list
│  │  │  └─ [id].tsx              # Detail (dynamic route)
│  │  ├─ categories/
│  │  │  ├─ _layout.tsx           # Categories stack
│  │  │  ├─ index.tsx             # Category list
│  │  │  └─ [category].tsx        # Movies by category
│  │  └─ favorites/
│  │     ├─ _layout.tsx           # Favorites stack
│  │     └─ index.tsx             # Placeholder (no global state)
│  └─ +not-found.tsx              # Optional 404
├─ components/
│  ├─ MovieCard.tsx
│  └─ Grid.tsx
├─ data/
│  └─ movies.ts                   # Local mock (no API)
├─ types/
│  └─ index.ts                    # Shared types
├─ app.json
├─ package.json
└─ tsconfig.json
```


## 📝 Instructions
- Implement **Tabs + Stack** with Expo Router.
- Use **dynamic routes** for details (`[id].tsx`).
- Pass **typed parameters** with `useLocalSearchParams`.
- You must create the file `data/movies.ts` in your project and define a local list of movies (an array of objects). Each movie should include properties like: `id`, `title`, `year`, `categories`, and `rating`.
- Do not use fetch or external APIs.


## 💡 Tips
- **Params arrive as strings**: convert to `number` when needed.
- Customize Stack `options` for **dynamic headers**.
- Keep components **small and reusable** (`MovieCard`, `Grid`).

