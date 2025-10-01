# Sistema de Supervisión de Aulas - README

## Resumen del Proyecto
Este proyecto es un sistema web para la supervisión de aulas en instituciones académicas, desarrollado como parte de un curso universitario de 12 semanas (3 parciales de 4 semanas), con demostraciones del sistema en las semanas 4, 8 y 12. El objetivo es automatizar la supervisión de clases, asegurando el cumplimiento de horarios y ubicaciones, con registro de evidencia fotográfica y reportes detallados para administradores. Se implementa usando una arquitectura full-stack, con un enfoque educativo en metodologías ágiles (Scrum), desarrollo moderno y prácticas DevOps.

### Aspectos Clave
- **Duración**: 12 semanas, divididas en 3 parciales (4 semanas cada uno).
- **Equipos**: 6 equipos (~4-6 alumnos cada uno):
  - 2 Frontend: Webapp para gestión (admins/decanos) y webapp/móvil para operatividad (supervisores).
  - 2 Backend: APIs para gestión/reportes/admin y operatividad (incidentes/fotos).
  - 2 CI/CD|QA: Pipelines GitHub Actions, Terraform (AWS), pruebas Jest.
- **Tecnologías**:
  - **Frontend**: React/Tailwind/TypeScript (RTK Query) para web, Flutter (POC) para móvil.
  - **Backend**: TypeScript/Express, Prisma (PostgreSQL), Auth0 para autenticación, Docker.
  - **Infraestructura**: AWS (Lambdas, S3 para fotos con encriptación), Terraform.
  - **CI/CD y QA**: GitHub Actions, Jest para pruebas unitarias, Cypress (E2E opcional).
- **Organización**: Monorepo en GitHub, con branches por equipo, PRs para integración. Dependencias cross-stack (frontend consume APIs backend).
- **Metodología**: Scrum con backlogs por equipo y backlog maestro (docente). Dailies fuera de clase (evidenciados en GitHub Issues/Slack). Demos semanales (2h max) en semanas 4, 8, 12.
- **Nivel de Alumnos**: Principiantes, con experiencia previa en React/JS/Tailwind y PHP MVC monolítico. Spikes/POCs para aprender TypeScript, Prisma, Auth0, RTK Query, Terraform, Flutter.

## Objetivos Funcionales
Construir un sistema web que cumpla los siguientes requisitos:
1. **Módulo de Supervisión**:
   - Registro en tiempo real con geolocalización.
   - Captura y almacenamiento de fotos con timestamps.
   - Documentación de incidentes (ausencias, aulas incorrectas, violaciones de horario).
   - Interfaz optimizada para móvil (web, con Flutter POC).
2. **Módulo de Reportes y Análisis**:
   - Dashboard ejecutivo con métricas clave para decanos.
   - Reportes detallados por profesor/aula/facultad/período.
   - Indicadores de cumplimiento y tendencias históricas.
   - Exportación multi-formato (PDF/CSV).
3. **Módulo de Administración**:
   - Gestión de profesores, asignaciones y horarios.
   - Administración de aulas (capacidad, equipamiento).
   - Gestión de supervisores (rutas, permisos).
   - Configuración de estructura organizativa de facultades.
4. **Módulo de Importación de Datos**:
   - Importación masiva desde Excel (profesores, horarios, aulas, estructura).
   - Validación de datos, logs de errores.
5. **Nice-to-Haves** (si el tiempo lo permite):
   - Optimización de rutas de supervisión (algoritmo basado en geografía/horarios).
   - Gestión de clases de recuperación (registro, validación, monitoreo).
6. **Criterios de Éxito**:
   - 80% reducción en tiempo de generación de reportes.
   - 60% mejora en eficiencia de rutas de supervisión.
   - 100% documentación digital de incidentes.
   - 95% adopción de interfaz por usuarios.
   - Importaciones Excel sin pérdida de datos.

## Objetivos Académicos
Capacitar a los alumnos en desarrollo de software moderno y prácticas ágiles:
1. **Metodología Scrum**:
   - Gestionar 6 equipos con backlogs propios y un backlog maestro.
   - Evidenciar dailies fuera de clase (GitHub Issues/Slack).
   - Realizar presentaciones semanales de entregables (2h max) en semanas 4, 8, 12.
2. **Tecnologías y Herramientas**:
   - Aprender TypeScript con Express (backend), Prisma (DB), Auth0 (autenticación).
   - Dominar React/Tailwind/TS con RTK Query (frontend) y Flutter (móvil POC).
   - Implementar CI/CD con GitHub Actions y Terraform (AWS Lambdas/S3).
   - Aplicar pruebas unitarias con Jest, E2E opcional (Cypress).
3. **Conceptos Clave**:
   - Spikes: Investigaciones técnicas (e.g., geolocalización, Auth0).
   - POCs: Pruebas de concepto (e.g., Flutter app, Lambda para fotos).
   - Bugs: Seguimiento y corrección en GitHub Issues.
4. **Habilidades DevOps**:
   - Configurar pipelines CI/CD (build/test/deploy).
   - Usar Terraform para infraestructura como código.
   - Asegurar calidad con pruebas (80% coverage meta).
5. **Colaboración y Entrega**:
   - Trabajar en monorepo GitHub con integración cross-team.
   - Entregar documentación técnica, manual de usuario y plan de entrenamiento.

## Cronograma
- **Parcial 1 (Semanas 1-4)**: Configuración, spikes/POCs, UI/APIs básicas. **Demo (Semana 4)**: Login Auth0, UI admin/supervisión básica, APIs CRUD, pipelines CI/CD.
- **Parcial 2 (Semanas 5-8)**: Features completas (admin, supervisión, reportes), Flutter POC. **Demo (Semana 8)**: Sistema integrado, POC de app Flutter.
- **Parcial 3 (Semanas 9-12)**: Mejoras, nice-to-haves, pruebas, despliegue. **Demo (Semana 12)**: Sistema completo, app móvil, documentación, plan de entrenamiento.

## Entregables
- Sistema web funcional (desplegado en AWS | GCP).
- App móvil Flutter (POC o completa, según avance).
- Documentación técnica y manual de usuario.
- Plan de entrenamiento para usuarios finales.
- Código en monorepo GitHub, con pruebas (80% coverage).