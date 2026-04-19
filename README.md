# Production-Ready React Admin Boilerplate

A modular, scalable, and reusable enterprise-grade React admin dashboard boilerplate. Built strictly with TypeScript to guarantee type safety, heavily inspired by the structure of Ant Design Pro.

## 🚀 Core Features

- **Framework**: React 18 + TypeScript + Vite
- **UI System**: Ant Design (v5) providing a responsive Desktop & Mobile layout (Sidebar auto-collapses to Drawer).
- **State Management**: Zustand (Clean, boilerplate-free global state).
- **Data Fetching**: TanStack React Query + Axios (Includes built-in automated Token Rotation and Request Queuing on 401s).
- **Routing**: React Router 6 (Data Router with comprehensive `<Suspense>` fallback handling).
- **Architecture**: Modular, feature-based architecture prioritizing horizontal scalability.
- **Permissions**: Granular Role-Based Access Control (RBAC) at both the Route and Component level, complete with dynamic 'Super Admin' overrides.
- **Multi-language**: i18next configured for dynamic English (`en`) & Vietnamese (`vi`) namespaces with Type Safety.
- **Theming**: Integrated Dark/Light mode support persisted via `localStorage`.
- **Error Handling**: Deep integration of `react-error-boundary` and React Router `errorElement` for 500/404 fail-safes.

---

## 🏗️ Project Architecture

The architecture enforces strict separation of concerns. Business logic is grouped into independent modules, while infrastructure remains decoupled in the core.

```text
src/
├── app/                  # Application-level configurations (The "Glue")
│   ├── menu.tsx          # Dynamic Ant Design sidebar configuration
│   ├── permissions.ts    # Global permission constants
│   ├── routes.tsx        # Centralized router combining module routes
│   ├── settings.ts       # Global static configurations (App Name, Super Admin Roles)
│   └── theme.ts          # Centralized Light/Dark mode design tokens
│
├── core/                 # Framework infrastructure (NEVER imports from modules)
│   ├── api/              # Axios instance, Token Rotation, generic React-Query Hooks
│   ├── i18n/             # i18next configuration, localized JSON dictionaries, and typing definitions
│   ├── permissions/      # RBAC logic (`usePermissions`, `<PermissionGuard>`)
│   ├── providers/        # Global wrappers (`QueryProvider`, `ThemeProvider`, `AppProviders`)
│   ├── router/           # Route Guards (`<AuthGuard>`)
│   ├── store/            # Global Zustand stores (Auth, Theme, Settings, Loading)
│   └── utils/            # Framework agnostic utilities (`storage.ts`)
│
├── layouts/              # Scoped layout wrappers
│   ├── AuthLayout/       # Centered container for login flows
│   ├── ErrorLayout/      # Full-screen layout for 403/404 states
│   └── MainLayout/       # The primary dashboard shell (Responsive Sidebar, Header, Breadcrumbs)
│
├── modules/              # Isolated, feature-based business logic (Modeled like Ant Design Pro)
│   ├── auth/             # Login forms and authentication hooks
│   ├── dashboard/        # Advanced Workspace/Analytics Dashboard
│   ├── errors/           # 403 Forbidden and 404 Not Found pages
│   ├── forms/            # Complex Basic Forms
│   ├── list/             # Standard List Tables and Search Filters
│   └── user/             # User Management (CRUD, Table UI, API Hooks)
│
├── shared/               # Reusable UI and hooks
│   ├── components/       # Cross-module components (`<GlobalLoading>`, `<AppBreadcrumb>`)
│   └── hooks/            # Global generic hooks (`useTable`)
│
├── main.tsx              # Application entry point
└── vite-env.d.ts         # TypeScript environment declarations
```

---

## 💡 How to Use & Extend

### 1. Project Initialization & White-Labeling

Copy `.env.example` to `.env`. This boilerplate automatically injects your customized environment application name into the browser tab and sidebar logo.

```env
VITE_API_BASE_URL=https://api.example.com/v1
VITE_APP_NAME="My Enterprise Admin"
```

Configure your master roles and feature flags centrally inside `src/app/settings.ts`.

### 2. Adding a New Feature Module

Every feature must live independently inside `src/modules/`. This prevents spaghetti code and ensures easy removal or testing of features.

**Structure of a module (e.g., `src/modules/products/`):**

1. `pages/ProductList.tsx`: The UI component (Table, Form).
2. `hooks.ts`: React Query wrappers leveraging the core API layer.
3. `routes.tsx`: Defines the router array with necessary `<AuthGuard>` protections.
4. `index.ts`: The public API of the module exporting the `routes`.

**To activate your module:**
Export the routes from the module and merge them into the global array in `src/app/routes.tsx`. Add a navigation link to the Sidebar via `src/app/menu.tsx`.

### 3. Using the API Layer (React Query + Axios)

Never call `axios` directly in your components. Use the pre-configured wrappers in `src/core/api/hooks.ts` which automatically handle token injection, queued 401 refresh retries, and generic typings.

```typescript
// src/modules/user/hooks.ts
import { useApiGet } from '@/core/api/hooks';

export const useUsers = (params: Record<string, unknown>) => {
  return useApiGet<PaginatedResponse<User>>(['users', params], '/users', params);
};
```

### 4. Handling Permissions (RBAC)

**Protecting a Route:**
Wrap the route element inside `src/modules/your-module/routes.tsx` with `<AuthGuard>`:

```tsx
<AuthGuard requiredPermissions={[APP_PERMISSIONS.USERS_VIEW]}>
  <UserList />
</AuthGuard>
```

**Protecting a Component/Button:**
Use the `<PermissionGuard>` component to conditionally render UI:

```tsx
import { PermissionGuard } from '@/core/permissions/PermissionGuard';

<PermissionGuard permissions={APP_PERMISSIONS.USERS_DELETE}>
  <Button danger>Delete</Button>
</PermissionGuard>;
```

_Note: Any User possessing the `appSettings.superAdminRole` will automatically bypass these checks._

### 5. Type-Safe Internationalization (i18n)

When writing UI text, update `src/core/i18n/locales/en.json`. TypeScript will automatically parse the JSON schema to provide Autocomplete IntelliSense inside your components!

```typescript
const { t } = useTranslation();
<Button>{t('common.actions.save')}</Button> // Fully type-safe!
```

---

## 🛠️ Commands

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Check Linting & Types**:

   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
