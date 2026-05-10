## 🗄️ Supabase/PostgreSQL MCP - Guía de Habilitación

### ✅ Instalación completada

Instalé los siguientes componentes:

1. **`@modelcontextprotocol/server-postgres`** - Para queries SQL directo
2. **Configuración Supabase MCP** - Para acceso completo al proyecto

---

## 📋 Funcionalidades disponibles

Con estos servidores MCP tendrás:

✓ **Ejecutar queries SQL** - SELECT, INSERT, UPDATE, DELETE, CREATE TABLE
✓ **Leer schemas** - Analizar estructura de tablas y relaciones
✓ **Modificar tablas** - CREATE, ALTER, DROP tables
✓ **Analizar relaciones** - Foreign keys, constraints, índices
✓ **Metadata** - Ver todas las tablas, columnas, tipos de datos

---

## 🔧 Integración en Cline/Claude Desktop

### Opción 1: PostgreSQL MCP (Conexión directa)

**Para Cline (VS Code):**
1. Abre la configuración de Cline
2. En `MCP Servers`, agrega:

\`\`\`json
"postgres": {
  "command": "npx",
  "args": [
    "@modelcontextprotocol/server-postgres",
    "--libpq",
    "postgresql://postgres:[TU_PASSWORD]@db.dkrhckfyssyclvwdqmiv.supabase.co:5432/postgres?sslmode=require"
  ],
  "env": {
    "SUPABASE_URL": "https://dkrhckfyssyclvwdqmiv.supabase.co",
    "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcmhja2Z5c3N5Y2x2d2RxbWl2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODMzNzAxNSwiZXhwIjoyMDkzOTEzMDE1fQ.J8ONxStLjeBjHNmfTZeLEYV_uEdqAwwZKKMKD8Yhm48"
  }
}
\`\`\`

**Para Claude Desktop:**
1. Abre `~/.claude/claude_desktop_config.json`
2. Agrega la misma configuración anterior

### Opción 2: Supabase MCP Oficial (Recomendado)

**Mejor para usar todas las funcionalidades de Supabase:**

\`\`\`json
"supabase": {
  "url": "https://mcp.supabase.com/mcp",
  "auth": "oauth2.1"
}
\`\`\`

Al usar Supabase MCP:
1. Los servidores harán OAuth 2.1
2. Tendrás acceso a: Database, Auth, Storage, Edge Functions, Realtime, Vectors
3. No necesitas pasar credentials en el config

---

## 🚀 Uso en tu Backend IA

### Ejemplo: Ejecutar query SQL

\`\`\`sql
-- El MCP te permitirá ejecutar esto directamente
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public'
ORDER BY table_name;
\`\`\`

### Ejemplo: Crear tabla con IA

El backend IA puede ahora:

\`\`\`sql
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  title text,
  context jsonb,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX idx_conversations_user_id ON conversations(user_id);
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
\`\`\`

### Ejemplo: Verificar estructura

\`\`\`sql
-- Ver todas las tablas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver columnas de una tabla
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'conversations';

-- Ver foreign keys
SELECT constraint_name, table_name, column_name 
FROM information_schema.key_column_usage 
WHERE constraint_type = 'FOREIGN KEY';
\`\`\`

---

## 📂 Archivos creados/modificados

- **`.env.local`** - Credenciales Supabase (privado ✓)
- **`.mcp-config.json`** - Configuración para localhost
- **`.mcp.json`** - Configuración para Supabase MCP oficial

---

## ⚠️ Notas de seguridad

- **Service Role Key**: Nunca expongas esto en frontend. Úsalo solo en backend/MCP
- **Connection String**: Cambia `[TU_PASSWORD]` con tu contraseña real de Supabase
- **Environment Variables**: Las claves en `.env.local` no se suben a Git (asegúrate que esté en `.gitignore`)

---

## ✨ Próximos pasos

1. **Autentica el servidor MCP:**
   - Abre tu cliente MCP (Cline/Claude Desktop)
   - Verifica que vea el servidor PostgreSQL o Supabase
   - Completa el flujo OAuth si usas Supabase MCP

2. **Prueba una query simple:**
   - Pide al IA que liste las tablas de tu BD
   - Verifica que funciona correctamente

3. **Configura RLS (fila nivel de seguridad):**
   - Es importante si expones datos al público
   - El IA puede ayudarte a crear políticas RLS

---

## 📚 Recursos

- Supabase MCP Setup: https://supabase.com/docs/guides/getting-started/mcp
- PostgreSQL MCP: https://github.com/modelcontextprotocol/server-postgres
- Supabase Postgres Best Practices: https://supabase.com/docs/guides/database/best-practices
