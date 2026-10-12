# React Native Template

A starter template I use for new React Native apps. It runs on **React Native 0.87** with the **New Architecture** (Fabric, TurboModules, bridgeless) enabled on both iOS and Android, and comes with navigation, data fetching, theming, i18n, storage and a small set of animated UI components already wired up.

## ✨ Features

- **New Architecture by default**: Fabric renderer, TurboModules and Hermes on iOS and Android
- **Navigation**: React Navigation 7 stack navigator with typed routes
- **Data fetching**: TanStack Query with a preconfigured [ky](https://github.com/sindresorhus/ky) HTTP client
- **State management**: easy-peasy store with typed hooks
- **Theming**: light/dark themes with generated layout, gutters, fonts and backgrounds, persisted in MMKV
- **Storage**: [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) v4 (Nitro Modules)
- **i18n**: i18next + react-i18next (English and French)
- **Animations & graphics**: Reanimated 4, Skia, Lottie and SVG, used in the sample components
- **Auth example**: Google Sign-In flow, including silent sign-in on startup
- **Permissions**: react-native-permissions with App Tracking Transparency as an example
- **Environment variables**: `.env` values inlined at build time
- **Testing**: Jest + React Native Testing Library with mocks for Reanimated, Gesture Handler, MMKV, Skia, Google Sign-In and Clipboard

## 🧱 Tech stack

| Area | Library |
|---|---|
| Core | React Native 0.87, React 19.2, TypeScript |
| Navigation | @react-navigation/native 7, @react-navigation/stack 7 |
| Data | @tanstack/react-query 5, ky 2 |
| State | easy-peasy 6 |
| Storage | react-native-mmkv 4 |
| UI & animation | react-native-reanimated 4, react-native-worklets, @shopify/react-native-skia 2, lottie-react-native 7, react-native-svg, react-native-gesture-handler 3 |
| Native features | @react-native-google-signin/google-signin 16, react-native-permissions 5, @react-native-clipboard/clipboard, react-native-avoid-softinput |
| Testing | Jest 29, @testing-library/react-native 13 |

## 📁 Project structure

```
src/
├── components/      # atoms / molecules / template (atomic design)
├── navigators/      # stack navigator + navigation helpers
├── screens/         # Startup, SignUp, Welcome, Claim
├── services/        # ky instance + API calls
├── stores/          # easy-peasy store and models
├── theme/           # theme config, ThemeProvider, assets
├── translations/    # en / fr
├── types/           # navigation, theme and guard types
└── utils/
```

Imports use the `@/` alias for `src/`, e.g. `import { useTheme } from '@/theme'`.

## 🚀 Getting started

### Requirements

- Node.js >= 22.11
- Yarn 1.x
- Xcode 16+ and CocoaPods (iOS)
- Android Studio with JDK 17 (Android)

### Install

```bash
git clone https://github.com/kazhoang/code-base-template.git
cd code-base-template
yarn
bundle install
yarn pod
```

### Run

```bash
yarn start      # Metro
yarn ios        # iOS simulator
yarn android    # Android emulator / device
```

### Other scripts

```bash
yarn test         # unit tests
yarn type-check   # TypeScript
yarn lint         # ESLint
yarn clean        # reinstall node_modules and pods
```

## ⚙️ Configuration

- **API URL**: set `API_URL` in `.env`.
- **Google Sign-In**: replace `android/app/google-services.json`, `ios/code_base_template/GoogleService-Info.plist` and the `CFBundleURLSchemes` entry in `ios/code_base_template/Info.plist` with your own Firebase/Google Cloud project.
- **Permissions**: iOS permission handlers are listed in `setup_permissions([...])` in `ios/Podfile`. Add the matching usage descriptions to `Info.plist`.
- **Renaming the app**: update `app.json`, the iOS target/bundle identifier and the Android `applicationId`/`namespace`.
