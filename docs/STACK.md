# Codenity Stack — Documentación Técnica

> React Router v7 · Cloudflare Pages · Bun · Tailwind CSS v4 · shadcn/ui

---

## Stack Tecnológico

| Capa           | Tecnología                                    |
| -------------- | --------------------------------------------- |
| **Runtime**    | Bun (local + CI)                              |
| **Framework**  | React Router v7 (SSR)                         |
| **Hosting**    | Cloudflare Pages + Workers                    |
| **Build**      | Vite 7 + `@cloudflare/vite-plugin`            |
| **Estilos**    | Tailwind CSS v4 + shadcn/ui + MagicUI         |
| **Lenguaje**   | TypeScript 5.9                                |
| **Validación** | Zod                                           |
| **Animaciones**| Framer Motion + View Transition API           |

---

## Estructura del Proyecto

```
codenity-stack/
├── app/
│   ├── root.tsx                    # Layout raíz, tema, meta tags, ENV
│   ├── routes.ts                   # Router central (compone todas las features)
│   ├── entry.server.tsx            # SSR entry point
│   │
│   ├── features/                   # ★ Módulos de negocio
│   │   ├── marketing/              #   Landing page (home pública, SEO)
│   │   ├── security/               #   Login, flujo de autenticación
│   │   ├── core/                   #   Dashboard principal y navegación app
│   │   ├── crm/                    #   Cliente, leads, oportunidades
│   │   ├── user/                   #   Gestión de cuenta y perfil
│   │   ├── settings/               #   Configuración global de la app
│   │   ├── accounting/             #   Contabilidad y finanzas
│   │   ├── inventory/              #   Inventario y stock
│   │   ├── invoicing/              #   Facturación
│   │   └── analytics/              #   KPIs, paneles analíticos
│   │
│   ├── routes/
│   │   └── layout/                 # Layouts compartidos para grupos de rutas
│   │       ├── layout-public.tsx   #   Layout público (landing, marketing)
│   │       ├── layout-app.tsx      #   Layout de aplicación autenticada (/c)
│   │       └── components/         #   Header, sidebar, footer públicos, etc.
│   │
│   ├── components/                 # Componentes globales reutilizables
│   │   ├── ui/                     #   shadcn/ui + MagicUI (genéricos)
│   │   ├── epic-progress.tsx       #   Barra de progreso global
│   │   └── error-boundary.tsx      #   Error boundary global
│   │
│   ├── utils/                      # Utilidades compartidas
│   │   ├── env.server.ts           #   Variables de entorno
│   │   ├── color-scheme.server.ts  #   Cookie de tema (server-only)
│   │   ├── client-hints.tsx        #   Client hints del navegador
│   │   ├── headers.server.ts       #   Utilidades de headers
│   │   └── misc.ts                 #   Helpers varios (dominio, etc.)
│   │
│   ├── utils/hooks/                # Custom hooks
│   │   ├── use-mobile.tsx
│   │   └── use-reduced-motion.tsx
│   │
│   └── styles/                     # CSS global
│       ├── tailwind.css            #   Tokens, temas, View Transition CSS
│       └── font.css                #   Tipografía
│
├── functions/                      # Cloudflare Pages Functions
│   └── [[path]].ts                 #   Catch-all handler (SSR con React Router)
│
├── public/                         # Archivos estáticos
│   ├── favicons/
│   ├── icons/
│   └── images/
│
├── server/                         # Lógica server-side adicional (middlewares)
│   ├── middleware/
│   └── index.ts
│
├── vite.config.ts                  # Configuración de Vite + React Router + Cloudflare
├── tsconfig.json                   # TypeScript config (paths "@/")
├── wrangler.jsonc                  # Cloudflare Worker config
├── components.json                 # Configuración shadcn/ui
└── package.json
```

---

## Arquitectura Modular (Features)

Cada feature es un módulo independiente con sus propias rutas, componentes y lógica de dominio.

### Estructura de una Feature

```
app/
└── features/
    └── [feature-name]/
        ├── routes.ts[x]         # Definición de rutas del módulo
        ├── routes/              # (opcional) Subrutas de la feature
        │   └── index.tsx
        ├── components/          # Componentes exclusivos de la feature
        │   └── ...
        └── [sub-feature]/       # (opcional) Sub-módulos adicionales
            ├── routes/
            └── components/
```

### Registro de Rutas (router central)

Cada feature exporta un array de rutas que se compone en `app/routes.ts`.  
Convenciones de URL:

- `/` → rutas públicas (marketing)
- `/c/*` → aplicación autenticada (core, crm, accounting, etc.)
- `/r/*` → resource routes (acciones como cambio de tema)

Ejemplo real simplificado de `app/routes.ts`:

```typescript
import { layout, prefix, type RouteConfig, route } from '@react-router/dev/routes'
import { accountingRoutes } from './features/accounting/routes'
import { analyticsRoutes } from './features/analytics/routes'
import { coreRoutes } from './features/core/routes'
import { crmRoutes } from './features/crm/routes'
import { inventoryRoutes } from './features/inventory/routes'
import { invoicingRoutes } from './features/invoicing/routes'
import { marketingRoutes } from './features/marketing/routes'
import { securityRoutes } from './features/security/routes'
import { settingsRoutes } from './features/settings/routes'
import { userRoutes } from './features/user/routes'

export default [
  // 1. PUBLIC / MARKETING
  ...marketingRoutes,

  // 2. AUTHENTICATION (SECURITY)
  ...securityRoutes,

  // 3. APPLICATION (CENTRALIZED)
  ...prefix('c', [
    layout('routes/layout/layout-app.tsx', [
      ...coreRoutes,
      ...crmRoutes,
      ...userRoutes,
      ...settingsRoutes,
      ...accountingRoutes,
      ...inventoryRoutes,
      ...invoicingRoutes,
      ...analyticsRoutes,
    ]),
  ]),

  // 4. RESOURCE ROUTES
  ...prefix('r', [
    route('color-scheme', 'routes/resource/color-scheme.tsx'),
  ]),

  // 5. SYSTEM / ERRORS
  route('404', 'routes/404.tsx'),
  route('500', 'routes/500.tsx'),
  route('*', 'routes/catch-all.tsx'),
] satisfies RouteConfig
```

### Ejemplo: Feature Marketing (Home pública)

```typescript
// app/features/marketing/home/routes/index.tsx
import type { MetaFunction } from 'react-router'
import Home from '../components/home'

export async function loader() {
  return { title: 'Codenity Stack - Home' }
}

export default function Index() {
  return <Home />
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title ?? 'Codenity Stack' }]
}
```

### Agregar una nueva Feature

1. Crear `app/features/[nombre]/routes.ts[x]` exportando un array de rutas.
2. Crear `app/features/[nombre]/components/` con los componentes específicos.
3. Importar la nueva feature y hacer `...miNuevaFeatureRoutes` en `app/routes.ts`.

---

## Cloudflare Pages

### Arquitectura de Despliegue

```
[Browser] → Cloudflare CDN (static) → Cloudflare Worker (SSR)
                  │                          │
            build/client/            functions/[[path]].ts
            (HTML, CSS, JS)          (Server-side rendering)
```

### Configuración de Vite

```typescript
// vite.config.ts — EL ORDEN DE PLUGINS ES CRÍTICO
export default defineConfig({
    plugins: [
        tailwindcss(),
        reactRouter(),    // ← DEBE ir ANTES de cloudflare()
        cloudflare(),     // ← DESPUÉS de reactRouter()
        tsconfigPaths(),
    ],
});
```

> **⚠️ Importante:** Si `cloudflare()` va antes de `reactRouter()`, el dev server produce errores 404.

### Comandos

| Comando              | Uso                                        |
| -------------------- | ------------------------------------------ |
| `bun run dev`        | Servidor de desarrollo local               |
| `bun run build`      | Build de producción                        |
| `bun run preview`    | Build + preview con Wrangler               |
| `bun run deploy`     | Build + deploy manual a Cloudflare Pages   |

### CI/CD con GitHub Actions

El deploy se gestiona mediante GitHub Actions (`.github/workflows/deploy.yml`):

```
git push main → GitHub Actions:
  ┌─────────────────────────┐      ┌──────────────────────────┐
  │ ✅ CI (siempre)          │      │ 🚀 CD (solo en main)     │
  │  • Checkout              │ ───→ │  • Download artifact     │
  │  • Setup Bun             │      │  • wrangler pages deploy │
  │  • bun install           │      └──────────────────────────┘
  │  • Typecheck             │
  │  • Build                 │
  │  • Upload artifact       │
  └─────────────────────────┘
```

- **Pull Requests** → Solo ejecuta CI (typecheck + build), sin deploy
- **Push a main** → CI + deploy automático a Cloudflare Pages
- Los resultados se ven en la pestaña **Actions** de GitHub

**Secrets requeridos** (configurar en GitHub → Settings → Secrets → Actions):
- `CLOUDFLARE_API_TOKEN` — Token con permisos Cloudflare Pages: Edit
- `CLOUDFLARE_ACCOUNT_ID` — Account ID de Cloudflare

### Server Entry Point

```typescript
// functions/[[path]].ts — Catch-all para SSR
import { createPagesFunctionHandler } from "@react-router/cloudflare";

export const onRequest = createPagesFunctionHandler({
    getLoadContext: (ctx) => ({ cloudflare: ctx }),
});
```

---

## Sistema de Temas (Dark/Light)

### Flujo Completo

```
┌─────────────┐    Cookie     ┌──────────────┐   Client Hints   ┌──────────────┐
│ theme.server │ ←────────── │  root.tsx     │ ←────────────── │  Navegador   │
│   .ts        │   "theme-pref" │  loader()    │   prefers-color  │              │
└──────────────┘              └──────┬───────┘   -scheme          └──────────────┘
                                     │
                              theme: "light" | "dark"
                                     │
                              ┌──────▼───────┐
                              │ <html        │  ← Clase "dark" o vacío
                              │  class={theme}│
                              └──────┬───────┘
                                     │
                              ┌──────▼───────┐
                              │ public-header │  ← useRouteLoaderData("root")
                              │  .tsx         │
                              └──────┬───────┘
                                     │
                              ┌──────▼───────┐
                              │ ColorScheme   │  ← Optimistic UI con fetcher
                              │ Switch        │
                              └──────┬───────┘
                                     │ onClick
                              ┌──────▼───────┐
                              │ AnimatedTheme │  ← View Transition API
                              │ Toggler       │     clip-path circular
                              └──────┬───────┘
                                     │ fetcher.submit({ theme })
                              ┌──────▼───────┐
                              │ root.tsx      │  ← Valida con Zod
                              │  action()     │     Set-Cookie
                              └──────────────┘
```

### Componentes del Sistema

| Archivo                          | Responsabilidad                                    |
| -------------------------------- | -------------------------------------------------- |
| `lib/theme.server.ts`            | Cookie `theme-pref` (leer/escribir, 1 año)         |
| `lib/client-hints.tsx`           | Detecta `prefers-color-scheme` del navegador        |
| `root.tsx` loader                | Resuelve tema: cookie > client hints > "light"      |
| `root.tsx` action                | Valida con Zod y escribe cookie                     |
| `root.tsx` Layout                | Aplica `class="dark"` al `<html>`                   |
| `components/color-scheme-switch` | Optimistic UI + fetcher.submit                      |
| `components/ui/animated-theme-toggler` | Animación View Transition con clip-path circular |

### Paleta de Colores (OKLCH)

Definida en `styles/tailwind.css` usando **OKLCH** para mayor consistencia perceptual:

- **Light:** Fondo blanco puro `oklch(1 0 0)`, texto negro suave `oklch(0.1 0 0)`
- **Dark:** Fondo oscuro `oklch(0.1 0 0)`, texto blanco suave `oklch(0.98 0 0)`
- **Sistema monocromático** con acentos semánticos (destructive en rojo desaturado)

### Animación del Toggle

La animación usa la **View Transition API** nativa:

1. `document.startViewTransition()` captura el estado "antes"
2. `flushSync()` aplica el cambio del tema síncronamente
3. `clip-path: circle()` expande desde el botón hacia las esquinas
4. Duración: 500ms con curva `cubic-bezier(0.4, 0, 0.2, 1)`

CSS requerido en `tailwind.css`:
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(root) {
  z-index: 9999;
}
```

---

## UI & Componentes

### Stack de UI

- **shadcn/ui** — Componentes base (Button, Separator, Tooltip, etc.)
- **MagicUI** — Componentes animados (Dock)
- **Lucide React** — Iconografía
- **Framer Motion** — Animaciones complejas
- **CVA** (class-variance-authority) — Variantes de componentes

### Alias de importación

```json
// tsconfig.json
"paths": {
    "@/*": ["./app/*"]
}
```

Uso: `import { Button } from "@/components/ui/button"`

### Configuración shadcn

Definida en `components.json` — utilidades en `@/lib/utils`, componentes en `@/components/ui`.

---

## Desarrollo Local

### Requisitos

- **Bun** (runtime y package manager)
- **Node.js** ≥ 18 (para Wrangler compatibility)

### Inicio rápido

```bash
# Instalar dependencias
bun install

# Desarrollo local
bun run dev

# Type checking
bun run typecheck

# Preview con Wrangler (simula Cloudflare)
bun run preview
```

### Notas importantes

- **No usar npm** — El proyecto usa exclusivamente Bun (`bun.lock`)
- `package-lock.json` está en `.gitignore`
- El type generation de React Router se ejecuta con `react-router typegen`
- Los tipos generados se guardan en `.react-router/types/`
