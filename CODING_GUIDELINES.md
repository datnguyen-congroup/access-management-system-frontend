# Coding Guidelines & Best Practices

Welcome to the React Admin Boilerplate! To maintain a clean, scalable, and bug-free codebase, all developers must adhere to the following standards.

## 🏗️ 1. Architecture & Module Boundaries

This project follows a **Feature-Sliced Design / Modular** architecture. 

### Core Rule: Isolation
- **Modules (`src/modules/*`) must NEVER import from other modules.** 
  *WRONG:* `import { UserList } from '@/modules/user/pages/UserList'` inside the `auth` module.
  *WHY:* Modules should be plug-and-play. If you delete a module, it shouldn't break the rest of the application.
- **Shared logic belongs in `src/shared/`.** If two modules need the same component or hook, move it to `src/shared/components` or `src/shared/hooks`.
- **Core logic (`src/core/`) must NEVER import from `src/modules/` or `src/shared/`.** The core is the framework (API client, Providers, Stores). It must remain agnostic of the business logic.

---

## 💾 2. State Management

We use **Zustand** for global state and **React Context / Local State** for isolated UI states.

- **Keep Global State Minimal:** Only put data in Zustand (`src/core/store/`) if it is truly global (e.g., Auth User, UI Theme, Global Settings).
- **Use Server State:** DO NOT use Zustand or Redux to store API responses (like a list of users). Use **TanStack React Query** (`useApiGet`) for caching, refetching, and managing remote data.
- **Selector Usage:** When extracting state from Zustand, always use atomic selectors to prevent unnecessary re-renders.
  ```typescript
  // ✅ GOOD
  const sidebarCollapsed = useSettingsStore((state) => state.sidebarCollapsed);
  
  // ❌ BAD (Causes component to re-render if ANY setting changes)
  const settings = useSettingsStore();
  const sidebarCollapsed = settings.sidebarCollapsed;
  ```

---

## 🌐 3. Data Fetching & APIs

Never use raw `axiosClient` directly inside your components.

- **Use Factory Hooks:** Always import the React Query wrappers from `src/core/api/hooks.ts` (`useApiGet`, `useApiPost`, `useApiPut`, `useApiDelete`).
- **Co-locate Hooks:** API hooks specific to a feature must live inside `src/modules/[module-name]/hooks.ts`.
- **Type Everything:** Never use `any`. Define generic types for your API responses.
  ```typescript
  // ✅ GOOD
  export const useUsers = () => {
    return useApiGet<PaginatedResponse<User>>(['users'], '/users');
  };
  ```

---

## 🔒 4. Permissions (RBAC)

Security is implemented at the routing and rendering levels.

- **Centralized Keys:** Always define new permissions in `src/app/permissions.ts`. Never hardcode strings like `'users.delete'` directly in components.
- **Route Protection:** Use `<AuthGuard>` in your `routes.tsx` files.
- **UI Protection:** Hide restricted actions using `<PermissionGuard>`.
  ```tsx
  import { APP_PERMISSIONS } from '@/app/permissions';
  
  <PermissionGuard permissions={APP_PERMISSIONS.PRODUCTS_CREATE}>
    <Button>Create Product</Button>
  </PermissionGuard>
  ```

---

## 🇹🇷 5. Internationalization (i18n)

No hardcoded text allowed in the UI!

- **Type-Safe Translations:** Always use the `useTranslation` hook.
- **Dot Notation:** Define translations hierarchically in `src/core/i18n/locales/en.json` and access them via dot notation.
  ```tsx
  // ✅ GOOD
  const { t } = useTranslation();
  <Button>{t('common.actions.save')}</Button>

  // ❌ BAD
  <Button>Save</Button>
  ```

---

## 💅 6. UI & Styling

We utilize **Ant Design (Antd v5)**.

- **Avoid Custom CSS:** Rely on Antd's components (Row, Col, Flex, Space, Typography) to handle spacing and layout whenever possible.
- **Design Tokens:** If you need inline styles, use Antd's theme tokens to respect dark/light mode automatically.
  ```tsx
  // ✅ GOOD
  import { theme } from 'antd';
  const { token } = theme.useToken();
  <div style={{ background: token.colorBgContainer, borderRadius: token.borderRadiusLG }}>
  ```
- **No Tailwind CSS:** To maintain consistency with Antd's design system and avoid conflicting utility classes, Tailwind CSS is explicitly forbidden in this boilerplate.

---

## ✅ 7. Typescript Rules

Strict Typescript is enforced via `tsconfig.json`.

- **No `any`:** The usage of `any` is strictly prohibited. If you don't know a type yet, use `unknown` and narrow it down via type assertions or type guards.
- **Interfaces over Types:** Prefer `interface` over `type` for defining object shapes (props, API responses) as they provide better error messages and extensibility.

---

## 🚀 8. Git & Commit Conventions

We use Husky and Commitlint to enforce standard commit messages.

Your commit message must follow the Conventional Commits format:
`<type>(<optional scope>): <description>`

**Allowed Types:**
- `feat`: A new feature (e.g., `feat(auth): add google login`)
- `fix`: A bug fix (e.g., `fix(user): resolve table crash on empty data`)
- `docs`: Documentation changes
- `style`: Formatting, missing semi colons, etc (no code changes)
- `refactor`: Refactoring code
- `test`: Adding missing tests
- `chore`: Maintenance tasks, dependency updates

**Note:** You cannot commit code that fails `npm run lint` or `npm run build`. The pre-commit hooks will automatically format your code with Prettier and run ESLint.
