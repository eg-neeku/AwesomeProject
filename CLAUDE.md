# Project Instructions

## MCP Server
An MCP server is running at http://localhost:3000/mcp.
Tool: `get_docs_for_npm_package`

⚠️ MANDATORY — NO EXCEPTIONS: Before writing ANY code that touches an npm package:
1. STOP — do NOT write code yet
2. Call `get_docs_for_npm_package` for EVERY package you plan to use
3. Only use functions, props, and APIs that exist in the tool response — never guess or rely on prior knowledge
4. Never use deprecated APIs — if a function is marked @deprecated in the types, say so and use the replacement
5. If the tool response does not contain the API you were about to use, it does NOT exist — find an alternative from the tool response

This applies to: adding new props, using navigator options, calling library functions, configuring packages — anything npm-related.
Skipping this step is not allowed under any circumstance.

## Stack
- React Native (check package version via the tool)
- [add your other packages here e.g. react-navigation, zustand etc.]

## Rules
- Always fetch types before coding, not after
- If unsure whether an API exists, fetch it — don't guess
- Flag any deprecated usages found in the fetched types

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start                # Metro bundler
npm run android          # Build and run on Android
npm run ios              # Build and run on iOS

# Quality
npm run lint             # ESLint
npm test                 # Jest (all tests)
npm run cleanTest        # Jest with cache cleared

# Cleanup
npm run gradleClean      # Clean Android Gradle build
npm run cleanInstall     # Remove node_modules and reinstall
```

## Architecture

### Bootstrap Flow

```
index.js → App.tsx (SafeAreaProvider + GestureHandlerRootView)
  → AppContent.tsx (provider stack + NavigationContainer)
    → AppContextProvider (device: orientation, dimensions, dark mode)
    → AuthContextProvider (token + user from AsyncStorage)
    → BuildingContextProvider (building CRUD state via useReducer)
    → StackScreenCRUD (conditionally renders BeforeLoginStack or AfterLoginStack)
```

`StackScreenCRUD.tsx` is the auth gate: no token → `BeforeLoginStack` (Login, Register, ForgotPassword); token present → `AfterLoginStack` (drawer + role-gated screens).

### Navigation

- **@react-navigation/native-stack** for screen transitions
- **Drawer** (`CDrawerScreen.tsx`) wraps all authenticated screens; menu items are rendered conditionally by `authItems.role`
- **AfterLoginStack** uses `Stack.Group` to conditionally include screens for `admin`, `user`, and `techni` roles
- Screen name constants are defined in `src/college/database/model.tsx` as `GOTO_D_*` (drawer) and `GOTO_S_*` (stack)

### State Management

Three Context providers, all in `src/college/database/`:

| Context | File | Manages |
|---|---|---|
| `AppContext` | `AppContextProvider.tsx` | Device orientation, dimensions, dark mode |
| `AuthContext` | `AuthContentProvider.tsx` | Token, user details (`authItems`), AsyncStorage persistence |
| `BuildingContext` | `BuildingContextProvider.tsx` | Building list via `useReducer` (ADD/SET/UPDATE/DELETE) |

Complaint and technician data is fetched on demand (not stored in context).

### HTTP / API Layer

- **Axios** targeting **Firebase Realtime Database**
- Base URL: `DB_URL` constant in `model.tsx` → `<firebase_URL>`
- Database root: `DB_NAME` constant (`COLLEGEAPP`)
- One file per domain: `buildinghttp.ts`, `complainthttp.ts`, `registerhttp.ts`, `technicianhttp.ts`
- Each exports plain async functions (store, fetch, update, delete). Firebase query params (`orderBy`, `equalTo`) are used for server-side filtering.

### Key Shared Files

- **`src/college/database/model.tsx`** — single source of truth for: TypeScript types, enums (`Status`: OPEN/INPROGRESS/DONE), DTO types (without `id`), navigation constants, AsyncStorage key constants, and utility functions (`formatPostalAddress`, `checkPasswordRequirement`, `sendEmail`).
- **`src/constants/colors.js`** — app-wide color palette (~30 named colors).
- **`src/college/screen/screenStyles.ts`** — shared screen-level styles.

### UI Components (`src/college/UI/`)

Reusable components that wrap RN primitives:
- `MyButton` — `Pressable` with pressed-state color
- `InputWithLabel` / `Input` — form input with validation styling
- `MyDropDown` — thin wrapper around `react-native-element-dropdown`
- `MyImagePicker` — camera/gallery picker via `react-native-image-picker`
- `LoadingOverlay` / `ErrorOverlay` — modal overlays for async operations

### Screen Conventions

Forms (`ComplaintForm`, `BuildingForm`) are reusable components that accept `onConfirm`, `onCancel`, and `selectedItem` props and are mounted inside a screen that handles navigation. List item components (`ComplaintItem`, `BuildingItem`) are standalone and receive item data + action callbacks.

### Role-Based Access

`authItems.role` drives what screens appear in the drawer and stack:
- `"admin"` — building management, technician management, complaint assignment
- `"user"` — complaint submission, building view
- `"techni"` — assigned complaints, status updates

Password requirement: exactly 10 characters, must include lowercase, uppercase, digit, and a special character from `@$!%*?&`.
