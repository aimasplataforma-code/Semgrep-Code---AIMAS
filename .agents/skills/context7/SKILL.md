---
name: context7
description: "Documentación actualizada en tiempo real para librerías, frameworks y SDKs. Use this skill para obtener información actual sobre dependencias, evitar código obsoleto, y encontrar mejores prácticas."
metadata:
  author: context7
  version: "0.1.0"
  keywords:
    - documentacion
    - librerias
    - frameworks
    - SDKs
    - best-practices
    - evitar-codigo-obsoleto
---

# Context7 - Documentación en Tiempo Real

## Función

Context7 proporciona acceso a documentación **actualizada** de:

- **Frameworks**: React, Vue, Angular, Next.js, Svelte, Astro, etc.
- **Librerías**: Lodash, Axios, D3.js, Three.js, etc.
- **SDKs**: Supabase, Firebase, AWS, Google Cloud, etc.
- **Herramientas**: Webpack, Vite, TypeScript, ESLint, etc.
- **Best Practices**: Patrones modernos, seguridad, performance

## Uso

### Buscar documentación
```
"¿Cuál es la sintaxis correcta de React 19?"
"Dame la documentación actualizada de Next.js 15"
"¿Cómo usar TypeScript 5.5 con tipos estrictos?"
```

### Evitar código obsoleto
```
"¿Es Lodash v4 o v5 la versión actual?"
"Necesito las mejores prácticas de seguridad en Node.js 2026"
"¿Qué cambios hay en Material-UI 6?"
```

### Investigar nuevas versiones
```
"¿Qué features nuevas tiene Svelte 4?"
"¿Cuáles son los breaking changes en Vite 6?"
"Dame un ejemplo moderno de autenticación con Supabase"
```

### Comparar librerías
```
"¿Debería usar Axios o Fetch API en 2026?"
"Comparame Express vs Fastify en términos de performance"
"¿Qué ventajas tiene Prisma sobre TypeORM ahora?"
```

## Ventajas

✅ **Documentación actualizada** - Información del día actual
✅ **Evita código obsoleto** - No tendrás información desactualizada
✅ **APIs modernas** - Métodos actuales vs deprecados
✅ **Mejores prácticas** - Patrones recomendados por la comunidad
✅ **Versiones actuales** - Saber qué versión es la última
✅ **Breaking changes** - Ser alertado de cambios importantes

## Ejemplos prácticos

### Verificar API correcta
```javascript
// ❌ VIEJO (posiblemente)
const user = await axios.get('/api/user');

// ✅ ACTUAL (usando Context7)
const response = await fetch('/api/user');
const user = await response.json();
```

### Usar la última sintaxis de React
```jsx
// ❌ VIEJO
function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// ✅ ACTUAL (con React 19)
// Context7 te ayuda a saber la sintaxis correcta
```

### TypeScript moderno
```typescript
// Context7 asegura que usas las últimas features
type User = {
  id: string;
  email: string;
  // ... features más nuevas
};
```

## Cuándo usar Context7

- Antes de escribir código crítico
- Cuando necesitas verificar si una API es actual
- Cuando migas a una nueva versión
- Cuando necesitas mejores prácticas
- Cuando encuentras código viejo y quieres modernizarlo
- Cuando necesitas comparar dos soluciones

## Integración con otros MCPs

- **Supabase MCP**: Context7 valida que uses las APIs correctas
- **GitHub MCP**: Busca documentación mientras revisas código
- **PostgreSQL MCP**: Aprende mejores prácticas SQL actuales

## Token & Autenticación

Tu token de Context7 está securizado en las variables de entorno. Nunca se expone.

```
CONTEXT7_TOKEN=85a9ee64-c745-43e7-8291-848a6479b68d
```

## Tips

💡 Siempre verifica la documentación oficial antes de un deployment importante
💡 Usa Context7 en pair programming con tu IA para código de calidad
💡 Combina Context7 con Supabase para arquitecturas modernas
💡 Pide ejemplos prácticos, no solo teoría
