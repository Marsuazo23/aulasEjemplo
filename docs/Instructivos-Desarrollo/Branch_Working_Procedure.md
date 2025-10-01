# Procedimiento para Mantener Ramas Actualizadas en Git y Evitar Conflictos

## Introducción

Este documento establece el procedimiento estándar para trabajar con ramas (branches) en Git, con el fin de mantenerlas actualizadas, evitar conflictos y promover una colaboración fluida en el equipo. Todas las ramas de características (feature branches) deben derivar de la rama principal de desarrollo (`dev`). Este enfoque asegura que el trabajo individual se integre de manera limpia y reduce el riesgo de conflictos al momento de fusionar (merge) o empujar (push) cambios.

El flujo de trabajo se basa en las mejores prácticas de Git, utilizando comandos como `checkout`, `pull`, `rebase` y `push`. Se enfatiza en mantener la rama `dev` actualizada antes de crear o actualizar ramas de trabajo, y en resolver conflictos de forma proactiva mediante rebase.

## Convenciones de Nomenclatura de Ramas

Las ramas deben seguir una convención clara para identificar su propósito y origen:
- Estructura: `<equipo>/<tipo>/<dominio-característica-o-fix>`
  - **Equipo**: Abreviatura del equipo o responsable (ej: `dev-team`, `qa`).
  - **Tipo**: Tipo de rama (ej: `feature` para nuevas funcionalidades, `bugfix` para correcciones, `hotfix` para parches urgentes).
  - **Dominio, característica o fix**: Descripción breve y en minúsculas, usando guiones para separar palabras (ej: `user-auth`, `payment-gateway-fix`).

Ejemplos:
- `dev-team/feature/user-auth`
- `backend/bugfix/database-connection`
- `frontend/hotfix/ui-rendering`

Reglas generales:
- Usar minúsculas y guiones (`-`) para separar palabras.
- Evitar caracteres especiales o espacios.
- Las ramas deben ser temporales y eliminarse después de fusionarlas a `dev`.

## Procedimiento Paso a Paso

Sigue estos pasos para crear, trabajar y actualizar una rama de característica, asegurando que permanezca sincronizada con `dev`.

### 1. Preparación Inicial: Actualizar la Rama `dev`
Antes de crear una nueva rama, asegúrate de que tu copia local de `dev` esté actualizada con el repositorio remoto.

- Cambia a la rama `dev`:
  ```
  git checkout dev
  ```
- Actualiza con los cambios remotos:
  ```
  git pull origin dev
  ```

Esto garantiza que estés trabajando sobre la versión más reciente de `dev`.

### 2. Crear la Rama de Trabajo
Crea una nueva rama a partir de la `dev` actualizada.

- Comando para crear y cambiar a la nueva rama:
  ```
  git checkout -b <equipo>/<tipo>/<dominio-característica-o-fix>
  ```
  Ejemplo:
  ```
  git checkout -b dev-team/feature/user-auth
  ```

### 3. Trabajar en la Rama
Realiza tu trabajo en la rama creada.

- Haz cambios en los archivos según sea necesario.
- Registra avances con commits descriptivos (commits semántico). Cada commit debe describir claramente qué se ha modificado o agregado.
  - Comando para agregar cambios y commit:
    ```
    git add <archivos-modificados>
    git commit -m "type: Descripción clara del cambio (ej: feat: Agregada autenticación de usuario)"
    ```
- Realiza commits frecuentes para mantener un historial granular y fácil de rastrear. Evita commits grandes que incluyan múltiples cambios no relacionados.

### 4. Actualizar la Rama Antes de Empujar Cambios
Dado que `dev` podría haber sido modificada por otros miembros del equipo mientras trabajas, actualiza tu rama antes de empujar (push) para evitar conflictos futuros.

- Asegúrate de que todos tus cambios locales estén confirmados (committed). Verifica con:
  ```
  git status
  ```
  Si hay cambios pendientes, commitea o descarta (stash) temporalmente.

- Cambia de nuevo a `dev` y actualízala:
  ```
  git checkout dev
  git pull origin dev
  ```

- Regresa a tu rama de trabajo:
  ```
  git checkout <equipo>/<tipo>/<dominio-característica-o-fix>
  ```

- Actualiza tu rama con los cambios de `dev` usando rebase (esto reescribe el historial de tu rama para que se base en la `dev` actualizada):
  ```
  git rebase dev
  ```
  - Si hay conflictos durante el rebase, Git te lo indicará. Resuélvelos manualmente editando los archivos conflictivos, luego:
    ```
    git add <archivos-resueltos>
    git rebase --continue
    ```
  - Si deseas abortar el rebase:
    ```
    git rebase --abort
    ```

El rebase mantiene un historial lineal y limpio, reduciendo conflictos al fusionar posteriormente.

### 5. Empujar la Rama Actualizada
Una vez que la rama esté actualizada y sin conflictos:

- Empuja la rama al repositorio remoto:
  ```
  git push origin <equipo>/<tipo>/<dominio-característica-o-fix>
  ```
  Ejemplo:
  ```
  git push origin dev-team/feature/user-auth
  ```

Si es la primera vez que empujas la rama, Git podría sugerir el comando con `--set-upstream` para rastrear la rama remota.

## Mejores Prácticas Adicionales
- **Frecuencia de Actualizaciones**: Actualiza `dev` y rebase tu rama regularmente (al menos una vez al día) si el proyecto es colaborativo.
- **Resolución de Conflictos**: Siempre resuelve conflictos localmente durante el rebase para evitar problemas en pull requests.
- **Pull Requests**: Después de empujar, crea un pull request (PR) para fusionar tu rama a `dev`. Incluye una descripción clara de los cambios y referencia issues si aplica.
- **Limpieza**: Después de que el PR sea aprobado y fusionado, elimina la rama local y remota:
  ```
  git branch -d <rama>
  git push origin --delete <rama>
  ```
- **Herramientas**: Usa herramientas como GitHub para revisar cambios visualmente.
- **Errores Comunes a Evitar**:
  - No trabajar directamente en `dev` o `main`.
  - No empujar sin rebasing si `dev` ha cambiado.
  - Commits vagos (ej: "fix"); siempre sé descriptivo.

Siguiendo este procedimiento, se minimizan los conflictos y se mantiene un repositorio ordenado y colaborativo. Si tienes dudas, consulta con el equipo de desarrollo.