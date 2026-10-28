# Contexto Completo del Proyecto CV-CREATOR-APP


================================================
ðŸ“„ ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

example

# generated native folders
/ios
/android


================================================
ðŸ“„ ARCHIVO: AGENTS.md
================================================

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


================================================
ðŸ“„ ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "Artelier",
    "slug": "app-api-deber4",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "appapideber4",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}


================================================
ðŸ“„ ARCHIVO: dist\metadata.json
================================================

{"version":0,"bundler":"metro","fileMetadata":{"android":{"bundle":"_expo/static/js/android/entry-b7bb296939fa187c8820c131b74e61d8.hbc","assets":[{"path":"assets\\51b6ad87261f18b6433ec52871ddfabc","ext":"ttf"},{"path":"assets\\a5f35888d2da465de352e0dcfaf33324","ext":"ttf"},{"path":"assets\\9116faa12b7016e93277294c7a0735b6","ext":"ttf"},{"path":"assets\\f083d3d233c60977fde5d857afec24e8","ext":"ttf"},{"path":"assets\\0a328cd9c1afd0afe8e3b1ec5165b1b4","ext":"png"},{"path":"assets\\778ffc9fe8773a878e9c30a6304784de","ext":"png"},{"path":"assets\\c79c3606a1cf168006ad3979763c7e0c","ext":"png"},{"path":"assets\\02bc1fa7c0313217bde2d65ccbff40c9","ext":"png"},{"path":"assets\\35ba0eaec5a4f5ed12ca16fabeae451d","ext":"png"},{"path":"assets\\3cd68ccdb8938e3711da2e8831b85493","ext":"png"},{"path":"assets\\61ca7e64b7d605716c57706cef640b9a","ext":"png"},{"path":"assets\\aff2c65b39a296d4f7e96d0f58169170","ext":"png"},{"path":"assets\\d8e7601e3df962f83c62371ac14964d8","ext":"png"},{"path":"assets\\0747a1317bbe9c6fc340b889ef8ab3ae","ext":"png"},{"path":"assets\\d84e297c3b3e49a614248143d53e40ca","ext":"png"},{"path":"assets\\1190ab078c57159f4245a328118fcd9a","ext":"png"},{"path":"assets\\78c625386b4d0690b421eb0fc78f7b9c","ext":"png"},{"path":"assets\\4403c6117ec30c859bc95d70ce4a71d3","ext":"png"},{"path":"assets\\069d99eb1fa6712c0b9034a58c6b57dd","ext":"png"},{"path":"assets\\c3273c9e5321f20d1e42c2efae2578c4","ext":"png"},{"path":"assets\\286d67d3f74808a60a78d3ebf1a5fb57","ext":"png"},{"path":"assets\\6b4f0c2d698edccb36b0f132059c0205","ext":"ttf"},{"path":"assets\\d1ea1496f9057eb392d5bbf3732a61b7","ext":"png"},{"path":"assets\\98a4e3d00dbf5d65da99a69b38a7def2","ext":"xml"},{"path":"assets\\9b5cb09b4e669ed0f28f3b3f2871a0a5","ext":"xml"},{"path":"assets\\19eeb73b9593a38f8e9f418337fc7d10","ext":"png"},{"path":"assets\\ab19f4cbc543357183a20571f68380a3","ext":"png"},{"path":"assets\\d8b800c443b8972542883e0b9de2bdc6","ext":"png"},{"path":"assets\\412dd9275b6b48ad28f5e3d81bb1f626","ext":"png"},{"path":"assets\\017bc6ba3fc25503e5eb5e53826d48a8","ext":"png"},{"path":"assets\\20e71bdf79e3a97bf55fd9e164041578","ext":"png"},{"path":"assets\\5ee5db91d59518c45ebcc99a2f5afc57","ext":"png"},{"path":"assets\\dbca075a49dc45e550c5d2e3e9601039","ext":"png"},{"path":"assets\\eeb5de2ac12ace75b31dfda235208956","ext":"png"},{"path":"assets\\456346cfb0b82cc0f39e921e05d082d9","ext":"png"},{"path":"assets\\5d86e963002b3664ab81c128c838559d","ext":"png"},{"path":"assets\\8409922f7d5c981001e3c9b25e4bfae5","ext":"png"},{"path":"assets\\dd40200ba8e8d98061578292d6b73791","ext":"png"},{"path":"assets\\c4278d79298bb11a8b0e68ed3e40da9e","ext":"png"},{"path":"assets\\02efb8472f161bcf8afc8c8489a28fca","ext":"png"},{"path":"assets\\6b0da8ec880685d1bd053c0f5ea9d09d","ext":"png"},{"path":"assets\\c62d22797f3002396754d8cc55b0ae1a","ext":"png"},{"path":"assets\\695d5a1c6f29a689130f3aaa573aec6e","ext":"png"},{"path":"assets\\b507e7f2c91ebc8fe24dee79ccb3b600","ext":"png"},{"path":"assets\\8a4d0e5b845044e56e3b2df627d01cfd","ext":"png"}]}}}

================================================
ðŸ“„ ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
ðŸ“„ ARCHIVO: package.json
================================================

{
  "name": "app-api-deber4",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo-google-fonts/inter": "^0.4.2",
    "@expo-google-fonts/playfair-display": "^0.4.2",
    "@expo/ui": "~58.0.23",
    "@expo/vector-icons": "^15.0.2",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@tanstack/query-async-storage-persister": "^5.104.5",
    "@tanstack/react-query": "^5.104.5",
    "@tanstack/react-query-persist-client": "^5.104.5",
    "@types/react": "~19.3.0",
    "expo": "^58.0.0",
    "expo-constants": "~58.0.13",
    "expo-device": "~58.0.5",
    "expo-font": "~58.0.10",
    "expo-glass-effect": "~58.0.5",
    "expo-image": "~58.0.17",
    "expo-linking": "~58.0.14",
    "expo-network": "~58.0.4",
    "expo-router": "~58.0.26",
    "expo-splash-screen": "~58.0.11",
    "expo-status-bar": "~58.0.4",
    "expo-symbols": "~58.0.4",
    "expo-system-ui": "~58.0.6",
    "expo-web-browser": "~58.0.6",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "react-native": "0.88.0",
    "react-native-gesture-handler": "~3.3.0",
    "react-native-reanimated": "4.7.1",
    "react-native-safe-area-context": "~5.10.1",
    "react-native-screens": "~4.30.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.13.0"
  },
  "devDependencies": {
    "@types/react": "~19.3.0",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}


================================================
ðŸ“„ ARCHIVO: README.md
================================================

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


================================================
ðŸ“„ ARCHIVO: scripts\reset-project.js
================================================

#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /src and /scripts directories to /example based on user input and creates a new /src/app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["src", "scripts"];
const exampleDir = "example";
const newAppDir = "src/app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /src/app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /src/app directory created.");

    // Create index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 src/app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 src/app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit src/app/index.tsx to edit the main screen.\n3. Put all your application code in /src, only screens and layout files should be in /src/app.${
        userInput === "y"
          ? `\n4. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);


================================================
ðŸ“„ ARCHIVO: src\api\artic.ts
================================================

import { ARTIC_API_BASE } from './config';

/**
 * Cliente de la API pública del Art Institute of Chicago (solo lectura).
 *
 * Datos comprobados contra la documentación oficial (https://api.artic.edu/docs):
 *  - `GET /artworks`                -> listado paginado: `page`, `limit`, `fields`.
 *                                       NO acepta `q` (si lo pones, lo ignora).
 *  - `GET /artworks/search?q=...`   -> búsqueda full-text: mismos `page`/`limit`
 *                                       y devuelve también `image_id` si lo pides.
 *  - `GET /artworks/{id}`           -> detalle de una obra.
 *  - Las imágenes NO vienen en la API: se construyen con `config.iiif_url` + `image_id`.
 *
 * El museo limita a 60 peticiones/minuto por IP, por eso pedimos solo los campos
 * que usamos y cacheamos con `staleTime` (10 minutos).
 */

/** Campos que necesita la galería (peticiones ligeras). */
const LIST_FIELDS = [
  'id',
  'title',
  'image_id',
  'artist_display',
  'date_display',
  'medium_display',
  'department_title',
  'is_public_domain',
].join(',');

/** Campos extra que solo se piden en el detalle. */
const DETAIL_FIELDS = [
  ...LIST_FIELDS.split(','),
  'description',
  'place_of_origin',
  'credit_line',
  'classification_title',
  'api_link',
].join(',');

/** Obras por página (el propio museo usa 12 por defecto). */
export const ARTWORKS_PAGE_SIZE = 12;

/** Tamaños recomendados por el museo: no inventes anchos, usan su caché. */
export const IMAGE_WIDTH_CARD = 400;
export const IMAGE_WIDTH_DETAIL = 843;

/** Respaldo por si alguna respuesta no trae `config.iiif_url`. */
const IIIF_FALLBACK = 'https://www.artic.edu/iiif/2';

/** Límite de la API de búsqueda: no se pueden pedir más de 10.000 registros. */
const SEARCH_MAX_RECORDS = 10_000;

/** Error propio de esta capa, con un mensaje listo para mostrar en pantalla. */
export class ArtApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ArtApiError';
    this.status = status;
  }
}

/** Obra en formato de la app (ya con la URL de la imagen resuelta). */
export interface Artwork {
  /** Siempre string: sirve de key de lista y para las rutas de navegación. */
  id: string;
  title: string;
  /** Solo el primer nombre del `artist_display` (la API trae varias líneas). */
  artist: string | null;
  artistDisplay: string | null;
  date: string | null;
  medium: string | null;
  department: string | null;
  isPublicDomain: boolean;
  /** URL IIIF completa, o `null` si la obra no tiene imagen publicada. */
  imageUrl: string | null;
}

export interface ArtworkDetail extends Artwork {
  /** Texto plano: la API devuelve HTML en `description`. */
  description: string | null;
  placeOfOrigin: string | null;
  creditLine: string | null;
  classification: string | null;
  apiLink: string | null;
}

export interface ArtworkPage {
  items: Artwork[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

/** Respuesta cruda de la API. */
interface RawArtwork {
  id: number;
  title: string | null;
  image_id: string | null;
  artist_display: string | null;
  date_display: string | null;
  medium_display: string | null;
  department_title: string | null;
  is_public_domain?: boolean | null;
  description?: string | null;
  place_of_origin?: string | null;
  credit_line?: string | null;
  classification_title?: string | null;
  api_link?: string | null;
}

interface ArticResponse {
  pagination?: { current_page?: number; total_pages?: number };
  data?: RawArtwork[] | RawArtwork | null;
  config?: { iiif_url?: string };
}

/**
 * Construye la URL de una imagen IIIF.
 * Patrón oficial del museo: `{iiif_url}/{image_id}/full/{ancho},/0/default.jpg`
 */
export function buildImageUrl(
  iiifUrl: string | undefined,
  imageId: string | null | undefined,
  width: number,
): string | null {
  if (!imageId) return null;
  const base = (iiifUrl || IIIF_FALLBACK).replace(/\/+$/, '');
  return `${base}/${imageId}/full/${width},/0/default.jpg`;
}

/** `artist_display` viene con varias líneas: nos quedamos con la primera. */
function firstLine(value: string | null | undefined): string | null {
  if (!value) return null;
  const line = value.split('\n')[0]?.trim();
  return line ? line : null;
}

/** Quita etiquetas HTML y espacios de más del texto del museo. */
function stripHtml(value: string | null | undefined): string | null {
  if (!value) return null;
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text : null;
}

/**
 * Convierte un registro crudo al tipo de la app.
 * @param requireImage si es `true`, descarta las obras sin imagen (la galería
 *        no puede mostrar miniaturas de obras sin `image_id`; en la API hay
 *        más de 10.000 así).
 */
function toArtwork(
  raw: RawArtwork,
  iiifUrl: string | undefined,
  requireImage = true,
): Artwork | null {
  if (requireImage && !raw.image_id) return null;

  return {
    id: String(raw.id),
    title: raw.title?.trim() || 'Sin título',
    artist: firstLine(raw.artist_display),
    artistDisplay: raw.artist_display ?? null,
    date: raw.date_display ?? null,
    medium: raw.medium_display ?? null,
    department: raw.department_title ?? null,
    isPublicDomain: raw.is_public_domain === true,
    imageUrl: buildImageUrl(iiifUrl, raw.image_id, IMAGE_WIDTH_CARD),
  };
}

/** Petición común con manejo de errores: red, estado HTTP y JSON. */
async function request(path: string): Promise<ArticResponse> {
  let response: Response;
  try {
    response = await fetch(`${ARTIC_API_BASE}${path}`);
  } catch {
    throw new ArtApiError(
      'No se pudo conectar con el Art Institute of Chicago. Comprueba tu conexión a internet.',
    );
  }

  if (!response.ok) {
    throw new ArtApiError(
      `El museo respondió con un error ${response.status}. Inténtalo de nuevo.`,
      response.status,
    );
  }

  try {
    return (await response.json()) as ArticResponse;
  } catch {
    throw new ArtApiError('La respuesta del museo no es un JSON válido.');
  }
}

/**
 * Devuelve una página de la galería.
 * @param page número de página (empieza en 1)
 * @param q texto de búsqueda; si está vacío se lista el catálogo completo
 */
export async function fetchArtworks(options: {
  page?: number;
  q?: string;
}): Promise<ArtworkPage> {
  const page = Math.max(1, options.page ?? 1);
  const term = (options.q ?? '').trim().replace(/\s+/g, ' ');

  const path = term
    ? `/artworks/search?q=${encodeURIComponent(term)}&page=${page}&limit=${ARTWORKS_PAGE_SIZE}&fields=${LIST_FIELDS}`
    : `/artworks?page=${page}&limit=${ARTWORKS_PAGE_SIZE}&fields=${LIST_FIELDS}`;

  const json = await request(path);

  const raw = Array.isArray(json.data) ? json.data : [];
  const currentPage = json.pagination?.current_page ?? page;
  const totalPages = json.pagination?.total_pages ?? 1;

  // La búsqueda no permite pasar de 10.000 registros (12 por página = página 833).
  const limitReached = term && currentPage * ARTWORKS_PAGE_SIZE >= SEARCH_MAX_RECORDS;

  return {
    items: raw.flatMap((item) => {
      const artwork = toArtwork(item, json.config?.iiif_url);
      return artwork ? [artwork] : [];
    }),
    page: currentPage,
    totalPages,
    hasMore: currentPage < totalPages && !limitReached,
  };
}

/** Devuelve el detalle completo de una obra por su id. */
export async function fetchArtwork(id: string): Promise<ArtworkDetail> {
  const json = await request(
    `/artworks/${encodeURIComponent(id)}?fields=${DETAIL_FIELDS}`,
  );

  const raw = json.data;
  if (!raw || Array.isArray(raw)) {
    throw new ArtApiError('No encontramos esa obra en la colección.', 404);
  }

  // En el detalle sí mostramos la ficha aunque no haya imagen.
  const artwork = toArtwork(raw, json.config?.iiif_url, false);
  if (!artwork) {
    throw new ArtApiError('No se pudo leer la información de esa obra.');
  }

  return {
    ...artwork,
    description: stripHtml(raw.description),
    placeOfOrigin: raw.place_of_origin ?? null,
    creditLine: raw.credit_line ?? null,
    classification: raw.classification_title ?? null,
    apiLink: raw.api_link ?? null,
  };
}


================================================
ðŸ“„ ARCHIVO: src\api\config.ts
================================================

/**
 * Direcciones base de las dos fuentes de datos de la app.
 *
 * - `ARTIC_API_BASE`: API pública de solo lectura del Art Institute of Chicago.
 * - `MOCKAPI_BASE_URL`: API propia donde se guardan favoritos y notas (etapa 4).
 */
export const ARTIC_API_BASE = 'https://api.artic.edu/api/v1';

export const MOCKAPI_BASE_URL = 'https://6adea4134e88f1bba4a53822.mockapi.io';


================================================
ðŸ“„ ARCHIVO: src\api\mock.ts
================================================

import { MOCKAPI_BASE_URL } from './config';

export class MockApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'MockApiError';
    this.status = status;
  }
}

export interface Favorite {
  id: string;
  artworkId: string;
  title: string;
  artist: string | null;
  imageId: string | null;
  addedAt: string;
}

export interface Note {
  id: string;
  artworkId: string;
  text: string;
  updatedAt: string;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${MOCKAPI_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const message = `MockAPI error ${response.status} ${response.statusText}`;
    throw new MockApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function fetchFavorites(): Promise<Favorite[]> {
  return request<Favorite[]>('/favorites');
}

export async function createFavorite(input: Omit<Favorite, 'id' | 'addedAt'> & { addedAt?: string }): Promise<Favorite> {
  const body = {
    ...input,
    addedAt: input.addedAt ?? new Date().toISOString(),
  };
  return request<Favorite>('/favorites', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function deleteFavorite(id: string): Promise<void> {
  await request<void>(`/favorites/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchNotes(artworkId?: string): Promise<Note[]> {
  if (artworkId) {
    const all = await request<Note[]>('/notes');
    return all.filter((note) => note.artworkId === artworkId);
  }
  return request<Note[]>('/notes');
}

export async function createNote(input: Omit<Note, 'id' | 'updatedAt'> & { updatedAt?: string }): Promise<Note> {
  const body = {
    ...input,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  return request<Note>('/notes', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateNote(id: string, input: Partial<Omit<Note, 'id'>> & { updatedAt?: string }): Promise<Note> {
  const body = {
    ...input,
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  return request<Note>(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function deleteNote(id: string): Promise<void> {
  await request<void>(`/notes/${id}`, {
    method: 'DELETE',
  });
}


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\favorites.tsx
================================================

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";

import { Editorial, Fonts } from "@/constants/editorial";
import { useFavorites, useRemoveFavorite } from "@/queries/useFavorites";
import { buildImageUrl } from "@/api/artic";
import { Platform } from "react-native";

const IMAGE_HEADERS =
  Platform.OS === "web"
    ? undefined
    : {
        Referer: "https://www.artic.edu/",
        "User-Agent": "okhttp/4.12.0",
      };

export default function FavoritesScreen() {
  const { favorites, isLoading, error, refetch } = useFavorites();
  const removeFavorite = useRemoveFavorite();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Favoritos</Text>
        <Text style={[styles.kicker, { fontFamily: Fonts.bodyStrong }]}>Obras guardadas</Text>
        <View style={styles.headerRule} />
      </View>

      {isLoading && favorites.length === 0 ? (
        <View style={styles.stateBlock}>
          <ActivityIndicator size="small" color={Editorial.brass} />
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>Cargando favoritos...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No se pudieron cargar los favoritos</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>{error.message}</Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={[styles.retryText, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
          </Pressable>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No hay favoritos</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>
            Guarda obras desde el catálogo para verlas aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const imageUrl = item.imageId ? buildImageUrl(undefined, item.imageId, 400) : null;
            return (
              <Pressable
                onPress={() => router.push({ pathname: "/artwork_detail", params: { id: item.artworkId } } as any)}
                style={styles.card}
                accessibilityRole="button">
                <View style={styles.imageFrame}>
                  <View style={styles.imageMat}>
                    {imageUrl ? (
                      <Image source={{ uri: imageUrl, headers: IMAGE_HEADERS }} style={styles.image} contentFit="cover" />
                    ) : (
                      <View style={[styles.image, styles.noImage]}>
                        <Text style={styles.noImageText}>Sin imagen</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.artist ? (
                    <Text style={[styles.artist, { fontFamily: Fonts.body }]} numberOfLines={1}>
                      {item.artist}
                    </Text>
                  ) : null}
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFavorite.mutate(item.id);
                    }}
                    disabled={removeFavorite.isPending}
                    style={styles.removeButton}
                    accessibilityRole="button"
                    accessibilityLabel="Quitar de favoritos">
                    <Text style={[styles.removeText, { fontFamily: Fonts.bodyStrong }]}>Quitar de favoritos</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Editorial.paper },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Editorial.rule },
  brand: { color: Editorial.ink, fontFamily: Fonts.displayBold, fontSize: 36, letterSpacing: -0.6 },
  kicker: { color: Editorial.brass, fontSize: 10, letterSpacing: 1.6, marginTop: 4, textTransform: "uppercase" },
  headerRule: { backgroundColor: Editorial.ink, height: 1, marginTop: 14, opacity: 0.9 },
  listContent: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  card: { flexDirection: "row", gap: 12, borderWidth: 1, borderColor: Editorial.rule, padding: 10, backgroundColor: Editorial.paper },
  imageFrame: { width: 90, aspectRatio: 0.75, backgroundColor: Editorial.paper, borderWidth: 1, borderColor: Editorial.rule, padding: 3 },
  imageMat: { flex: 1, overflow: "hidden", backgroundColor: Editorial.paperDeep },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 9 },
  cardContent: { flex: 1, justifyContent: "center", gap: 4 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 15, lineHeight: 18 },
  artist: { color: Editorial.inkSoft, fontSize: 12, lineHeight: 16 },
  removeButton: { marginTop: 6, alignSelf: "flex-start" },
  removeText: { color: Editorial.brass, fontSize: 11 },
  stateBlock: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 10 },
  stateTitle: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 18 },
  stateText: { color: Editorial.inkSoft, fontSize: 14, textAlign: "center" },
  retryButton: { marginTop: 8, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Editorial.rule },
  retryText: { color: Editorial.ink, fontSize: 12 },
});


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\index.tsx
================================================

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ArtworkCard } from "@/components/artwork-card";
import { Editorial, Fonts } from "@/constants/editorial";
import { useArtworks } from "@/queries/useArtworks";

const SUGGESTIONS = ["Monet", "Whistler", "jarrón", "impresionismo"];

export default function GalleryScreen() {
  const [text, setText] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setTerm(text), 450);
    return () => clearTimeout(timer);
  }, [text]);

  const gallery = useArtworks(term);
  const {
    items,
    q,
    isSearching,
    isLoading,
    isLoadingMore,
    isFetching,
    hasMore,
    loadMore,
    error,
    refetch,
  } = gallery;

  const clearSearch = () => {
    setText("");
    setTerm("");
  };

  const statusText = isSearching
    ? isFetching && !isLoadingMore
      ? `Buscando -${q}-...`
      : `-${q}- - ${items.length} ${items.length === 1 ? "obra" : "obras"}`
    : `Obras destacadas - ${items.length} en pantalla`;

  const footer = !items.length ? undefined : isLoadingMore ? (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color={Editorial.brass} />
      <Text style={[styles.footerText, { fontFamily: Fonts.body }]}>Cargando más obras...</Text>
    </View>
  ) : error ? (
    <View style={styles.footer}>
      <Text style={[styles.footerError, { fontFamily: Fonts.body }]}>No se pudieron cargar más obras.</Text>
      <Pressable onPress={() => refetch()} hitSlop={8}>
        <Text style={[styles.footerAction, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
      </Pressable>
    </View>
  ) : hasMore ? (
    <Pressable
      onPress={loadMore}
      style={styles.moreButton}
      accessibilityRole="button"
      accessibilityLabel="Ver más obras">
      <Text style={[styles.moreText, { fontFamily: Fonts.bodyStrong }]}>Ver más</Text>
    </Pressable>
  ) : (
    <View style={styles.endBlock}>
      <View style={styles.endRule} />
      <Text style={[styles.endText, { fontFamily: Fonts.body }]}>Fin de la selección</Text>
      <View style={styles.endRule} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Artelier</Text>
        <Text style={[styles.kicker, { fontFamily: Fonts.bodyStrong }]}>Colección digital - Art Institute of Chicago</Text>
        <View style={styles.headerRule} />

        <View style={styles.searchRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Buscar por título, artista o técnica"
            placeholderTextColor={Editorial.inkSoft}
            style={[styles.search, { fontFamily: Fonts.body }]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            selectionColor={Editorial.brass}
            accessibilityLabel="Buscar obras"
          />
          {text.length > 0 ? (
            <Pressable onPress={clearSearch} hitSlop={10} accessibilityLabel="Borrar búsqueda">
              <Text style={styles.clearText}>X</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={[styles.status, { fontFamily: Fonts.body }]} numberOfLines={1}>
          {statusText}
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => <ArtworkCard artwork={item} index={index} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          items.length === 0 && styles.listEmptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            isLoading={isLoading}
            error={error}
            isSearching={isSearching}
            q={q}
            onRetry={() => refetch()}
          />
        }
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
}

function EmptyState({
  isLoading,
  error,
  isSearching,
  q,
  onRetry,
}: {
  isLoading: boolean;
  error: Error | null;
  isSearching: boolean;
  q: string;
  onRetry: () => void;
}) {
  if (isLoading) {
    return (
      <View style={styles.stateBlock}>
        <ActivityIndicator size="small" color={Editorial.brass} />
        <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>Cargando la colección...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateBlock}>
        <Text style={styles.stateTitle}>No se pudo cargar la galería</Text>
        <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>{error.message}</Text>
        <Pressable onPress={onRetry} style={styles.retryButton} accessibilityRole="button">
          <Text style={[styles.retryText, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (isSearching) {
    return (
      <View style={styles.stateBlock}>
        <Text style={styles.stateTitle}>Sin resultados</Text>
        <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>No encontramos obras para -{q}-.</Text>
        <Text style={[styles.hint, { fontFamily: Fonts.bodyStrong }]}>Prueba con: {SUGGESTIONS.join(" - ")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.stateBlock}>
      <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>La colección no está disponible ahora mismo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Editorial.paper,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Editorial.rule,
  },
  brand: {
    color: Editorial.ink,
    fontFamily: Fonts.displayBold,
    fontSize: 36,
    letterSpacing: -0.6,
  },
  kicker: {
    color: Editorial.brass,
    fontSize: 10,
    letterSpacing: 1.6,
    marginTop: 4,
    textTransform: "uppercase",
  },
  headerRule: {
    backgroundColor: Editorial.ink,
    height: 1,
    marginTop: 14,
    opacity: 0.9,
  },
  searchRow: {
    alignItems: "center",
    borderBottomColor: Editorial.rule,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 14,
    paddingBottom: 4,
  },
  search: {
    color: Editorial.ink,
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
  },
  clearText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 24,
    lineHeight: 26,
    paddingHorizontal: 4,
  },
  status: {
    color: Editorial.inkSoft,
    fontSize: 11,
    letterSpacing: 0.3,
    marginTop: 10,
  },
  listContent: {
    columnGap: 16,
    paddingBottom: 36,
    paddingHorizontal: 20,
    paddingTop: 18,
    rowGap: 26,
  },
  listEmptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  row: {
    columnGap: 16,
  },
  stateBlock: {
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 28,
  },
  stateTitle: {
    color: Editorial.ink,
    fontFamily: Fonts.display,
    fontSize: 21,
    textAlign: "center",
  },
  stateText: {
    color: Editorial.inkSoft,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  hint: {
    color: Editorial.brass,
    fontSize: 11,
    letterSpacing: 0.4,
    textAlign: "center",
  },
  retryButton: {
    borderColor: Editorial.ink,
    borderWidth: 1,
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: {
    color: Editorial.ink,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    paddingVertical: 22,
  },
  footerText: {
    color: Editorial.inkSoft,
    fontSize: 12,
  },
  footerError: {
    color: Editorial.danger,
    fontSize: 12,
    textAlign: "center",
  },
  footerAction: {
    color: Editorial.brass,
    fontSize: 12,
    textDecorationLine: "underline",
  },
  moreButton: {
    alignItems: "center",
    borderColor: Editorial.ink,
    borderWidth: 1,
    marginBottom: 6,
    marginTop: 4,
    paddingVertical: 15,
  },
  moreText: {
    color: Editorial.ink,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  endBlock: {
    alignItems: "center",
    columnGap: 12,
    flexDirection: "row",
    paddingVertical: 26,
  },
  endRule: {
    backgroundColor: Editorial.rule,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  endText: {
    color: Editorial.inkSoft,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\_layout.tsx
================================================


import AppTabs from '@/components/app-tabs';

export default function TabsLayout() {
  return <AppTabs />;
}


================================================
ðŸ“„ ARCHIVO: src\app\artwork_detail.tsx
================================================

import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useArtwork } from "@/queries/useArtworks";
import { Editorial, Fonts } from "@/constants/editorial";
import { useAddFavorite, useFavoriteStatus, useRemoveFavorite } from "@/queries/useFavorites";
import { Platform } from "react-native";

const IMAGE_HEADERS =
  Platform.OS === "web"
    ? undefined
    : {
        Referer: "https://www.artic.edu/",
        "User-Agent": "okhttp/4.12.0",
      };

function extractImageId(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  try {
    const match = imageUrl.match(/\/([a-f0-9-]+)\/full\//i);
    if (match && match[1]) return match[1];
    const parts = imageUrl.split("/");
    const idx = parts.findIndex((p) => p === "iiif" || p === "2");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return null;
}

export default function ArtworkDetailScreen() {
  const params = useLocalSearchParams();
  const artworkId = Array.isArray(params.id) ? params.id[0] : (params.id as string) || "";

  const { artwork, isLoading, error, refetch } = useArtwork(artworkId);
  const { isFavorite, favorite } = useFavoriteStatus(artworkId);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const toggleFavorite = () => {
    if (!artwork) return;
    if (isFavorite && favorite?.id) {
      removeFavorite.mutate(favorite.id);
      return;
    }
    if (addFavorite.isPending) return;
    const imageId = extractImageId(artwork.imageUrl);
    addFavorite.mutate({
      artworkId: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      imageId: imageId,
    } as any);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
          <Text style={[styles.backText, { fontFamily: Fonts.bodyStrong }]}> Volver</Text>
        </Pressable>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Detalle</Text>
          <Pressable onPress={toggleFavorite} style={styles.heartDetail} accessibilityRole="button">
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={26} color={isFavorite ? "#b71c1c" : Editorial.ink} />
          </Pressable>
        </View>
        <View style={styles.headerRule} />
      </View>

      {isLoading ? (
        <View style={styles.stateBlock}>
          <ActivityIndicator size="small" color={Editorial.brass} />
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>Cargando obra...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No se pudo cargar la obra</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>{error.message}</Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={[styles.retryText, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
          </Pressable>
        </View>
      ) : !artwork ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>Obra no disponible</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.imageFrame}>
            {artwork.imageUrl ? (
              <Image source={{ uri: artwork.imageUrl, headers: IMAGE_HEADERS }} style={styles.image} contentFit="contain" />
            ) : (
              <View style={[styles.image, styles.noImage]}>
                <Text style={styles.noImageText}>Sin imagen</Text>
              </View>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{artwork.title}</Text>
            {artwork.artist ? <Text style={[styles.artist, { fontFamily: Fonts.body }]}>{artwork.artist}</Text> : null}
            {artwork.date ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Fecha: {artwork.date}</Text> : null}
            {artwork.medium ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Técnica/medio: {artwork.medium}</Text> : null}
            {artwork.department ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Departamento: {artwork.department}</Text> : null}
            {artwork.placeOfOrigin ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Origen: {artwork.placeOfOrigin}</Text> : null}
            {artwork.creditLine ? <Text style={[styles.credit, { fontFamily: Fonts.body }]}>{artwork.creditLine}</Text> : null}
            {artwork.description ? <Text style={[styles.description, { fontFamily: Fonts.body }]}>{artwork.description}</Text> : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Editorial.paper },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backButton: { alignSelf: "flex-start", marginBottom: 6 },
  backText: { color: Editorial.brass, fontSize: 14 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: Editorial.ink, fontFamily: Fonts.displayBold, fontSize: 32, letterSpacing: -0.6 },
  heartDetail: { padding: 4 },
  headerRule: { backgroundColor: Editorial.ink, height: 1, marginTop: 10, opacity: 0.9 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  imageFrame: { width: "100%", aspectRatio: 0.8, borderWidth: 1, borderColor: Editorial.rule, padding: 8, backgroundColor: Editorial.paper, marginTop: 12 },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 12 },
  info: { marginTop: 16, gap: 6 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 24, lineHeight: 28 },
  artist: { color: Editorial.inkSoft, fontSize: 14 },
  meta: { color: Editorial.ink, fontSize: 13 },
  credit: { color: Editorial.inkSoft, fontSize: 12, marginTop: 4 },
  description: { color: Editorial.ink, fontSize: 13, lineHeight: 20, marginTop: 6 },
  stateBlock: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 10 },
  stateTitle: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 18 },
  stateText: { color: Editorial.inkSoft, fontSize: 14, textAlign: "center" },
  retryButton: { marginTop: 8, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Editorial.rule },
  retryText: { color: Editorial.ink, fontSize: 12 },
});


================================================
ðŸ“„ ARCHIVO: src\app\_layout.tsx
================================================


import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display/400Regular';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display/700Bold';
import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SyncIndicator } from '@/components/sync-indicator';
import { QueryProvider } from '@/queries/query-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontsError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const fontsReady = fontsLoaded || Boolean(fontsError);

  return (
    <QueryProvider>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar style="dark" />

        <View style={{ flex: 1 }}>
          {fontsReady ? <AnimatedSplashOverlay /> : null}
          {fontsReady ? <SyncIndicator /> : null}

          {fontsReady ? (
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="artwork_detail" />
            </Stack>
          ) : null}
        </View>
      </ThemeProvider>
    </QueryProvider>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.tsx
================================================

import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.web.tsx
================================================

import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View style={styles.background} entering={keyframe.duration(DURATION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.tsx
================================================

import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="favorites">
        <NativeTabs.Trigger.Label>Favoritos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.web.tsx
================================================

import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Inicio</TabButton>
          </TabTrigger>
          <TabTrigger name="favorites" href="/favorites" asChild>
            <TabButton>Favoritos</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  ...props
}: Omit<TabTriggerSlotProps, 'ref'>) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Artelier
        </ThemedText>

        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\artwork-card.tsx
================================================

import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import type { Artwork } from "@/api/artic";
import { Editorial, Fonts } from "@/constants/editorial";
import { useAddFavorite, useFavoriteStatus, useRemoveFavorite } from "@/queries/useFavorites";

const IMAGE_HEADERS =
  Platform.OS === "web"
    ? undefined
    : {
        Referer: "https://www.artic.edu/",
        "User-Agent": "okhttp/4.12.0",
      };

function extractImageId(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  try {
    const match = imageUrl.match(/\/([a-f0-9-]+)\/full\//i);
    if (match && match[1]) return match[1];
    const parts = imageUrl.split("/");
    const idx = parts.findIndex((p) => p === "iiif" || p === "2");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return null;
}

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const metaLine = [artwork.date, artwork.department]
    .filter((value): value is string => Boolean(value))
    .join(" - ");

  const { isFavorite, favorite } = useFavoriteStatus(artwork.id);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const toggleFavorite = () => {
    if (isFavorite && favorite?.id) {
      removeFavorite.mutate(favorite.id);
      return;
    }
    if (addFavorite.isPending) return;
    const imageId = extractImageId(artwork.imageUrl);
    addFavorite.mutate({
      artworkId: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      imageId: imageId,
    } as any);
  };

  const goToDetail = () => {
    router.push({ pathname: "/artwork_detail", params: { id: artwork.id } });
  };

  return (
    <Pressable onPress={goToDetail} style={styles.card} accessibilityRole="button">
      <View style={styles.frame}>
        <View style={styles.mat}>
          {artwork.imageUrl ? (
            <Image
              source={{ uri: artwork.imageUrl, headers: IMAGE_HEADERS }}
              style={styles.image}
              contentFit="cover"
              transition={220}
              priority={index !== undefined && index < 4 ? "high" : "normal"}
            />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            style={styles.heartButton}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            hitSlop={8}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#b71c1c" : "#fff"} />
          </Pressable>
        </View>
      </View>

      <View style={styles.label}>
        <Text style={styles.title} numberOfLines={2}>
          {artwork.title}
        </Text>
        {artwork.artist ? (
          <Text style={[styles.artist, { fontFamily: Fonts.body }]} numberOfLines={1}>
            {artwork.artist}
          </Text>
        ) : null}
        {metaLine ? (
          <>
            <View style={styles.rule} />
            <Text style={[styles.meta, { fontFamily: Fonts.bodyStrong }]} numberOfLines={1}>
              {metaLine}
            </Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  frame: { aspectRatio: 0.75, backgroundColor: Editorial.paper, borderWidth: 1, borderColor: Editorial.rule, padding: 6 },
  mat: { flex: 1, overflow: "hidden", backgroundColor: Editorial.paperDeep },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 11 },
  heartButton: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 16, padding: 4 },
  label: { marginTop: 10, gap: 4 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 16, lineHeight: 20 },
  artist: { color: Editorial.inkSoft, fontSize: 12, lineHeight: 16 },
  rule: { backgroundColor: Editorial.rule, height: StyleSheet.hairlineWidth, marginTop: 2 },
  meta: { color: Editorial.brass, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" },
});


================================================
ðŸ“„ ARCHIVO: src\components\external-link.tsx
================================================

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\hint-row.tsx
================================================

import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\sync-indicator.tsx
================================================

import { StyleSheet, Text, View } from 'react-native';
import { useIsMutating, onlineManager } from '@tanstack/react-query';
import { mutationKeys } from '@/queries/mutationKeys';
import { Editorial, Fonts } from '@/constants/editorial';

export function SyncIndicator() {
  const isOnline = onlineManager.isOnline();
  const createFavMutating = useIsMutating({ mutationKey: mutationKeys.createFavorite });
  const deleteFavMutating = useIsMutating({ mutationKey: mutationKeys.deleteFavorite });
  const createNoteMutating = useIsMutating({ mutationKey: mutationKeys.createNote });
  const updateNoteMutating = useIsMutating({ mutationKey: mutationKeys.updateNote });
  const anyMutatingCount = useIsMutating();

  const anyMutating =
    createFavMutating > 0 ||
    deleteFavMutating > 0 ||
    createNoteMutating > 0 ||
    updateNoteMutating > 0 ||
    anyMutatingCount > 0;

  if (!anyMutating && isOnline !== false) {
    return null;
  }

  if (!isOnline && anyMutating) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cambios pendientes de sincronización</Text>
      </View>
    );
  }

  if (anyMutating) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sincronizando cambios...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Editorial.brass,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.bodyStrong,
    fontSize: 12,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-text.tsx
================================================

import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-view.tsx
================================================

import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}


================================================
ðŸ“„ ARCHIVO: src\components\ui\collapsible.tsx
================================================

import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\web-badge.tsx
================================================

import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});


================================================
ðŸ“„ ARCHIVO: src\constants\editorial.ts
================================================

/**
 * Estética editorial de "Artelier": papel de catálogo, tinta oscura y un
 * ocre de latón como acento (el de las cartelas de museo).
 *
 * Los nombres de familia tienen que coincidir con las claves que se registran
 * con `useFonts` en `src/app/_layout.tsx`.
 */
export const Editorial = {
  /** Papel del catálogo (fondo principal). */
  paper: '#F5F1E8',
  /** Papel más profundo (marcos y campos). */
  paperDeep: '#EBE4D6',
  /** Tinta: títulos y texto principal. */
  ink: '#16130F',
  /** Tinta suave: texto secundario. */
  inkSoft: '#5B544A',
  /** Latón: acentos, numeración y separadores finos. */
  brass: '#9B7B49',
  /** Filete (línea fina de catálogo). */
  rule: '#D6CEBE',
  /** Rojo apagado para errores. */
  danger: '#8B3A2F',
  /** Blanco para las cartelas sobre imagen. */
  white: '#FFFFFF',
} as const;

export const Fonts = {
  /** Títulos de marca (Playfair Display Bold). */
  displayBold: 'PlayfairDisplay_700Bold',
  /** Títulos de obra (Playfair Display Regular). */
  display: 'PlayfairDisplay_400Regular',
  /** Texto corrido (Inter Regular). */
  body: 'Inter_400Regular',
  /** Texto de énfasis y versalitas (Inter SemiBold). */
  bodyStrong: 'Inter_600SemiBold',
} as const;


================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.ts
================================================

export { useColorScheme } from 'react-native';


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.web.ts
================================================

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-theme.ts
================================================

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // React Native 0.88: useColorScheme() devuelve 'light' | 'dark' | null
  // (el antiguo valor 'unspecified' ya no existe en los tipos).
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}


================================================
ðŸ“„ ARCHIVO: src\lib\network.ts
================================================

import * as Network from 'expo-network';
import { onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

/**
 * Conecta el `onlineManager` de TanStack Query con el estado real de la red.
 *
 * Por defecto TanStack solo escucha los eventos `online`/`offline` de `window`, que no
 * existen en React Native, así que sin este módulo la app siempre creería que tiene
 * internet: las mutaciones se ejecutarían (y fallarían) en lugar de pausarse.
 *
 * "Estar conectado a una red" no es lo mismo que "tener internet":
 *  - `isConnected` solo dice que hay una interfaz activa (p. ej. un Wi-Fi sin salida).
 *  - `isInternetReachable` (Android) confirma que la conexión fue validada por el SO.
 *
 * Regla: solo marcamos OFFLINE cuando tenemos pruebas de que no hay internet; si el
 * estado es desconocido preferimos quedarnos en online y dejar que los reintentos hagan
 * su trabajo (nos quedarnos "offline" por error dejaría las consultas paradas para siempre).
 */
const RECHECK_WHILE_OFFLINE_MS = 15_000;

/**
 * Decide si hay internet real a partir del estado de red del dispositivo.
 * @param state estado devuelto por `expo-network`
 * @returns `true` solo si no tenemos constancia de la ausencia de internet
 */
export function isReallyOnline(state: Network.NetworkState): boolean {
  // Sin interfaz de red (modo avión, Wi-Fi y datos apagados).
  if (state.isConnected === false) return false;
  if (state.type === Network.NetworkStateType.NONE) return false;
  // Conectado a una red pero el sistema todavía no valida que haya salida a internet.
  if (state.isInternetReachable === false) return false;
  // Desconocido -> asumimos online.
  return true;
}

/**
 * Instala el listener de red. Idempotente: `onlineManager.setEventListener` reemplaza
 * el listener anterior (y ejecuta su limpieza), así que puede llamarse otra vez si el
 * módulo se recarga con Fast Refresh.
 *
 * Se llama ANTES de montar `PersistQueryClientProvider` para que, cuando el proveedor
 * termine de restaurar la caché y ejecute `resumePausedMutations()`, `onlineManager`
 * ya sepa si realmente hay internet.
 */
export function startNetworkWatcher(): void {
  // En el render estático de web (SSR en Node) no hay `window`, no hay red que
  // observar y `addNetworkStateListener` lanzaría "window is not defined".
  // Ahí no hace falta: las consultas y mutaciones solo existen en el dispositivo.
  if (typeof window === 'undefined') return;

  onlineManager.setEventListener((setOnline) => {
    let recheckTimer: ReturnType<typeof setInterval> | undefined;

    const apply = (state: Network.NetworkState) => {
      const online = isReallyOnline(state);
      onlineManager.setOnline(online);
      setOnline(online);

      // Si no hay internet, el sistema operativo no siempre avisa de la vuelta
      // (sobre todo al salir del modo avión), así que reintentamos periódicamente.
      if (!online && recheckTimer === undefined) {
        recheckTimer = setInterval(refresh, RECHECK_WHILE_OFFLINE_MS);
      } else if (online && recheckTimer !== undefined) {
        clearInterval(recheckTimer);
        recheckTimer = undefined;
      }
    };

    const refresh = () => {
      Network.getNetworkStateAsync().then(apply).catch(() => {});
    };

    // Estado inicial + cambios de red (Wi-Fi <-> datos <-> modo avión).
    refresh();
    const subscription = Network.addNetworkStateListener(apply);

    // Al volver a primer plano volvemos a comprobar: es el momento en el que más
    // cambia la conectividad y en el que más se reanudan mutaciones pausadas.
    const appStateSubscription = AppState.addEventListener('change', (status) => {
      if (status === 'active') refresh();
    });

    return () => {
      if (recheckTimer !== undefined) clearInterval(recheckTimer);
      subscription.remove();
      appStateSubscription.remove();
    };
  });
}


================================================
ðŸ“„ ARCHIVO: src\lib\offline.ts
================================================

import type { QueryClient } from '@tanstack/react-query';

import { mutationKeys } from '@/queries/mutationKeys';
import { createFavorite, deleteFavorite, createNote, updateNote } from '@/api/mock';

/**
 * Registra la `mutationFn` de cada mutación con `queryClient.setMutationDefaults`.
 *
 * Es OBLIGATORIO para que una mutación pausada que se restaura desde AsyncStorage
 * pueda re-ejecutarse: al restaurar solo se guarda la clave y el estado, nunca
 * la función (no es serializable).
 */
export function registerMutationDefaults(client: QueryClient): void {
  client.setMutationDefaults(mutationKeys.createFavorite, {
    mutationFn: (variables: any) => createFavorite(variables),
  });

  client.setMutationDefaults(mutationKeys.deleteFavorite, {
    mutationFn: (variables: any) => deleteFavorite(variables),
  });

  client.setMutationDefaults(mutationKeys.createNote, {
    mutationFn: (variables: any) => createNote(variables),
  });

  client.setMutationDefaults(mutationKeys.updateNote, {
    mutationFn: (variables: any) => {
      const { id, ...rest } = variables || {};
      return updateNote(id, rest);
    },
  });
}


================================================
ðŸ“„ ARCHIVO: src\queries\mutationKeys.ts
================================================

/**
 * Claves de mutación (mutationKey).
 *
 * Dos usos:
 *  1. `queryClient.setMutationDefaults(mutationKey, { mutationFn })` — registra la
 *     función que se ejecuta. Es OBLIGATORIO para que una mutación pausada que se
 *     restaura desde AsyncStorage pueda re-ejecutarse: al restaurar solo se guarda
 *     la clave y el estado, nunca la función (no es serializable).
 *  2. `useMutation({ mutationKey })` — permite contarlas/observarlas con
 *     `useIsMutating({ mutationKey })` y `useMutationState(...)`.
 *
 * Deben ser arrays estables y serializables (sin objetos ni funciones).
 */
export const mutationKeys = {
  /** POST /favorites — crear un favorito. */
  createFavorite: ['mine', 'favorite', 'create'] as const,
  /** DELETE /favorites/:id — quitar un favorito. */
  deleteFavorite: ['mine', 'favorite', 'delete'] as const,
  /** POST /notes — crear una nota. */
  createNote: ['mine', 'note', 'create'] as const,
  /** PATCH /notes/:id — editar una nota existente. */
  updateNote: ['mine', 'note', 'update'] as const,
};


================================================
ðŸ“„ ARCHIVO: src\queries\query-provider.tsx
================================================

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';

import { startNetworkWatcher } from '@/lib/network';
import { createQueryClient, persistOptions } from './queryClient';

/**
 * 1) El watcher de red se instala ANTES de montar el proveedor, para que cuando
 *    el proveedor termine de restaurar la caché y llame a `resumePausedMutations()`,
 *    `onlineManager` ya refleje si hay internet real.
 * 2) Los defaults de mutación (mutationFn) se registran dentro de `createQueryClient()`,
 *    también antes de la restauración.
 * 3) El resto lo hace el proveedor: hidratar desde AsyncStorage, suscribirse a los
 *    cambios y reanudar lo que quedó pausado.
 */
startNetworkWatcher();

const queryClient = createQueryClient();

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
      // Se ejecuta cuando termina de restaurar la caché persistida: ese es el
      // momento exacto de reanudar las mutaciones que quedaron pausadas sin conexión.
      onSuccess={() => queryClient.resumePausedMutations()}
      onError={() => {
        // Si la caché guardada no se puede leer, TanStack la descarta y seguimos
        // desde cero: nunca debe impedir arrancar la app.
        if (__DEV__) console.warn('[persist] No se pudo restaurar la caché; se descarta.');
      }}>
      {children}
    </PersistQueryClientProvider>
  );
}

/** El QueryClient único de la app (útil para inspecciones en desarrollo). */
export { queryClient };


================================================
ðŸ“„ ARCHIVO: src\queries\queryClient.ts
================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

import { registerMutationDefaults } from '@/lib/offline';

/**
 * ── Configuración de la caché ────────────────────────────────────────────────
 *
 * maxAge (persister): cuánto tiempo se RESTAURA desde AsyncStorage al abrir la app.
 * gcTime (QueryClient): cuánto tiempo vive en memoria una consulta inactiva.
 *
 * REGLA: gcTime >= maxAge. Si gcTime fuera menor (p. ej. 5 min vs 24 h), la app
 * restauraría una caché de hace 3 horas pero la borraría de memoria a los 5 minutos:
 * se perdería lo persistido y el objetivo de "pintar desde caché antes del GET"
 * se rompería con parpadeos. El detalle completo está en el README.
 */
export const PERSIST_MAX_AGE = 1000 * 60 * 60 * 24; // 24 h
export const CACHE_GC_TIME = PERSIST_MAX_AGE; // 24 h (siempre >= maxAge)

/** API pública (Art Institute of Chicago): datos estables, catálogo de museo. */
export const PUBLIC_STALE_TIME = 1000 * 60 * 10; // 10 minutos

/** MockAPI (favoritos y notas de la usuaria): datos propios, deben refrescar pronto. */
export const MOCKAPI_STALE_TIME = 1000 * 30; // 30 segundos

/** Clave de AsyncStorage donde se guarda la caché. Cambiarla descarta todo lo guardado. */
export const STORAGE_KEY = 'artapp-query-cache-v1';

/**
 * Cambia este valor si rompes el formato de los datos guardados: así la caché
 * vieja se descarta en lugar de restaurarse y fallar.
 */
const CACHE_BUSTER = 'v1';

/**
 * Persister: serializa (solo) la caché en AsyncStorage.
 *
 * `throttleTime: 300` acorta la ventana de riesgo del guardado: el persister guarda
 * como mucho una vez cada N ms, así que si cierras la app justo después de pausar
 * una mutación, 300 ms es mucho más seguro que el valor por defecto de 1000 ms.
 */
export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: STORAGE_KEY,
  throttleTime: 300,
});

/** Opciones de deshidratación: se guarda solo lo que interesa restaurar. */
export const dehydrateOptions = {
  /**
   * Solo se persisten las mutaciones PAUSADAS (las que esperan conexión).
   * Es también el comportamiento por defecto de TanStack Query, pero lo dejamos
   * explícito porque es el requisito central del trabajo: una mutación que quedó
   * "pendiente" debe sobrevivir al cierre total de la app.
   *
   * Las mutaciones ya terminadas no se guardan (no tienen nada que reanudar) y
   * las que estaban a mitad de vuelo con internet tampoco: re-ejecutarlas
   * podría duplicar registros en MockAPI.
   */
  shouldDehydrateMutation: (mutation: { state: { isPaused: boolean } }) =>
    mutation.state.isPaused,
};

/**
 * Crea el QueryClient de la app.
 *
 * IMPORTANTE: `registerMutationDefaults` se ejecuta AQUÍ, antes de que se monte
 * `<PersistQueryClientProvider>`. La restauración de la caché (y con ella la de
 * las mutaciones pausadas) ocurre en un efecto de ese proveedor, de modo que cuando
 * `hydrate()` construya cada mutación restaurada, su `mutationFn` ya estará
 * registrada y podrá re-ejecutarse al reanudarla.
 */
export function createQueryClient(): QueryClient {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // Valor por defecto; las consultas de MockAPI lo bajan a MOCKAPI_STALE_TIME.
        staleTime: PUBLIC_STALE_TIME,
        gcTime: CACHE_GC_TIME,
        retry: 2,
      },
      mutations: {
        gcTime: CACHE_GC_TIME,
        // Dos reintentos por si la red cae entre que detectamos la conexión y pedimos.
        retry: 2,
        // Con offline no se intenta: la mutación queda pausada y se reanuda sola.
        networkMode: 'online',
      },
    },
  });

  registerMutationDefaults(client);

  return client;
}

/** Opciones que se pasan a `<PersistQueryClientProvider persistOptions={...}>`. */
export const persistOptions = {
  persister: queryPersister,
  maxAge: PERSIST_MAX_AGE,
  buster: CACHE_BUSTER,
  dehydrateOptions,
};


================================================
ðŸ“„ ARCHIVO: src\queries\queryKeys.ts
================================================

/**
 * Jerarquía de claves de consulta (query keys).
 *
 * Regla de oro: cada clave es un array donde los primeros elementos agrupan y los
 * últimos identifican. Así, `invalidateQueries({ queryKey: queryKeys.mine.all })`
 * invalida TODOS los datos propios de golpe, y `queryKeys.mine.notes(id)` invalida
 * solo las notas de una obra concreta.
 *
 *   art  -> API pública del Art Institute of Chicago (solo lectura)
 *   mine -> Datos que crea la usuaria en MockAPI (favoritos y notas)
 */
export const queryKeys = {
  /** Rama de la API pública. */
  art: {
    /** ['art'] — invalida toda la rama pública (nunca se hace: el museo no cambia). */
    all: ['art'] as const,
    /** ['art','list',page,q] — una página de la galería / una búsqueda. */
    list: (params: { page: number; q?: string }) =>
      ['art', 'list', params.page, params.q ?? ''] as const,
    /** ['art','detail',id] — una obra concreta. */
    detail: (id: string) => ['art', 'detail', id] as const,
  },

  /** Rama de los datos propios (MockAPI). */
  mine: {
    /** ['mine'] — invalida favoritos Y notas a la vez. */
    all: ['mine'] as const,
    /** ['mine','favorites'] — la lista de favoritos. */
    favorites: () => ['mine', 'favorites'] as const,
    /** ['mine','favorites',artworkId] — si una obra concreta es favorita. */
    favorite: (artworkId: string) => ['mine', 'favorites', artworkId] as const,
    /** ['mine','notes',artworkId] — todas las notas de una obra. */
    notes: (artworkId: string) => ['mine', 'notes', artworkId] as const,
    /** ['mine','notes',artworkId,noteId] — una nota concreta. */
    note: (artworkId: string, noteId: string) =>
      ['mine', 'notes', artworkId, noteId] as const,
  },
} as const;

/** Tipo de las claves, para poder tipar los datos que devuelven los hooks. */
export type QueryKeys = typeof queryKeys;


================================================
ðŸ“„ ARCHIVO: src\queries\useArtworks.ts
================================================

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  fetchArtwork,
  fetchArtworks,
  type Artwork,
  type ArtworkDetail,
} from '@/api/artic';
import { PUBLIC_STALE_TIME } from './queryClient';
import { queryKeys } from './queryKeys';

/**
 * Normaliza el texto de búsqueda para que "monet  " y " Monet" sean la MISMA
 * clave de caché (si no, cada espacio en blanco sería una petición distinta).
 */
export function normalizeSearch(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

/** Fusiona dos listas quitando obras repetidas por id. */
function mergeArtworks(previous: Artwork[], incoming: Artwork[]): Artwork[] {
  const seen = new Set(previous.map((item) => item.id));
  const merged = [...previous];
  for (const item of incoming) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  }
  return merged;
}

/**
 * Galería: catálogo completo o búsqueda, con paginación por botón «Ver más».
 *
 * Por qué NO `useInfiniteQuery`: cada página vive en su propia clave
 * (`art.list(page, q)`), así que al volver atrás o repetir una búsqueda las
 * páginas anteriores salen de la caché sin pedirlas de nuevo, y el código
 * se entiende con `useQuery` + un estado local que acumula resultados.
 *
 * Orden de los efectos:
 *  1. Al cambiar la búsqueda → página 1 y lista vacía.
 *  2. Cuando la página actual resuelve → se añaden sus obras (sin duplicar).
 */
export function useArtworks(input: string) {
  const q = normalizeSearch(input);

  // `q` y `page` se guardan JUNTAS: si van en estados separados, al cambiar la
  // búsqueda la siguiente renderación usaría la página vieja con el texto nuevo
  // y dispararía una petición inútil (el museo admite 60 por minuto).
  const [params, setParams] = useState({ q: '', page: 1 });
  const [items, setItems] = useState<Artwork[]>([]);

  // Cambiar de búsqueda empieza una galería nueva.
  useEffect(() => {
    setParams((previous) => (previous.q === q ? previous : { q, page: 1 }));
    setItems([]);
  }, [q]);

  const { q: search, page } = params;

  // `params` llega un render tarde respecto al texto que ha escrito la usuaria:
  // mientras no coincidan, la clave de la consulta todavía es la de la búsqueda
  // anterior y no debemos mezclar sus resultados con los nuevos.
  const inSync = search === q;

  const query = useQuery({
    queryKey: queryKeys.art.list({ page, q: search }),
    queryFn: () => fetchArtworks({ page, q: search }),
    staleTime: PUBLIC_STALE_TIME,
  });

  // Acumula la página actual. Si la caché devuelve la misma página otra vez,
  // `mergeArtworks` evita repetir obras.
  const pageData = query.data;
  useEffect(() => {
    if (!pageData || !inSync) return;
    setItems((previous) => mergeArtworks(previous, pageData.items));
  }, [pageData, inSync]);

  const isSearching = q.length > 0;

  return {
    /** Obras acumuladas de todas las páginas visibles. */
    items,
    /** Normaliza y expone el término ya limpio. */
    q,
    isSearching,
    /** Primera carga (no hay NADA que mostrar todavía). */
    isLoading: items.length === 0 && (query.isPending || query.isFetching),
    /** Estamos trayendo una página más con «Ver más». */
    isLoadingMore: page > 1 && query.isFetching,
    hasMore: pageData?.hasMore ?? true,
    loadMore: () => {
      if (query.isFetching) return;
      setParams((current) => ({ ...current, page: current.page + 1 }));
    },
    /** `true` mientras hay una petición en marcha (para el pie de lista). */
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Detalle de una obra por id (la usará la pantalla de detalle en la etapa 3).
 * Mantiene `staleTime` público: la ficha de una obra casi nunca cambia.
 */
export function useArtwork(id: string) {
  const query = useQuery({
    queryKey: queryKeys.art.detail(id),
    queryFn: () => fetchArtwork(id),
    enabled: id.length > 0,
    staleTime: PUBLIC_STALE_TIME,
  });

  return {
    artwork: (query.data ?? null) as ArtworkDetail | null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}


================================================
ðŸ“„ ARCHIVO: src\queries\useFavorites.ts
================================================

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createFavorite, deleteFavorite, fetchFavorites, type Favorite } from '@/api/mock';
import { MOCKAPI_STALE_TIME } from './queryClient';
import { mutationKeys } from './mutationKeys';
import { queryKeys } from './queryKeys';

export function useFavorites() {
  const query = useQuery({
    queryKey: queryKeys.mine.favorites(),
    queryFn: fetchFavorites,
    staleTime: MOCKAPI_STALE_TIME,
  });

  return {
    favorites: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useFavoriteStatus(artworkId: string) {
  const { favorites } = useFavorites();
  const favorite = favorites.find((f) => f.artworkId === artworkId) || null;
  return {
    isFavorite: !!favorite,
    favorite,
  };
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.createFavorite,
    mutationFn: (input: Omit<Favorite, 'id' | 'addedAt'> & { addedAt?: string }) =>
      createFavorite(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.favorites() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.all });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteFavorite,
    mutationFn: (id: string) => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.favorites() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.all });
    },
  });
}


================================================
ðŸ“„ ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@/assets/*": [
        "./assets/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
