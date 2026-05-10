---
name: supabase-postgres-best-practices
description: "Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations."
metadata:
  author: supabase
  version: "0.1.0"
---

# Postgres Best Practices para Supabase

## Optimización de Queries

### Índices
```sql
-- Crear índice para búsquedas frecuentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Índices compuestos
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at DESC);
```

### Análisis de rendimiento
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: usuarios solo ven sus propios datos
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Política: usuarios solo actualizan sus propios datos
CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

## Diseño de Schema

### Mejores prácticas
1. **UUID para IDs principales** - mejor que SERIAL
2. **Timestamps automáticos** - created_at, updated_at
3. **Foreign Keys** - para mantener integridad
4. **Constraints** - NOT NULL, UNIQUE, CHECK

### Ejemplo
```sql
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  context jsonb DEFAULT '{}',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
```

## Migraciones

1. Siempre crear backup antes de cambios
2. Usar `supabase migration new <name>`
3. Documentar cambios
4. Probar en staging primero

## Monitoreo

- Ver size de tablas
- Analizar queries lentas
- Revisar índices no usados
- Monitorear conexiones activas
