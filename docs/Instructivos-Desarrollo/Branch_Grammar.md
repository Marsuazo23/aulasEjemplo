# Gramática para Branches y Commits

Este documento define las convenciones para nombrar ramas (*branches*) y escribir mensajes de commits en el repositorio. Las palabras clave estarán en inglés para mantener consistencia y claridad.

## 1. Gramática para Branches

Las ramas seguirán el formato: `<equipo>/<type>/<rama>`

### Componentes:
- **`<equipo>`**: Identifica el equipo responsable de la rama. Ejemplos: `frontend`, `backend`, `devops`, `qa`, etc.
- **`<type>`**: Indica el tipo de cambio o propósito de la rama. Los tipos permitidos son:
  - `feature`: Nueva funcionalidad o característica.
  - `bugfix`: Corrección de errores.
  - `hotfix`: Corrección urgente en producción.
  - `refactor`: Refactorización de código sin cambios funcionales.
  - `docs`: Cambios relacionados con documentación.
  - `test`: Cambios relacionados con pruebas (unitarias, integración, etc.).
  - `chore`: Tareas de mantenimiento o configuración (ej. actualización de dependencias).
- **`<rama>`**: Nombre corto y descriptivo de la tarea o cambio, usando kebab-case (palabras en minúsculas separadas por guiones). Debe ser claro y relacionado con el propósito de la rama.

### Ejemplos:
- `frontend/feature/login-form`: Rama para desarrollar un formulario de login en el equipo frontend.
- `backend/bugfix/api-error-handling`: Rama para corregir errores en el manejo de la API en el equipo backend.
- `devops/chore/update-ci-pipeline`: Rama para actualizar la configuración del pipeline de CI/CD.
- `qa/test/add-e2e-tests`: Rama para añadir pruebas end-to-end en el equipo QA.

### Reglas:
- Usa nombres en minúsculas y kebab-case para `<rama>`.
- Mantén `<rama>` breve pero descriptivo (máximo 5 palabras).
- Asegúrate de que `<equipo>` refleje el equipo correcto.
- No uses caracteres especiales ni espacios, excepto guiones (`-`).

## 2. Gramática para Commits

Los mensajes de commit seguirán el estándar de *semantic commits*, que proporciona un formato claro y estructurado para describir los cambios. El formato general es:

```
<type>(<scope>): <short description>
```

### Componentes:
- **`<type>`**: Tipo de cambio realizado. Los tipos permitidos son:
  - `feat`: Nueva funcionalidad o característica.
  - `fix`: Corrección de un error.
  - `refactor`: Refactorización de código sin cambios funcionales.
  - `docs`: Cambios en documentación.
  - `test`: Añadir o modificar pruebas.
  - `chore`: Tareas de mantenimiento (ej. actualizar dependencias, configuración).
  - `style`: Cambios de formato o estilo (sin afectar la lógica).
  - `perf`: Mejoras de rendimiento.
- **`<scope>`**: Contexto o área del código afectada (ej. `api`, `ui`, `database`, `auth`). Opcional, pero recomendado para mayor claridad.
- **`<short description>`**: Descripción breve y clara del cambio (máximo 50 caracteres, en inglés, en tiempo presente).

### Ejemplos:
- `feat(auth): add JWT token validation`
- `fix(api): resolve null pointer in user endpoint`
- `refactor(ui): optimize button component rendering`
- `docs(readme): update installation instructions`
- `test(database): add unit tests for user queries`
- `chore(deps): upgrade express to version 4.18.2`

### Reglas:
- Usa palabras clave en inglés.
- Escribe mensajes en tiempo presente (ej. "add" en lugar de "added").
- Mantén el mensaje breve y específico.
- Si se incluye `<scope>`, usa nombres claros y consistentes con el proyecto.
- No uses mayúsculas al inicio del mensaje, salvo en nombres propios.
- Evita puntos finales en el mensaje.

## 3. Buenas Prácticas Generales
- **Consistencia**: Usa siempre el formato definido para ramas y commits.
- **Claridad**: Los nombres de ramas y mensajes de commit deben ser comprensibles para todos los equipos.
- **Revisiones**: Antes de fusionar una rama, asegúrate de que los mensajes de commit reflejen claramente los cambios realizados.
- **Limpieza**: Elimina ramas una vez que se hayan fusionado, salvo que se requieran para referencia futura.

## 4. Flujo de Trabajo Ejemplo
1. Un desarrollador del equipo frontend crea una rama: `frontend/feature/user-profile-page`.
2. Realiza cambios y hace commits:
   - `feat(ui): add user profile layout`
   - `test(ui): add tests for profile component`
   - `fix(ui): resolve alignment issue in profile card`
3. Una vez completada la tarea, la rama se fusiona y se elimina.
