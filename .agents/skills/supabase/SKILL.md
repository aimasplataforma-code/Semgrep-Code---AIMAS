---
name: supabase
description: "Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues); client libraries and SSR integrations (supabase-js, @supabase/ssr) in Next.js, React, SvelteKit, Astro, Remix; auth issues (login, logout, sessions, JWT, cookies, getSession, getUser, getClaims, RLS); Supabase CLI or MCP server; schema changes, migrations, security audits, Postgres extensions (pg_graphql, pg_cron, pg_vector)."
metadata:
  author: supabase
  version: "0.1.0"
---

# Supabase Skill

Skill para trabajar con Supabase y PostgreSQL en tu proyecto AIMAS.

## Funcionalidades

- **Ejecutar queries SQL** en la base de datos Supabase
- **Leer schemas** y analizar la estructura
- **Modificar tablas** (CREATE, ALTER, DROP)
- **Analizar relaciones** y constraints
- **Gestionar RLS** (Row Level Security)
- **Trabajar con Auth** de Supabase

## Acceso

Tienes acceso a:
- Base de datos: https://dkrhckfyssyclvwdqmiv.supabase.co
- Project ID: dkrhckfyssyclvwdqmiv
- Credenciales en variables de entorno

## Mejores prácticas

1. **Siempre verifica la estructura** antes de modificar
2. **Usa RLS** en tablas públicas
3. **Crea índices** para queries frecuentes
4. **Documenta cambios** en migraciones
5. **Valida permisos** antes de operaciones
