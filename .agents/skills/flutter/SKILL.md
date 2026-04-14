---
name: flutter-android-native
description: >
  Standards and patterns for building Android-only Flutter apps with Material 3. Use this skill
  whenever the user is working on a Flutter project targeting Android — including project setup,
  adding screens/widgets/services, configuring GitHub Actions, handling assets, setting up environment
  variables, or asking about folder structure. Trigger even for partial tasks like "add a service",
  "create a screen", or "setup CI". This skill enforces Android-only conventions, M3 theming, and
  service-first architecture — always consult it before generating any Flutter code or project config.
---

# Flutter Android Native-First Development

## Core Principles

1. **Android only** — no iOS, web, macOS, Windows, or Linux targets. Never generate code or config for other platforms.
2. **Material 3 strictly** — always `useMaterial3: true`. Default to AMOLED black dark theme unless user specifies otherwise.
3. **Service-first architecture** — all business logic lives in `lib/services/`. Screens and widgets only call service methods.
4. **No hard-coded secrets** — API keys, tokens, and URLs go in `.env` via `flutter_dotenv` or `--dart-define`. Always remind user if they hard-code a key.

---

## Project Initialization

```bash
flutter create --platforms android .
```

This ensures no `ios/`, `web/`, `macos/`, or other platform folders are created.

---

## Directory Structure

```
lib/
├── main.dart
├── screens/      # Full-page widgets (e.g., home_screen.dart)
├── tabs/         # Tab children for BottomNavigationBar/PageView
├── widgets/      # Reusable UI components (e.g., custom_card.dart)
├── services/     # API, database, shared prefs logic (e.g., github_service.dart)
├── utils/        # Constants, helpers, extensions (e.g., app_colors.dart)
└── assets/       # Media assets (images, fonts)
```

**Rules:**
- New screen → `lib/screens/<n>_screen.dart`
- New reusable widget → `lib/widgets/<n>.dart`
- New API/DB/storage logic → `lib/services/<n>_service.dart`
- New helper/constant → `lib/utils/<n>.dart`

---

## Standard Material 3 Setup

### AMOLED Dark Theme (default)

```dart
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: Colors.black,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.blue,
      brightness: Brightness.dark,
    ),
  ),
)
```

---

## VS Code Launch Config

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter Android",
      "request": "launch",
      "type": "dart",
      "deviceId": "android"
    }
  ]
}
```

---

## Environment Variables

```yaml
# pubspec.yaml
dependencies:
  flutter_dotenv: ^5.0.2

flutter:
  assets:
    - .env
```

```dart
// main.dart
await dotenv.load(fileName: '.env');
final apiKey = dotenv.env['API_KEY']!;
```

Always add `.env` to `.gitignore`. Alternatively use `--dart-define` for build-time constants:

```bash
flutter run --dart-define=API_KEY=xxx
```

---

## Asset Registration

```yaml
flutter:
  assets:
    - lib/assets/images/logo.png
  fonts:
    - family: CustomFont
      fonts:
        - asset: lib/assets/fonts/CustomFont-Regular.ttf
        - asset: lib/assets/fonts/CustomFont-Bold.ttf
          weight: 700
```

---

## GitHub Actions CI/CD

`.github/workflows/build_apk.yml`:

```yaml
name: Build APK

on:
  workflow_dispatch:
    inputs:
      app_name:
        description: 'App display name'
        required: true
      package_id:
        description: 'Android package ID (e.g. com.example.myapp)'
        required: true
      url:
        description: 'Target URL (for WebView apps)'
        required: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'

      - run: flutter pub get

      - run: |
          flutter build apk \
            --release \
            --split-per-abi \
            --dart-define=APP_NAME="${{ github.event.inputs.app_name }}" \
            --dart-define=PACKAGE_ID="${{ github.event.inputs.package_id }}" \
            --dart-define=TARGET_URL="${{ github.event.inputs.url }}"

      - uses: actions/upload-artifact@v4
        with:
          name: release-apks
          path: build/app/outputs/flutter-apk/*.apk
          retention-days: 7
```

---

## Running the App

```bash
adb devices                    # Check connected devices
emulator -avd <avd_name>       # Start emulator if none connected
flutter run                    # Run debug
flutter build apk --release --split-per-abi  # Build release APKs
```

---

## AI Response Pattern

| Situation | Action |
|---|---|
| User writes business logic in a widget | Move to `lib/services/` |
| User hard-codes an API key | Remind about `.env` / `--dart-define` |
| User adds a new screen | Create in `lib/screens/`, follow M3 |
| User asks about build/release | Guide to `workflow_dispatch` workflow |
| User adds a new asset | Remind to register in `pubspec.yaml` |
| User mentions another platform | Confirm Android-only, no other targets |
