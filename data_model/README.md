# Modelo de Prisma para el manejo de la DB del sistema de supervisión de aulas
Utilizando Prisma para definir el esquema de la base de datos, incluyendo tablas para usuarios, roles, profesores, aulas, horarios, supervisiones, incidentes y fotos.

1. **Migraciones de Prisma**  
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate 
   Interfaz Grafica de Prisma: npx prisma studio
   ```
2. Eliminar una línea en scheme.prisma que tiene output 
   Descomentar el rootdir y Outdir

3. RECORDAR QUE SE PUEDE INSTALAR UNA EXTENSION QUE SE LLAMA PRISMA EN VSCODE PARA QUE VSCODE INTREPRETE EL CODIGO. 

Poner en el package.json la siguiente dependencia: 
    "@prisma/client": "^6.16.2",


2. **Configurar `.env`**  
   ```env
   DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:PUERTO/NOMBREBASEDATOS?schema=public"
   ```